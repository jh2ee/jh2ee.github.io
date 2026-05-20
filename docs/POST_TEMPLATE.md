# Post Template

## Manual Post

```md
---
layout: post
date: 2026-05-20
title: "[논문 리뷰] Paper Title"
excerpt: "검색 결과와 글 목록에 노출될 1-2문장 요약"
image: /assets/img/2026-05-20-paper-title/0.png
tags: [JEPA, SSL]
categories: [Paper Review]
---
```

`excerpt`와 `image`는 선택이지만, 검색 노출과 클릭률 측면에서는 넣는 편이 좋습니다.

## Notion Post

Notion 데이터베이스에서 아래 속성을 채우면 됩니다.

- `게시물`: 글 제목
- `날짜`: 게시 날짜
- `태그`: 태그 목록
- `카테고리`: 카테고리 목록
- `발행여부`: `true`일 때만 import

본문 작성 가이드:

- 첫 문단은 글 전체를 설명하는 1-2문장 요약으로 작성
- 첫 번째 본문 이미지는 대표 이미지로 사용될 수 있음
- 검색 결과에는 `excerpt`로 쓸 짧고 명확한 문장을 앞부분에 두는 것이 좋음

## Write Back To Notion

기존에 Notion과 연결된 글은 아래 명령으로 GitHub 포스트 내용을 Notion page로 다시 밀어넣을 수 있습니다.

```bash
npm run notion:push -- _posts/2026-05-14-a_path_towards_autonomous_machine_intelligence.md
```

manifest에 없는 새 로컬 글을 Notion DB에 새 page로 만들면서 올리려면:

```bash
npm run notion:push -- --create-missing _posts/2026-05-20-my-new-post.md
```

주의:

- `NOTION_TOKEN`이 로컬 환경에 있어야 함
- 새 page 생성 시 `DATABASE_ID`도 필요함
- 로컬 이미지 경로는 `https://jh2ee.github.io/...` 절대 URL로 변환되어 Notion에 저장됨

GitHub Actions로도 실행할 수 있습니다.

1. `Actions` -> `Notion Write-back`
2. `Run workflow`
3. `post_path` 입력 또는 `sync_all=true`
