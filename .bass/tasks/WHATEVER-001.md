---
id: WHATEVER-001
title: BASS 연결과 Redux persistence 설정 중복 제거
status: DONE
type: feature
profile: web

risk:
  level: low
  reasons: []

human:
  owner: user
  reviewer_required: true

coordination:
  parent_task: null
  depends_on: []
  owned_paths:
    - src/redux/store.ts
    - src/redux/reduxStorage.ts
    - src/redux/slices/selectedPlaceSlice.ts
    - .bass/tasks/WHATEVER-001.md
    - .bass/records/WHATEVER-001.json
    - .bass/evidence/WHATEVER-001/
    - .bass/events.jsonl

loop:
  stop_when:
    - acceptance criteria pass
    - required evaluators pass
    - no open high/medium findings
  required_evidence: []
---

## Problem

저장소에 BASS 작업 계약이 없고, Redux persistence 저장소 구현도 store.ts와 reduxStorage.ts에 중복되어 있다. 기존 앱 문서와 검증 절차를 보존하면서 BASS를 연결하고, 중복 구현을 없앤다.

## What we are shipping

기존 Next.js 앱에 BASS 0.7.0 지침과 작업 기록을 연결하고, 현재 앱의 제품·기술·디자인 근거를 문서화한다. reduxStorage.ts를 store의 유일한 저장소 구현으로 사용한다. 검증 중 발견한 사용하지 않는 Redux import도 제거한다. 앱의 런타임과 persistence 동작은 유지한다.

## What we are not shipping

Redux slice, persistence 대상, 지도 동작, UI, 애플리케이션 의존성 변경, 외부 플러그인 설치.

## Facts

- CONFIRMED: store.ts는 createWebStorage와 서버용 no-op 저장소를 직접 만든다.
- CONFIRMED: reduxStorage.ts에는 같은 동작의 저장소 구현이 있지만 사용처가 없다.
- CONFIRMED: persistence whitelist는 bookmark와 history다.
- CONFIRMED: 앱은 Next.js App Router, React, TypeScript 기반이며 package.json과 yarn.lock이 기존 패키지 경계를 이룬다.
- CONFIRMED: setup은 bass.yaml, AGENTS/Claude/Cursor 연결 지침, PRODUCT/TECH/DESIGN 문서와 .bass 기록 디렉터리를 생성하고 대상 package.json은 바꾸지 않았다.
- CONFIRMED: 첫 lint/build 실행은 selectedPlaceSlice.ts의 사용하지 않는 PlaceType import에서 실패했다.

## Decisions

- DECISION: 중복 구현을 없애고 reduxStorage.ts를 공유한다.
- DECISION: 사용되지 않는 store.ts의 default storage export를 제거한다. 현재 소비자는 named store와 persistor만 가져온다.
- DECISION: BASS를 프로젝트 문서와 작업 기록으로 연결하며 앱의 package.json과 의존성은 유지한다.
- DECISION: selectedPlaceSlice.ts에서 lint를 막는 사용하지 않는 import만 제거한다. Slice 동작은 바꾸지 않는다.

## Assumptions

none

## Relevant context

- src/redux/store.ts
- src/redux/reduxStorage.ts
- src/redux/slices/selectedPlaceSlice.ts
- src/app/random/page.tsx
- bass.yaml
- AGENTS.md
- PRODUCT.md
- TECH.md
- DESIGN.md

## Allowed scope

- .gitignore
- bass.yaml
- AGENTS.md
- CLAUDE.md
- .cursor/rules/bass.mdc
- PRODUCT.md
- TECH.md
- DESIGN.md
- src/redux/store.ts
- src/redux/reduxStorage.ts
- src/redux/slices/selectedPlaceSlice.ts
- .bass/tasks/WHATEVER-001.md
- .bass/records/WHATEVER-001.json
- .bass/evidence/WHATEVER-001/
- .bass/events.jsonl

## Forbidden scope

- package.json, yarn.lock, other src files
- bookmarks, history, Redux state shape, persistence whitelist

## Acceptance criteria

- BASS 0.7.0 configuration, managed agent instructions, and task/evidence directories exist.
- Product, technical, and design notes describe repository evidence and mark missing user/product evidence.
- BASS setup has not changed package.json or yarn.lock.
- createNoopStorage and createWebStorage are configured in one place only.
- store.ts uses the shared storage without changing the bookmark/history whitelist.
- SSR and browser storage selection remain unchanged.
- Existing imports of store and persistor continue to work.
- selectedPlaceSlice.ts contains no unused import that blocks the existing lint/build commands.

## Human judgment

No product or design decision is introduced.

## Verification

- BASS task validation and pre-task gate
- yarn lint
- yarn build
- BASS pre-review gate and task record

## Rollback

Revert the store.ts change. The previous storage implementation remains recoverable from the feature branch history.
