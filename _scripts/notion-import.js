const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const moment = require("moment");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const slugify = require("slugify"); 
// or
// import {NotionToMarkdown} from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const fsp = fs.promises;
const POSTS_ROOT = "_posts";
const MANIFEST_PATH = ".notion-sync-manifest.json";
const CALLOUT_MARKER = "%%%NOTION_CALLOUT";

function isBlankLine(line) {
  return line.trim() === "";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeCodeBlock(body) {
  const lines = body.split("\n");
  const escaped = [];
  let inCodeBlock = false;
  let codeBlockPrefix = "";
  let closingFenceRegex = null;

  for (const line of lines) {
    if (!inCodeBlock) {
      const openingFenceMatch = line.match(/^([>\t ]*)```/);

      if (!openingFenceMatch) {
        escaped.push(line);
        continue;
      }

      codeBlockPrefix = openingFenceMatch[1];
      closingFenceRegex = new RegExp("^" + escapeRegExp(codeBlockPrefix) + "```\\s*$");
      escaped.push(`${codeBlockPrefix}{% raw %}`);
      escaped.push(line);
      inCodeBlock = true;
      continue;
    }

    escaped.push(line);

    if (closingFenceRegex?.test(line)) {
      escaped.push(`${codeBlockPrefix}{% endraw %}`);
      inCodeBlock = false;
      codeBlockPrefix = "";
      closingFenceRegex = null;
    }
  }

  if (inCodeBlock) {
    escaped.push(`${codeBlockPrefix}{% endraw %}`);
  }

  return escaped.join("\n");
}

function replaceTitleOutsideRawBlocks(body) {
  const rawBlocks = [];
  const placeholder = "%%RAW_BLOCK%%";
  body = body.replace(/{% raw %}[\s\S]*?{% endraw %}/g, (match) => {
    rawBlocks.push(match);
    return placeholder;
  });

  const regex = /\n#[^\n]+\n/g;
  body = body.replace(regex, function (match) {
    return "\n" + match.replace("\n#", "\n##");
  });

  rawBlocks.forEach(block => {
    body = body.replace(placeholder, block);
  });

  return body;
}

function getCalloutPromptType(prop) {
  const color = (prop.color || "default").replace(/_background$/, "");

  if (["red", "pink"].includes(color)) {
    return "danger";
  }

  if (["yellow", "orange", "brown"].includes(color)) {
    return "warning";
  }

  if (color === "green") {
    return "tip";
  }

  const icon = prop.icon?.emoji || "";

  if (["💡", "✅", "✔️", "🌱"].includes(icon)) {
    return "tip";
  }

  if (["⚠️", "⚠", "🚧"].includes(icon)) {
    return "warning";
  }

  if (["🚨", "⛔", "❌"].includes(icon)) {
    return "danger";
  }

  return "info";
}

function normalizeCalloutBlocks(body) {
  const lines = body.split("\n");
  const normalized = [];

  for (let i = 0; i < lines.length; i += 1) {
    const markerMatch = lines[i].match(/^(\t*)%%%NOTION_CALLOUT:([a-z]+)%%% ?(.*)$/);

    if (!markerMatch) {
      normalized.push(lines[i]);
      continue;
    }

    const [, prefix, promptType, firstLineRaw] = markerMatch;
    const calloutLines = [];
    const firstLine = firstLineRaw.trimEnd();

    if (firstLine !== "") {
      calloutLines.push(firstLine);
    }

    let j = i + 1;
    const nestedPrefix = `${prefix}\t`;

    while (j < lines.length) {
      const line = lines[j];

      if (line.startsWith(nestedPrefix)) {
        const nestedLine = line.slice(nestedPrefix.length);
        calloutLines.push(isBlankLine(nestedLine) ? "" : normalizeCalloutNestedLine(nestedLine));
        j += 1;
        continue;
      }

      if (isBlankLine(line)) {
        let k = j + 1;

        while (k < lines.length && isBlankLine(lines[k])) {
          k += 1;
        }

        if (k < lines.length && lines[k].startsWith(nestedPrefix)) {
          calloutLines.push("");
          j += 1;
          continue;
        }
      }

      break;
    }

    while (calloutLines.length > 0 && calloutLines[0] === "") {
      calloutLines.shift();
    }

    while (calloutLines.length > 0 && calloutLines[calloutLines.length - 1] === "") {
      calloutLines.pop();
    }

    if (calloutLines.length === 0) {
      calloutLines.push("");
    }

    calloutLines.forEach((line) => {
      normalized.push(line === "" ? `${prefix}>` : `${prefix}> ${line}`);
    });
    normalized.push(`${prefix}{: .prompt-${promptType} }`);

    i = j - 1;
  }

  return normalized.join("\n");
}

function normalizeCalloutNestedLine(line) {
  return line.replace(/^\t+/, (tabs) => "  ".repeat(tabs.length));
}

function stripOneCalloutIndent(line, prefix) {
  if (line.startsWith(`${prefix}\t`)) {
    return line.slice(prefix.length + 1);
  }

  if (line.startsWith(`${prefix}    `)) {
    return line.slice(prefix.length + 4);
  }

  return null;
}

function mergePromptContinuationBlocks(body) {
  const lines = body.split("\n");
  const merged = [];

  for (let i = 0; i < lines.length; i += 1) {
    const promptMatch = lines[i].match(/^(\t*)\{: \.prompt-(info|tip|warning|danger) \}$/);

    if (!promptMatch) {
      merged.push(lines[i]);
      continue;
    }

    const [promptLine, prefix] = promptMatch;
    const continuationLines = [];
    let hasContinuation = false;
    let j = i + 1;

    while (j < lines.length) {
      const line = lines[j];
      const strippedLine = stripOneCalloutIndent(line, prefix);

      if (strippedLine !== null) {
        continuationLines.push(isBlankLine(strippedLine) ? "" : normalizeCalloutNestedLine(strippedLine));
        hasContinuation = true;
        j += 1;
        continue;
      }

      if (isBlankLine(line)) {
        let k = j + 1;

        while (k < lines.length && isBlankLine(lines[k])) {
          k += 1;
        }

        if (k < lines.length && stripOneCalloutIndent(lines[k], prefix) !== null) {
          continuationLines.push("");
          j += 1;
          continue;
        }
      }

      break;
    }

    if (!hasContinuation) {
      merged.push(promptLine);
      continue;
    }

    continuationLines.forEach((line) => {
      merged.push(line === "" ? `${prefix}>` : `${prefix}> ${line}`);
    });
    merged.push(promptLine);
    i = j - 1;
  }

  return merged.join("\n");
}

async function downloadImage(url, outputPath) {
  const response = await axios({
    method: "get",
    url,
    responseType: "arraybuffer"
  });

  await fsp.writeFile(outputPath, response.data);
}

function getImageExtension(url) {
  try {
    const { pathname } = new URL(url);
    const extension = path.extname(pathname);
    return extension || ".png";
  } catch {
    return ".png";
  }
}

async function localizeImagesOutsideRawBlocks(body, postName) {
  const rawBlocks = [];
  const placeholder = "%%RAW_BLOCK%%";
  const bodyWithoutRawBlocks = body.replace(/{% raw %}[\s\S]*?{% endraw %}/g, (match) => {
    rawBlocks.push(match);
    return placeholder;
  });

  const imageRegex = /!\[(.*?)\]\((https?:\/\/[^)\s]+)\)/g;
  const imageDir = path.join("assets", "img", postName);
  let index = 0;
  let cursor = 0;
  let result = "";

  for (const match of bodyWithoutRawBlocks.matchAll(imageRegex)) {
    const [fullMatch, altText, imageUrl] = match;
    const start = match.index;

    result += bodyWithoutRawBlocks.slice(cursor, start);

    const extension = getImageExtension(imageUrl);
    const imagePath = path.join(imageDir, `${index}${extension}`);
    const imageUrlPath = `/${imagePath.replace(/\\/g, "/")}`;

    try {
      await fsp.mkdir(imageDir, { recursive: true });
      await downloadImage(imageUrl, imagePath);
      result += `![${altText}](${imageUrlPath})`;
      index += 1;
    } catch (error) {
      console.warn(`Failed to download image: ${imageUrl}`);
      result += fullMatch;
    }

    cursor = start + fullMatch.length;
  }

  result += bodyWithoutRawBlocks.slice(cursor);

  rawBlocks.forEach((block) => {
    result = result.replace(placeholder, block);
  });

  return result;
}

async function readManifest() {
  try {
    const raw = await fsp.readFile(MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      version: 1,
      pages: parsed.pages || {}
    };
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

async function removePath(targetPath) {
  await fsp.rm(targetPath, { recursive: true, force: true });
}

async function fetchPublishedPages(databaseId) {
  let response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "발행여부",
      checkbox: { equals: true },
    },
  });

  const pages = [...response.results];
  while (response.has_more) {
    response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: response.next_cursor,
      filter: {
        property: "발행여부",
        checkbox: { equals: true },
      },
    });
    pages.push(...response.results);
  }

  return pages.sort((left, right) => left.id.localeCompare(right.id));
}

// passing notion client to the option
const n2m = new NotionToMarkdown({
  notionClient: notion,
  convertImages: true,
  removeUnverifiedLinks: false
});

/* ========= Notion 색상 → CSS 클래스 매핑 ========= */
const colorClassMap = {
  red:    "notion-red",
  yellow: "notion-yellow",
  green:  "notion-green",
  blue:   "notion-blue",
  purple: "notion-purple",
  pink:   "notion-pink",
  gray:   "notion-gray"
};

/* ========= 인라인 rich_text를 HTML/MD로 변환 ========= */
function inlineRich(rt) {
  // 기본 텍스트 + 마크다운 특수문자 이스케이프
  let txt = (rt.plain_text || "").replace(/([*_`])/g, "\\$1");

  // 강조(볼드/이탤릭/코드)
  if (rt.annotations?.code)   txt = "`" + txt + "`";
  if (rt.annotations?.bold)   txt = `**${txt}**`;
  if (rt.annotations?.italic) txt = `_${txt}_`;
  if (rt.annotations?.strikethrough) txt = `~~${txt}~~`;

  // 링크
  if (rt.href) txt = `[${txt}](${rt.href})`;

  // 색상 (텍스트/배경 공통 처리: *_background → 기본색으로 다운그레이드)
  const color = rt.annotations?.color || "default";
  if (color === "default") return txt;
  const base = color.replace(/_background$/, "");
  const cls  = colorClassMap[base] || "notion-gray";
  return `<span class="${cls}">${txt}</span>`;
}

/* ========= 블록 단위 트랜스포머 (색상 + callout 중복 방지) ========= */
const richTextBlocks = [
  "paragraph",
  "heading_1", "heading_2", "heading_3",
  "bulleted_list_item", "numbered_list_item",
  "quote", "callout"
];

for (const type of richTextBlocks) {
  n2m.setCustomTransformer(type, async (block) => {
    const prop = block[type] || {};
    const parts = (prop.rich_text || []).map(inlineRich);
    const txt = parts.join("");

    if (type.startsWith("heading_")) {
      const level = Number(type.split("_")[1]) || 1;
      return `${"#".repeat(level)} ${txt}`;
    }
    if (type === "callout") {
      const promptType = getCalloutPromptType(prop);
      const content = txt.trim();
      return `${CALLOUT_MARKER}:${promptType}%%%${content ? ` ${content}` : ""}`;
    }
    if (type === "bulleted_list_item") return `- ${txt}`;
    if (type === "numbered_list_item") return `1. ${txt}`;
    if (type === "quote") return `> ${txt}`;

    // paragraph 기본
    return txt;
  });
}

/* 참고: 예전에 시도했던 text 트랜스포머는 notion-to-md에 "text" 타입 훅이 없어 호출되지 않습니다.
n2m.setCustomTransformer("text", async (block) => { ... });
*/

(async () => {
  fs.mkdirSync(POSTS_ROOT, { recursive: true });

  const manifest = await readManifest();
  const previousPages = manifest.pages;
  const databaseId = process.env.DATABASE_ID;
  const pages = await fetchPublishedPages(databaseId);
  const currentPageIds = new Set(pages.map((page) => page.id));
  const nextPages = {};
  const claimedPostPaths = new Map();

  for (const r of pages) {
    const id = r.id;
    const previousEntry = previousPages[id];

    if (
      previousEntry?.lastEditedTime === r.last_edited_time &&
      previousEntry.postPath &&
      fs.existsSync(previousEntry.postPath)
    ) {
      nextPages[id] = previousEntry;
      continue;
    }

    // date
    let date = moment(r.created_time).format("YYYY-MM-DD");
    const pdate = r.properties?.["날짜"]?.["date"]?.["start"];
    if (pdate) date = moment(pdate).format("YYYY-MM-DD");

    // title
    // let title = id;
    // let ptitle = r.properties?.["게시물"]?.["title"];
    // if (ptitle?.length > 0) {
    //   title = ptitle[0]?.["plain_text"];
    // }
    const ptitleBlocks = r.properties?.["게시물"]?.["title"] || [];
    let title = ptitleBlocks.map(t => t.plain_text).join('').trim();
    if (title === '') title = `Untitled-${id.slice(0, 8)}`;

    // tags
    let tags = [];
    const ptags = r.properties?.["태그"]?.["multi_select"] || [];
    for (const t of ptags) {
      const n = t?.["name"];
      if (n) tags.push(n);
    }

    // categories
    let cats = [];
    const pcats = r.properties?.["카테고리"]?.["multi_select"] || [];
    for (const t of pcats) {
      const n = t?.["name"];
      if (n) cats.push(n);
    }

    // frontmatter
    // let fmtags = "";
    // let fmcats = "";
    // if (tags.length > 0) {
    //   fmtags += "\ntags: [";
    //   for (const t of tags) {
    //     fmtags += t + ", ";
    //   }
    //   fmtags += "]";
    // }
    // if (cats.length > 0) {
    //   fmcats += "\ncategories: [";
    //   for (const t of cats) {
    //     fmcats += t + ", ";
    //   }
    //   fmcats += "]";
    // }
    const fmtags = tags.length ? `\ntags: [${tags.join(", ")}]` : "";
    const fmcats = cats.length ? `\ncategories: [${cats.join(", ")}]` : "";
    const safeTitle = title.replace(/"/g, '\\"');

    const fm = `---
layout: post
date: ${date}
title: "${safeTitle}"${fmtags}${fmcats}
---
`;

    // Markdown 변환
    const mdblocks = await n2m.pageToMarkdown(id);
    let md = n2m.toMarkdownString(mdblocks)["parent"];

    md = escapeCodeBlock(md);
    md = replaceTitleOutsideRawBlocks(md);
    md = normalizeCalloutBlocks(md);
    md = mergePromptContinuationBlocks(md);

    // 안전한 파일명 (언더스코어 사용)
    let slug = slugify(title, { lower: true, strict: true, replacement: "_" });
    if (slug === "") slug = id.slice(0, 8);   // 전부 한글·특수문자일 때 대비
    slug = slug.replace(/_+$/, "");           // 끝쪽 '_' 정리
    const postName = `${date}-${slug}`;
    const postPath = path.join(POSTS_ROOT, `${postName}.md`);
    const assetDir = path.join("assets", "img", postName);

    if (claimedPostPaths.has(postPath)) {
      throw new Error(`Duplicate post path generated for Notion pages ${claimedPostPaths.get(postPath)} and ${id}: ${postPath}`);
    }

    claimedPostPaths.set(postPath, id);

    if (previousEntry?.postPath && previousEntry.postPath !== postPath) {
      await removePath(previousEntry.postPath);
    }

    if (previousEntry?.assetDir && previousEntry.assetDir !== assetDir) {
      await removePath(previousEntry.assetDir);
    }

    await removePath(assetDir);

    const editedMd = await localizeImagesOutsideRawBlocks(md, postName);

    await fsp.writeFile(postPath, fm + editedMd);

    nextPages[id] = {
      postPath,
      assetDir,
      lastEditedTime: r.last_edited_time
    };
  }

  for (const [pageId, previousEntry] of Object.entries(previousPages)) {
    if (currentPageIds.has(pageId)) {
      continue;
    }

    if (previousEntry.postPath) {
      await removePath(previousEntry.postPath);
    }

    if (previousEntry.assetDir) {
      await removePath(previousEntry.assetDir);
    }
  }

  await writeManifest({ version: 1, pages: nextPages });
})();
