# Technical direction

<!--
  구현 방향의 단일 명세다. 실제 저장소 근거와 승인된 결정을 기록하고,
  라이브러리나 인프라는 필요성이 확인되기 전 미리 선택하지 않는다.
-->

## Current system

- Next.js App Router application under src/app.
- Home page renders a menu roulette. The /random route renders restaurant search and map interactions.
- Redux state is used on the /random route; only bookmark and history slices are persisted.

## Stack

- Node.js 20 or newer, Next.js 14.1.0, React 18, TypeScript, Tailwind CSS.
- Redux Toolkit and redux-persist manage map-page state.
- react-kakao-maps-sdk loads Kakao Maps; the browser loader reads NEXT_PUBLIC_MAP_KEY.
- Yarn lockfile is present. package.json scripts expose dev, build, start, and lint; no test script is configured.

## Architecture

- src/app/page.tsx is a server component and reads src/data/foods_list.csv through src/hooks/usedCSVData.ts.
- src/app/random/page.tsx mounts the Redux provider and persistence gate around the client map UI.
- Redux slices live in src/redux/slices; persistence setup is in src/redux/store.ts and src/redux/reduxStorage.ts.

## Data and API

- Menu suggestions come from the checked-in CSV.
- Restaurant results use Kakao Maps JavaScript Places category search in the browser.
- Saved bookmarks and history use browser storage through redux-persist.

## Quality and verification

- Current project checks: yarn lint and yarn build.
- No automated test command is configured.
- Keep verification proportional to changed files and do not treat a build as behavioral coverage.

## Delivery and operations

- No deployment workflow or release process is documented in this repository.

## Constraints

- The map page requires a configured Kakao Maps key in NEXT_PUBLIC_MAP_KEY.
- Keep existing package manager and application dependencies unless a task demonstrates a need to change them.

## Open decisions

- Deployment target and production environment configuration are undocumented.

## Decisions and history

- 2026-09-29: documented the existing app architecture from package.json and src.
