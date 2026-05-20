const path = require("path");
const fs = require("fs");
const fetch = global.fetch;

const fsp = fs.promises;

const MANIFEST_PATH = ".notion-sync-manifest.json";
const SITE_URL = (process.env.SITE_URL || "https://jh2ee.github.io").replace(/\/$/, "");
const NOTION_VERSION = "2026-03-11";
const NOTION_API_BASE = "https://api.notion.com/v1";
const TITLE_PROPERTY = "게시물";
const DATE_PROPERTY = "날짜";
const TAGS_PROPERTY = "태그";
const CATEGORIES_PROPERTY = "카테고리";
const PUBLISH_PROPERTY = "발행여부";

function parseArgs(argv) {
  const options = {
    all: false,
    createMissing: false,
    files: []
  };

  for (const arg of argv) {
    if (arg === "--all") {
      options.all = true;
      continue;
    }

    if (arg === "--create-missing") {
      options.createMissing = true;
      continue;
    }

    options.files.push(arg);
  }

  return options;
}

function usage() {
  return [
    "Usage:",
    "  node _scripts/notion-writeback.js _posts/2026-05-14-my-post.md",
    "  node _scripts/notion-writeback.js --create-missing _posts/2026-05-14-my-post.md",
    "  node _scripts/notion-writeback.js --all"
  ].join("\n");
}

function ensureEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required`);
  }

  return value;
}

function notionHeaders() {
  return {
    Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION
  };
}

async function notionRequest(method, pathname, body) {
  const response = await fetch(`${NOTION_API_BASE}${pathname}`, {
    method,
    headers: notionHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${method} ${pathname} failed: ${response.status} ${data.message || "Unknown error"}`);
  }

  return data;
}

function collapseWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function parseScalar(raw) {
  const value = raw.trim();

  if (value === "") {
    return "";
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map(unquoteYamlString);
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return unquoteYamlString(value);
}

function unquoteYamlString(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    const inner = value.slice(1, -1);
    return inner.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }

  return value;
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Post must start with YAML front matter");
  }

  const [, frontMatterRaw, bodyRaw] = match;
  const data = {};
  let currentListKey = null;

  for (const line of frontMatterRaw.split(/\r?\n/)) {
    const listItemMatch = line.match(/^\s*-\s*(.*)$/);

    if (currentListKey && listItemMatch) {
      data[currentListKey].push(unquoteYamlString(listItemMatch[1].trim()));
      continue;
    }

    const propertyMatch = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);

    if (!propertyMatch) {
      currentListKey = null;
      continue;
    }

    const [, key, value] = propertyMatch;

    if (value === "") {
      data[key] = [];
      currentListKey = key;
      continue;
    }

    data[key] = parseScalar(value);
    currentListKey = null;
  }

  return {
    data,
    body: bodyRaw.replace(/^\s+/, "")
  };
}

function repoRelativePostPath(filePath) {
  const relative = path.relative(process.cwd(), path.resolve(filePath)).replace(/\\/g, "/");

  if (!relative.startsWith("_posts/")) {
    throw new Error(`Post must be inside _posts/: ${filePath}`);
  }

  return relative;
}

function absoluteSiteUrl(urlPath) {
  if (!urlPath.startsWith("/")) {
    return urlPath;
  }

  return `${SITE_URL}${urlPath}`;
}

function promptTypeToCallout(type) {
  switch (type) {
    case "tip":
      return { icon: "💡", color: "green_bg" };
    case "warning":
      return { icon: "⚠️", color: "yellow_bg" };
    case "danger":
      return { icon: "🚨", color: "red_bg" };
    default:
      return { icon: "ℹ️", color: "blue_bg" };
  }
}

function convertPromptBlockquotes(markdown) {
  const lines = markdown.split("\n");
  const output = [];

  for (let index = 0; index < lines.length; ) {
    if (!lines[index].startsWith(">")) {
      if (!/^\{:\s*\.prompt-[^}]+\s*\}$/.test(lines[index].trim())) {
        output.push(lines[index]);
      }
      index += 1;
      continue;
    }

    const quoteLines = [];

    while (index < lines.length && lines[index].startsWith(">")) {
      quoteLines.push(lines[index].replace(/^>\s?/, ""));
      index += 1;
    }

    const promptMatch = index < lines.length
      ? lines[index].trim().match(/^\{:\s*\.prompt-([a-z]+)\s*\}$/)
      : null;

    if (!promptMatch) {
      output.push(...quoteLines.map((line) => `> ${line}`.trimEnd()));
      continue;
    }

    const { icon, color } = promptTypeToCallout(promptMatch[1]);
    output.push(`<callout icon="${icon}" color="${color}">`);

    for (const line of quoteLines) {
      output.push(`\t${line}`);
    }

    output.push("</callout>");
    index += 1;
  }

  return output.join("\n");
}

function notionizeMarkdown(body) {
  const withoutRawTags = body
    .replace(/^\s*\{% raw %\}\s*$/gm, "")
    .replace(/^\s*\{% endraw %\}\s*$/gm, "")
    .replace(/^\s*\{:\s*\.prompt-[^}]+\s*\}\s*$/gm, "")
    .replace(/\((\/assets\/img\/[^)\s]+)\)/g, (_, assetPath) => `(${absoluteSiteUrl(assetPath)})`);

  return convertPromptBlockquotes(withoutRawTags).trim();
}

async function readManifest() {
  try {
    const raw = await fsp.readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return { version: 1, pages: {} };
    }

    throw error;
  }
}

async function writeManifest(manifest) {
  const sortedPages = Object.fromEntries(
    Object.entries(manifest.pages).sort(([leftId], [rightId]) => leftId.localeCompare(rightId))
  );

  await fsp.writeFile(
    MANIFEST_PATH,
    `${JSON.stringify({ version: 1, pages: sortedPages }, null, 2)}\n`
  );
}

function findPageIdByPostPath(manifest, postPath) {
  for (const [pageId, entry] of Object.entries(manifest.pages || {})) {
    if (entry.postPath === postPath) {
      return pageId;
    }
  }

  return "";
}

function buildProperties(frontMatter, { includePublishProperty = false } = {}) {
  const title = frontMatter.title;
  const date = String(frontMatter.date || "").trim();
  const tags = Array.isArray(frontMatter.tags) ? frontMatter.tags : [];
  const categories = Array.isArray(frontMatter.categories) ? frontMatter.categories : [];

  if (!title) {
    throw new Error("Front matter title is required");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Front matter date is required and must be valid");
  }

  const properties = {
    [TITLE_PROPERTY]: {
      title: [{ text: { content: title } }]
    },
    [DATE_PROPERTY]: {
      date: { start: date }
    },
    [TAGS_PROPERTY]: {
      multi_select: tags.map((name) => ({ name }))
    },
    [CATEGORIES_PROPERTY]: {
      multi_select: categories.map((name) => ({ name }))
    }
  };

  if (includePublishProperty) {
    properties[PUBLISH_PROPERTY] = { checkbox: true };
  }

  return properties;
}

async function updatePageProperties(pageId, properties) {
  return notionRequest("PATCH", `/pages/${pageId}`, { properties });
}

async function createPage(databaseId, properties) {
  try {
    return await notionRequest("POST", "/pages", {
      parent: { database_id: databaseId },
      properties
    });
  } catch (error) {
    if (!error.message.includes("validation_error")) {
      throw error;
    }

    return notionRequest("POST", "/pages", {
      parent: { data_source_id: databaseId },
      properties
    });
  }
}

async function replacePageMarkdown(pageId, markdown) {
  return notionRequest("PATCH", `/pages/${pageId}/markdown`, {
    type: "replace_content",
    replace_content: {
      new_str: markdown,
      allow_deleting_content: true
    }
  });
}

function inferAssetDir(postPath) {
  const postName = path.basename(postPath, path.extname(postPath));
  return path.join("assets", "img", postName).replace(/\\/g, "/");
}

async function syncPost(filePath, options, manifest) {
  const postPath = repoRelativePostPath(filePath);
  const raw = await fsp.readFile(postPath, "utf8");
  const { data: frontMatter, body } = parseFrontMatter(raw);
  const markdown = notionizeMarkdown(body);
  const properties = buildProperties(frontMatter);
  let pageId = findPageIdByPostPath(manifest, postPath);
  let page;

  if (!pageId) {
    if (!options.createMissing) {
      throw new Error(`No Notion page mapping found for ${postPath}. Re-run with --create-missing to create one.`);
    }

    const databaseId = ensureEnv("DATABASE_ID");
    page = await createPage(databaseId, buildProperties(frontMatter, { includePublishProperty: true }));
    pageId = page.id;
  } else {
    page = await updatePageProperties(pageId, properties);
  }

  await replacePageMarkdown(pageId, markdown);
  const updatedPage = await notionRequest("GET", `/pages/${pageId}`);

  manifest.pages[pageId] = {
    postPath,
    assetDir: inferAssetDir(postPath),
    lastEditedTime: updatedPage.last_edited_time
  };

  return { pageId, postPath };
}

async function collectTargetPosts(options, manifest) {
  if (options.all) {
    const postPaths = Object.values(manifest.pages || {})
      .map((entry) => entry.postPath)
      .filter(Boolean)
      .sort();

    if (postPaths.length === 0) {
      throw new Error("No manifest-backed posts found to sync");
    }

    return postPaths;
  }

  if (options.files.length === 0) {
    throw new Error(usage());
  }

  return options.files;
}

(async () => {
  ensureEnv("NOTION_TOKEN");

  const options = parseArgs(process.argv.slice(2));
  const manifest = await readManifest();
  const targets = await collectTargetPosts(options, manifest);

  for (const target of targets) {
    const { postPath, pageId } = await syncPost(target, options, manifest);
    console.log(`Synced ${postPath} -> ${pageId}`);
  }

  await writeManifest(manifest);
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
