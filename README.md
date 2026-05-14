# jh2ee.github.io

Personal blog repository for `https://jh2ee.github.io`.

## Stack

- Jekyll + Chirpy
- GitHub Pages
- Notion-to-post importer

## Writing Posts

- Manual posts live in `_posts/`
- Notion posts are synced by the `Import → Build → Deploy` GitHub Actions workflow
- Imported images are localized under `assets/img/`

## Local Commands

```bash
bash tools/run.sh
npm run build
bash tools/test.sh
```

## Notes

- The production deploy workflow does not run the Node asset build step
- If `_javascript` or CSS sources change, generated assets must be updated before deploy

## License

This repository includes code derived from the Chirpy theme and keeps the upstream license in `LICENSE`.
