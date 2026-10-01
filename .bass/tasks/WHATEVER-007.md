---
id: WHATEVER-007
title: 공통 아이콘 버튼과 장소 인터랙션 구조 정리
status: DONE
type: feature
profile: web

config:
  changed_surfaces:
    - ui/components
    - ui/place-interactions

risk:
  level: medium
  reasons:
    - Shared icon controls and place selection/dialog markup change across the map surface.

# models 는 생략하면 프로파일/프로젝트 설정을 따른다. 필요할 때만 override.
# models:
#   worker: auto

human:
  owner: user
  reviewer_required: true

coordination:
  parent_task: null
  depends_on: []
  owned_paths:
    - DESIGN.md
    - src/app/components/IconButton.tsx
    - src/app/random/components/ListContent.tsx
    - src/app/random/components/map.tsx
    - src/app/random/components/placeModal.tsx
    - .bass/tasks/WHATEVER-007.md
    - .bass/records/WHATEVER-007.json
    - .bass/evidence/WHATEVER-007/
    - .bass/events.jsonl

loop:
  stop_when:
    - acceptance criteria pass
    - required evaluators pass
    - no open high/medium findings
  required_evidence: []
---

<!-- Eligible Fast, low-risk work can keep only Problem, shipping, acceptance, and verification populated. Fill exclusions, context, task-level rollback, and custom loop fields when they affect the task. Implementation tasks need literal Allowed scope paths; read-only exploration can omit them. -->

## Problem
반복되는 아이콘 동작 버튼이 화면별로 직접 작성되어 접근성 이름과 이미지 의미 처리 방식이 흩어져 있다. 장소 목록과 모달은 버튼 안에 링크나 버튼을 중첩해 인터랙션 구조도 잘못되어 있다.

## What we are shipping
기존 시각 스타일을 유지하는 작은 `IconButton`을 만들고 장소 목록 및 지도 제어의 반복 아이콘 버튼에 적용한다. 목록 카드의 선택 동작과 별도 링크·저장·삭제 동작을 서로 형제 요소로 분리하고, 장소 상세는 기본 HTML `<dialog>`의 모달 동작을 사용하도록 정리한다.

## What we are not shipping
색상·타이포그래피·간격·아이콘·레이아웃 재설계, 홈 헤더 변경, Redux/지도 데이터 흐름 변경, 새 UI 프레임워크나 의존성 추가는 포함하지 않는다.

## Facts
- `ListContent`는 검색·북마크·기록에서 이미 공유된다.
- 목록 카드 내부에 외부 링크와 추가 버튼이 중첩되어 있다.
- `PlaceModal`의 배경/콘텐츠가 각각 버튼으로 구성되어 내부 액션 버튼과 중첩된다.
- Tailwind 색상·폰트·반응형 토큰과 현재 화면의 시각 스타일을 유지한다.

## Decisions
- 아이콘 버튼은 `aria-label`로 이름을 제공하고, 장식용 이미지는 빈 `alt`를 사용한다. 버튼 기본 type은 `button`이며 검색 제출 버튼만 `submit`을 사용한다.
- 장소 선택, 외부 지도 열기, 저장/삭제, 배경 클릭 닫기, Escape 닫기 동작을 보존한다.
- `ListContent` 자체와 고유한 라벨/캡션 버튼은 별도 컴포넌트로 쪼개지 않는다.

## Assumptions
보이는 스타일 변경은 요청되지 않았다. 접근성 포커스 표시는 브라우저 기본 동작을 유지한다.

## Relevant context
- DESIGN.md
- src/app/components/roulette.tsx
- src/app/random/components/ListContent.tsx
- src/app/random/components/map.tsx
- src/app/random/components/placeModal.tsx

## Allowed scope
- DESIGN.md
- src/app/components/IconButton.tsx
- src/app/random/components/ListContent.tsx
- src/app/random/components/map.tsx
- src/app/random/components/placeModal.tsx
- .bass/tasks/WHATEVER-007.md
- .bass/records/WHATEVER-007.json
- .bass/evidence/WHATEVER-007/
- .bass/events.jsonl

## Forbidden scope
- 홈 화면/헤더, 전역 스타일이나 Tailwind 토큰, Redux·지도 API·데이터 처리, 다른 라우트, 의존성, 디자인 재작업.

## Acceptance criteria
- 재사용 `IconButton`이 목록 아이콘 동작과 지도 제어 버튼에서 사용되며, 각 버튼은 의미 있는 접근성 이름을 가진다.
- 장소 목록 카드, 외부 링크, 저장/삭제 버튼 사이에 인터랙티브 요소 중첩이 없다.
- 상세 UI가 네이티브 `<dialog>`로 열리며 배경 클릭과 Escape로 닫힌다. 모달 내부 액션은 모달을 닫지 않는다.
- 기존 메뉴 선택, 지도 컨트롤, 외부 지도 열기, 저장/삭제 동작과 반응형 배치가 유지된다.
- 색상, 크기, 간격, 아이콘 등 기존 시각 스타일에 의도된 변경이 없다.

## Human judgment
사람이 기존 화면의 시각 일관성과 목록·모달 인터랙션을 최종 검토한다.

## Verification
`bass task validate WHATEVER-007`, `bass gate pre-task WHATEVER-007`, `yarn lint`, `yarn build`, 데스크톱·모바일 브라우저에서 목록/모달 동작 확인, `git diff --check`, `bass gate pre-review WHATEVER-007`.

## Rollback
새 `IconButton`과 해당 사용처의 마크업을 원복한다. 데이터 마이그레이션은 없다.
