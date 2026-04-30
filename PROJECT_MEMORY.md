# Project Memory

이 저장소는 개인 블로그 `https://jh2ee.github.io`용 `Jekyll + Chirpy` 기반 사이트다.
추가로 Notion 데이터베이스의 글을 `_posts/`로 가져오는 import 파이프라인이 붙어 있다.

## 다음 세션 시작 규칙

- 이 저장소에서 작업을 시작할 때는 먼저 `PROJECT_MEMORY.md`를 읽는다.
- 파이프라인 관련 수정이면 `.github/workflows/pages-deploy.yml`, `_scripts/notion-import.js`, `package.json`을 같이 확인한다.
- 프론트엔드 소스(`_javascript`, `_sass`, `assets/css`)를 수정했다면 빌드 산출물까지 같이 확인한다.

## 한눈에 보는 구조

- 사이트 엔진: `Jekyll`
- 테마 베이스: `jekyll-theme-chirpy`
- 게시물 원본: `_posts/*.md`
- Notion importer: `_scripts/notion-import.js`
- 배포 워크플로: `.github/workflows/pages-deploy.yml`
- JS 번들 결과물: `assets/js/dist/*.min.js`
- PurgeCSS 결과물: `_sass/vendors/_bootstrap.scss`

## Notion Import 흐름

워크플로의 `importer` job이 먼저 실행된다.

1. `actions/checkout@v4`
2. `actions/setup-node@v4` with Node 20
3. `npm ci`
4. `node _scripts/notion-import.js`
5. 변경된 `_posts/`, `assets/img/`, `.notion-sync-manifest.json`이 있으면 auto-commit

관련 파일:

- `.github/workflows/pages-deploy.yml`
- `_scripts/notion-import.js`

### importer 입력

- `NOTION_TOKEN`
- `DATABASE_ID`

GitHub Actions secrets로 주입된다.

### importer가 하는 일

- Notion database에서 `발행여부 == true`인 페이지 전체를 조회
- 각 페이지의 `날짜`, `게시물`, `태그`, `카테고리` 속성을 읽음
- front matter를 만들어 `_posts/YYYY-MM-DD-slug.md` 생성
- 본문은 `notion-to-md`로 Markdown 변환
- 코드블록은 `{% raw %}`로 감싸 Jekyll/Liquid 충돌 회피
- 인라인 텍스트 색상은 `<span class="notion-red">...` 같은 HTML로 변환
- 일부 제목은 한 단계 낮춰 `# -> ##` 조정
- 로컬 이미지 경로와 post 경로를 `.notion-sync-manifest.json`에 기록
- manifest와 현재 Notion 상태를 비교해 수정/삭제/비공개 전환도 반영

### 발행여부 동작 규칙

- `발행여부 == true`면 게시 대상이다.
- `발행여부 == false`면 다음 sync에서 게시 대상에서 제외된다.
- 이미 sync된 글이 `false`로 바뀌거나 Notion에서 삭제/archived되면, manifest 기준으로 해당 `_posts/*.md`와 `assets/img/...`도 삭제 대상이 된다.
- 즉, 현재 파이프라인은 `신규 발행`, `수정 반영`, `삭제/비공개 반영`을 모두 같은 규칙으로 처리한다.

### 현재 동기화 의미

- schedule 또는 `workflow_dispatch` run은 Notion과 저장소의 차이를 계산해 필요한 변경만 commit한다.
- 변경이 없으면 auto-commit도 발생하지 않는다.
- auto-commit으로 push가 발생하면, 그 다음 `push` workflow run이 실제 build/deploy를 담당한다.
- 직접 코드 push가 들어온 경우에도 같은 workflow가 build/deploy를 수행한다.

### importer 출력 규칙

- 글 파일 위치: `_posts/`
- 파일명 규칙: `YYYY-MM-DD-slug.md`
- slug는 `slugify(..., replacement: "_")` 사용
- Markdown의 원격 이미지 링크는 `assets/img/<postName>/<index>.<ext>` 로컬 파일로 저장 후 치환
- Notion sync 상태 파일: `.notion-sync-manifest.json`
- custom 색상 스타일은 `assets/css/jekyll-theme-chirpy.scss`에 존재

## Build 흐름

이 저장소의 빌드는 `Node 사전빌드`와 `Jekyll 사이트 빌드`가 분리되어 있다.

### 1) Node 사전빌드

`package.json` 기준 주요 명령:

- `npm run build`
- `npm run build:css`
- `npm run build:js`
- `npm test`

#### CSS 빌드

- `node purgecss.js`
- Bootstrap CSS를 분석해 사용된 클래스만 남긴 결과를 `_sass/vendors/_bootstrap.scss`로 생성
- 프로덕션 CSS 엔트리 `assets/css/jekyll-theme-chirpy.scss`는 `main.bundle`을 사용
- `_sass/main.bundle.scss`는 `vendors/bootstrap` + `main`을 묶음

#### JS 빌드

- `rollup.config.js`가 `_javascript/*.js`와 `_javascript/pwa/*.js`를 번들
- 결과물은 `assets/js/dist/*.min.js`
- 템플릿에서 직접 로드됨:
  - `_includes/head.html`
  - `_includes/js-selector.html`

### 2) Jekyll 사이트 빌드

GitHub Actions `build` job 순서:

1. fresh checkout
2. `actions/configure-pages@v4`
3. `ruby/setup-ruby@v1`
4. `bundle exec jekyll b -d "_site${base_path}"`
5. `bundle exec htmlproofer _site --disable-external --checks html --allow-hash-href`
6. Pages artifact 업로드

로컬에서는 다음 스크립트를 참고한다.

- 개발 서버: `tools/run.sh`
- 프로덕션 빌드 + 검증: `tools/test.sh`

## Deploy 흐름

GitHub Actions `deploy` job이 `build` 이후 실행된다.

1. `actions/deploy-pages@v4`
2. 업로드된 Pages artifact를 GitHub Pages에 배포

트리거:

- `push` to `main` or `master`
- `workflow_dispatch`
- `schedule` every hour

## 정적 자산 로딩 방식

- 기본은 CDN 기반 자산 로딩
- 관련 설정: `_includes/origin-type.html`, `_data/origin/cors.yml`
- self-host 자산을 쓰려면 `assets/lib` submodule 필요
- self-host 설정 파일: `_data/origin/basic.yml`, `.gitmodules`

주의:

- 현재 워크플로는 submodule checkout을 하지 않음
- 따라서 production에서 `assets.self_host.enabled: true`를 쓰려면 workflow도 같이 수정해야 함

## 작업할 때 꼭 기억할 점

### 1. CI는 Node 빌드를 하지 않는다

`build` job은 Ruby/Jekyll만 돌고 `npm run build`를 실행하지 않는다.

의미:

- `_javascript`를 수정하면 `assets/js/dist/*.min.js`도 갱신해야 한다.
- PurgeCSS/스타일 구조를 수정하면 `_sass/vendors/_bootstrap.scss`도 갱신되어 있어야 한다.
- 그렇지 않으면 로컬 소스와 실제 배포 산출물이 어긋날 수 있다.

### 2. 개발/프로덕션 CSS 경로가 다르다

- development: Bootstrap CDN 사용
- production: PurgeCSS 결과를 Jekyll SCSS 빌드에 포함

의미:

- 개발에서는 정상인데 production에서만 스타일이 깨질 수 있다.
- PurgeCSS safelist 변경 필요 여부를 항상 의심한다.

### 3. import 결과는 Markdown + 일부 HTML 혼합이다

- 색상 텍스트는 `<span class="notion-red">...` 형태
- 코드블록은 raw 태그로 감쌈
- 일부 제목 레벨을 후처리함

즉, 순수 Markdown만 다루는 프로젝트로 보면 안 된다.

## Known Issues

### 1. manifest 도입 첫 sync 전의 과거 글은 수동 확인이 필요할 수 있음

- `.notion-sync-manifest.json`은 현재부터 Notion page id와 로컬 파일 경로를 추적한다.
- 따라서 manifest가 없던 시절에 생성된 글 중 일부는 첫 sync 이후 한 번 더 수동 점검이 필요할 수 있다.
- 특히 과거에 제목/날짜가 이미 바뀌었거나, Notion에서 먼저 삭제된 글은 orphan 파일이 남아 있을 수 있다.

### 2. 기존 published 글은 한 번 재sync되어야 최신 규칙이 완전히 반영됨

- 로컬 이미지 치환, `notion_page_id` front matter, manifest 등록은 다음 sync부터 반영된다.
- 즉, 현재 이미 게시 중인 Notion 글들은 schedule 또는 수동 실행을 한 번 거쳐야 최신 형태로 정리된다.

### 3. 로케일 fallback 가능성

- `_config.yml`은 `lang: ko`
- locale 파일은 `ko-KR.yml`

exact match가 필요하면 영어 fallback이 날 수 있다.

### 4. build job이 importer 최신 commit을 같은 run에서 확실히 반영하는지 애매함

- importer는 auto-commit 수행
- build는 artifact를 넘겨받지 않고 다시 checkout만 수행

운 좋게 최신 ref를 잡더라도, 구조적으로는 확인 포인트다.

## 자주 쓰는 명령

### 로컬 개발

```bash
bash tools/run.sh
```

### 프로덕션 모드 로컬 실행

```bash
bash tools/run.sh --production
```

### 프론트엔드 빌드

```bash
npm run build
```

### SCSS lint

```bash
npm test
```

### 프로덕션 빌드 + 링크 검사

```bash
bash tools/test.sh
```

## GitHub 검증 체크리스트

GitHub에서 Notion import와 auto-commit이 정상 동작하는지 확인할 때는 아래 순서로 본다.

### 사전 조건

- Notion 테스트 글 1개를 만들고 `발행여부 = true` 상태로 둔다.
- GitHub Actions secrets에 `NOTION_TOKEN`, `DATABASE_ID`가 설정되어 있어야 한다.
- Notion integration token이 해당 database/page를 읽을 권한이 있어야 한다.

### 확인 순서

1. GitHub 저장소 `Actions` 탭에서 `Import → Build → Deploy`를 수동 실행한다.
2. 새 workflow run이 생성됐는지 확인한다.
3. `importer` job의 `node _scripts/notion-import.js` step이 성공했는지 본다.
4. 같은 job의 `git-auto-commit-action` step이 성공했는지 본다.
5. 저장소 `Commits` 탭에 `[Auto] Notion posts update` 커밋이 생겼는지 본다.
6. 해당 커밋 diff에 `_posts/*.md`, `assets/img/...`, `.notion-sync-manifest.json` 변경이 포함됐는지 본다.
7. auto-commit이 push를 만들면 이어서 생성된 `push` run에서 `build` job이 성공했는지 본다.
8. 같은 `push` run에서 `deploy` job이 성공했는지 본다.
9. 배포된 사이트에서 새 글이 실제로 보이는지 확인한다.

### 정상 동작 패턴

- 새 글이 있으면 auto-commit이 push를 발생시켜 workflow run이 2개 보일 수 있다.
- 첫 run은 `workflow_dispatch` 또는 `schedule`로 시작될 수 있다.
- 두 번째 run은 auto-commit이 만든 `push`로 시작될 수 있다.
- 첫 run은 sync와 commit만 담당하고, 두 번째 `push` run이 build/deploy를 담당하는 구조가 정상이다.
- 최종적으로 `[Auto] Notion posts update` 커밋이 1번 생기고 마지막 `push` run이 성공하면 정상이다.

### 반복 커밋 방지 확인

- 같은 상태로 다음 schedule run에서 또 `[Auto] Notion posts update` 커밋이 생기면 안 된다.
- 다음 run에서는 변경 없음으로 끝나거나 auto-commit step에서 commit이 발생하지 않아야 한다.
- 반복 커밋이 계속 생기면 manifest 갱신 로직이나 비결정적 출력 순서를 의심한다.

### 수정 반영 확인

- 현재 구조에서는 이미 게시된 Notion 글을 수정하면 다음 sync에서 자동 반영되는 것이 정상이다.
- 확인 방법:
  1. 이미 import되어 게시 중인 Notion 글을 수정한다.
  2. 다음 schedule 또는 `Run workflow`를 실행한다.
  3. 새 `[Auto] Notion posts update` 커밋이 생기는지 본다.
  4. GitHub의 `_posts/*.md` 내용이 수정 사항대로 바뀌었는지 본다.
  5. 이어진 `push` run에서 build/deploy 후 실제 사이트 내용도 갱신됐는지 본다.

### 삭제 반영 확인

- 현재 구조에서는 Notion에서 글을 삭제하거나 `발행여부`를 `false`로 바꾸면 다음 sync에서 GitHub의 기존 `_posts/*.md`가 자동 삭제되는 것이 정상이다.
- 확인 방법:
  1. 이미 import된 원본 Notion 글을 삭제하거나 archive 처리한다.
  2. 다음 schedule 또는 `Run workflow`를 실행한다.
  3. 삭제를 포함한 `[Auto] Notion posts update` 커밋이 생기는지 본다.
  4. 해당 diff에서 `_posts/*.md` 또는 `assets/img/...` 삭제가 잡히는지 본다.
  5. 이어진 `push` run 배포 후 사이트에서도 글이 사라졌는지 본다.

### 신규 발행 확인

- 현재 구조에서는 Notion 글을 새로 만들고 `발행여부 = true`로 두면 다음 sync에서 자동 게시되는 것이 정상이다.
- 확인 방법:
  1. 새 Notion 글을 만들고 `발행여부 = true`로 둔다.
  2. 다음 schedule 또는 `Run workflow`를 실행한다.
  3. `[Auto] Notion posts update` 커밋이 생기는지 본다.
  4. 새 `_posts/*.md`와 필요한 `assets/img/...`가 생성됐는지 본다.
  5. 이어진 `push` run 배포 후 사이트에서 새 글이 보이는지 본다.

### GitHub 설정에서 볼 것

- `Settings -> Secrets and variables -> Actions`에 `NOTION_TOKEN`, `DATABASE_ID`가 존재하는가?
- `Settings -> Actions -> General`에서 workflow write 권한이 막혀 있지 않은가?
- branch protection rule이 GitHub Actions의 direct push를 막고 있지 않은가?

### 문제 징후

- `git-auto-commit-action` 실패: branch protection 또는 repo write 권한 문제 가능성
- `[Auto] Notion posts update` 커밋은 생기는데 다음 run에서도 계속 또 생김: manifest 불안정 또는 생성 결과 비결정성 가능성
- commit은 생겼는데 사이트에 글이 안 보임: `build`/`deploy` run 또는 GitHub Pages 배포 상태 추가 확인 필요

### 현재 해석 주의

- 새 글 생성 반영: 지원
- 같은 글의 Notion 수정 반영: 지원
- 같은 글의 Notion 삭제 반영: 지원

## 변경 전 체크리스트

- Notion importer를 건드리는가?
- 워크플로 secret 이름과 Notion property 이름이 맞는가?
- `발행여부` true -> publish 대상 / false 또는 삭제 -> 제거 대상 규칙을 유지하는가?
- `_javascript` 수정 후 `assets/js/dist`를 재생성했는가?
- CSS 관련 수정 후 production 스타일 경로까지 확인했는가?
- Pages workflow가 submodule 또는 build 산출물을 기대하는지 확인했는가?

## 다음에 개선하면 좋은 항목

- 필요하면 Notion query에 정렬 기준을 명시적으로 추가
- 첫 manifest bootstrap 이후 남아 있을 수 있는 historical orphan post 정리
- 필요하면 CI에서 `npm run build`도 수행하도록 workflow 정리
- 로케일 설정 `ko` / `ko-KR` 불일치 정리
