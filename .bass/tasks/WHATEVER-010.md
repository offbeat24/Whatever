---
id: WHATEVER-010
title: 지도 범위 기반 식당 후보 갱신과 룰렛 반복 방지
status: DONE
type: bugfix
profile: web

risk:
  level: low
  reasons:
    - 브라우저 내 지도 검색 시점과 후보 선택만 바꾸며 외부 데이터나 계정 설정은 변경하지 않는다.

human:
  owner: user
  reviewer_required: true

coordination:
  parent_task: null
  depends_on: []
  owned_paths:
    - src/app/random/components/map.tsx
    - src/app/components/roulette.tsx
    - .bass/tasks/WHATEVER-010.md
    - .bass/records/WHATEVER-010.json
    - .bass/evidence/WHATEVER-010/

loop:
  max_attempts: 2
  max_minutes: 60
  stop_when:
    - 지도 범위가 바뀌면 해당 범위의 후보를 갱신하고 동일 범위는 중복 검색하지 않는다.
    - 검색 결과를 가게 ID로 중복 제거한다.
    - 룰렛 실행은 현재 후보를 사용하고 추가 장소 검색을 호출하지 않는다.
    - 최근 선택 가게를 제외하되, 후보가 룰렛 표시 수보다 적으면 오래된 최근 선택부터 복원한다.
    - 영향받은 lint와 production build가 통과한다.
  required_evidence:
    - .bass/evidence/WHATEVER-010/verification-summary.md
---

## Problem

지도 식당 검색은 현재 지도 범위에서 1~3페이지를 가져오지만, 룰렛을 돌릴 때도 같은 범위를 다시 검색한다. 지도 범위 변경 시 후보 갱신 흐름이 없고, 저장된 선택 이력도 후보에서 제외하지 않아 같은 가게가 반복될 수 있다.

## What we are shipping

지도 초기 표시와 범위 변경 후에만 식당 후보를 검색한다. 결과는 장소 ID로 중복 제거하고, 룰렛 실행은 로드된 후보를 사용한다. 최근 최대 5개의 서로 다른 선택 가게는 우선 제외하되, 현재 후보 중 룰렛 표시 한도(최대 24개)에 못 미치면 가장 오래된 최근 선택부터 후보로 복원한다.

## What we are not shipping

음식 종류별 추가 검색, 메뉴·가격 데이터베이스, 지도 제공자 교체, 로그인 및 저장 데이터 스키마 변경은 이 작업에 포함하지 않는다.

## Facts

- map.tsx는 카카오 카테고리 검색의 1~3페이지를 요청하고, 룰렛 실행 시에도 같은 검색 함수를 호출한다.
- roulette.tsx는 한 번의 실행에서 중복 인덱스를 뽑지 않지만 다음 실행에서 최근 선택을 제외하지 않는다.
- Redux 이력에는 룰렛 결과 외에도 사용자가 직접 저장한 가게가 들어갈 수 있다.
- 사용자는 위 세 동작을 지도 서비스 종속성 완화보다 먼저 구현하자고 확인했고, 이번 작업을 develop에서 브랜치로 진행해 다시 develop에 병합하도록 요청했다.

## Decisions

- 카카오 지도와 장소 검색은 유지한다.
- 최근 선택 제외는 마지막 다섯 개의 고유 장소 ID를 기준으로 한다.
- 제외 대상은 이번 지도 화면에서 룰렛으로 뽑은 가게만 추적하고, 넓은 Redux 이력을 사용하지 않는다.
- 제외 후 후보가 24개 미만이면 가장 오래된 최근 선택을 순서대로 복원해 min(24, 전체 후보 수)개를 채운다.
- 사용자가 남은 BASS 게이트까지 모두 해결하라고 명시해, 첫 시도가 30분 기본 한도를 넘긴 뒤 남은 작업을 마칠 수 있도록 이 작업의 한도를 60분으로 연장한다. 기존 기능 범위는 넓히지 않는다.

## Assumptions

## Relevant context

- src/app/random/components/map.tsx
- src/app/components/roulette.tsx
- src/redux/slices/historySlice.ts
- node_modules/react-kakao-maps-sdk/dist/components/Map.d.ts (onIdle)

## Allowed scope

- src/app/random/components/map.tsx
- src/app/components/roulette.tsx
- .bass/tasks/WHATEVER-010.md
- .bass/records/WHATEVER-010.json
- .bass/events.jsonl
- .bass/evidence/WHATEVER-010/

## Forbidden scope

- TODO.md and existing BASS task/evidence records
- Redux persistence and history data model
- Kakao provider settings, search categories, or external API credentials
- Menu/price data collection or any database schema

## Acceptance criteria

- Initial map bounds load candidates once; later map idle events refresh them only when the bounds differ from the last requested bounds.
- If viewport searches overlap, each Kakao place ID appears once in the candidate list.
- Pressing the roulette button does not issue another place search and chooses from the latest loaded candidate list.
- Exclude the last five unique selections. If that leaves fewer than min(24, total candidates), restore the oldest recent selections until the pool reaches that target or all candidates are included.
- The homepage menu roulette continues to work without map candidates.

## Human judgment

The user authorized implementation on a branch from develop and merging the completed change into develop. Final acceptance remains with the user.

## Verification

- yarn lint
- yarn build
- git diff --check
- Review map search callers and confirm the roulette path no longer triggers a search.

## Rollback

Revert the commit on develop; no persistent data or provider configuration changes are introduced.
