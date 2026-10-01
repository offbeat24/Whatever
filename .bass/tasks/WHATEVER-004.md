---
id: WHATEVER-004
title: 제품 TODO에 공통 컴포넌트 정리 1순위 반영
status: CANCELLED
type: docs
profile: web

risk:
  level: low
  reasons: []

human:
  owner: user
  reviewer_required: true

config:
  changed_surfaces:
    - TODO.md

coordination:
  parent_task: null
  depends_on: []
  owned_paths:
    - TODO.md
    - .bass/tasks/WHATEVER-004.md
    - .bass/records/WHATEVER-004.json
    - .bass/evidence/WHATEVER-004/

loop:
  max_attempts: 2
  stop_when:
    - acceptance criteria pass
  required_evidence: []
---

## Problem

사용자가 설명한 제품 컨셉과 향후 방향을 다음에 진행할 일로 볼 수 있게 정리한 TODO 문서가 없다.

## What we are shipping
현재 기능과 사용자가 말한 향후 희망 사항을 구분한다. 사용자가 선택한 공통 UI 컴포넌트 정리를 첫 번째 TODO로 명시하고, 나머지 작업은 일정과 확정 순서 없이 제안으로 유지한다.

## What we are not shipping

앱 코드나 공통 컴포넌트 구현, 구체적인 컴포넌트 후보·분리 방식 선택, 일정 확정, 또는 사용자가 말하지 않은 기능 추가를 하지 않는다.

## Facts

- CONFIRMED BY USER: 서비스는 먹을 곳을 정하지 못하는 사람에게 현재 위치 또는 지정한 장소의 식당을 무작위로 추천한다.
- CONFIRMED BY USER: 사용자는 후보를 저장하고 카카오맵에서 식당 메뉴를 확인할 수 있다.
- CONFIRMED BY USER: 향후 로그인, 특정 지도 서비스에 대한 종속성 완화, 웹과 모바일 앱의 일관된 경험, 개인의 선호·비선호 메뉴 반영, 취향과 가격대를 반영하는 모임 랜덤 선택을 원한다.
- CONFIRMED BY USER: 랜딩 페이지를 바꾸더라도 현재의 메뉴 선택 기능은 계속 제공하고 싶다고 말했다.
- CONFIRMED IN REPO DOCS: PRODUCT.md는 현재 메뉴 선택, 식당 탐색·랜덤 선택, 저장 기능과 위 미래 방향을 구분해 기록한다.
- CONFIRMED BY USER: 기존 화면의 UI를 공통 컴포넌트로 정리하면 향후 기능의 디자인을 정리하는 데 도움이 되며, 이 작업을 1순위로 두기로 했다.

## Decisions

- DECISION: 공통 UI 컴포넌트 정리를 TODO의 첫 번째이자 현재 유일하게 선택된 우선순위로 표시한다.
- DECISION: 이후 TODO 항목은 제안으로 유지하고, 남은 작업의 순서와 일정은 확정하지 않는다.
- DECISION: 랜딩 페이지가 바뀌어도 메뉴 선택 기능을 유지하는 일을 제품 전반의 제약으로 포함한다.
- DECISION: 로그인과 개인 취향은 그룹 기능보다 앞에 두어 기반과 의존 관계가 읽히게 한다.

## Assumptions

없음.

## Relevant context

- PRODUCT.md
- DESIGN.md
- TECH.md

## Forbidden scope

- 앱 코드, 스타일, 의존성, 지도 제공자 또는 데이터 구조 변경
- 공통 컴포넌트 후보 조사와 실제 컴포넌트 분리·구현
- 사용자가 언급하지 않은 인증 방식, 모임 초대 방식, 일정, 지표 또는 수익 목표 추가
- 남은 항목의 순서를 확정된 일정이나 최종 제품 우선순위로 표현

## Human judgment

TODO.md는 다음 작업을 논의하기 위한 제안 목록이다. 최종 우선순위와 범위에 대한 판단은 사용자에게 남긴다.

## Allowed scope

- TODO.md
- .bass/tasks/WHATEVER-004.md
- .bass/records/WHATEVER-004.json
- .bass/evidence/WHATEVER-004/
- .bass/events.jsonl

## Acceptance criteria

- TODO.md가 이미 동작하는 기능과 향후 작업을 구분한다.
- 첫 번째 TODO가 기존 화면의 UI를 공통 컴포넌트로 정리해 향후 기능의 디자인 일관성을 돕는 작업이다.
- 사용자가 말한 로그인, 지도 종속성 완화, 웹·모바일 경험, 개인 취향, 모임 취향·가격대 기능을 포함한다.
- 메뉴 선택 기능이 랜딩 페이지 변경 이후에도 유지되어야 한다는 조건을 포함한다.
- 나머지 항목의 순서와 일정은 확정하지 않는다.
- 사용자 요청에서 나오지 않은 새 제품 기능을 추가하지 않는다.

## Verification

- BASS task validation and pre-review gate
- TODO.md를 위 범위와 대조해 확인
- git diff --check

## Rollback

TODO.md에서 추가한 우선순위 문구를 되돌린다. 앱 코드에는 변경이 없다.
