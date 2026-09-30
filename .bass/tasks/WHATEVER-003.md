---
id: WHATEVER-003
title: 제품 컨셉과 중장기 방향 기록
status: DONE
type: docs
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
    - PRODUCT.md
    - DESIGN.md
    - TECH.md
    - .bass/tasks/WHATEVER-003.md
    - .bass/records/WHATEVER-003.json
    - .bass/evidence/WHATEVER-003/
    - .bass/events.jsonl

loop:
  max_attempts: 3
  max_minutes: 600
  stop_when:
    - acceptance criteria pass
  required_evidence: []
---

## Problem

PRODUCT.md와 DESIGN.md는 현재 구현을 요약하지만, 사용자가 정한 서비스 컨셉과 중장기 제품 방향은 담고 있지 않다.

## What we are shipping

사용자가 설명한 현재 서비스 가치와 향후 방향을 PRODUCT.md에 기록하고, 웹·모바일·앱에서 일관된 UI 경험을 유지하며 현재 랜딩 기능을 계속 제공한다는 원칙을 DESIGN.md에 기록한다. 지도 종속성 완화와 앱 운영은 TECH.md에 구현 방식을 정하지 않은 장기 고려사항으로 남긴다. 현재 기능과 향후 검토 방향을 구분한다.

## What we are not shipping

앱 기능, UI, 로그인, 지도 제공자 전환, 개인화·모임 기능, 기술 구조, 일정 또는 사업 성과를 결정하거나 구현하지 않는다. 사용자 조사나 검증되지 않은 시장 주장을 추가하지 않는다.

## Facts

- CONFIRMED BY USER: 사용자는 먹을 곳을 정하지 못하는 사람을 위한 식당 랜덤 선택 서비스를 설명했다.
- CONFIRMED BY USER: 사용자는 현재 위치 또는 지정한 장소에서 식당을 무작위로 고르고, 후보를 저장하며, 카카오맵에서 메뉴를 확인하는 현재 경험을 설명했다.
- CONFIRMED BY USER: 사용자는 향후 로그인, 특정 지도에 대한 종속성 완화, 웹과 모바일 앱의 일관된 UI, 개인 취향 기반 선택, 가격대를 반영한 모임 선택을 희망한다.
- CONFIRMED BY USER: 랜딩 페이지 구성이 바뀌어도 현재 랜딩이 가진 기능을 계속 제공하고 싶다고 말했다.
- CONFIRMED IN REPO DOCS: PRODUCT.md에는 메뉴 선택, 식당 검색, 랜덤 선택, 저장과 이력이 기록되어 있다.
- CONFIRMED IN REPO DOCS: DESIGN.md는 현재 반응형 레이아웃을 구현 근거로 기록하고, 사용자 선호로 검증되지는 않았다고 명시한다.

## Decisions

- DECISION: 핵심 가치는 먹을 곳을 정하지 못하는 사람의 식당 선택을 돕는 것이다.
- DECISION: 현재 위치 또는 사용자가 지정한 장소를 기준으로 식당을 무작위로 고르고, 후보 저장과 카카오맵에서 메뉴 확인을 현재 경험으로 설명한다.
- DIRECTION: 로그인, 지도 서비스 종속성 완화, 웹·모바일 앱의 연속된 경험, 개인 선호·비선호, 취향과 가격대를 반영하는 모임 선택은 향후 방향으로만 기록한다.
- DECISION: 랜딩 페이지 구성이 바뀌어도 현재 랜딩이 제공하는 식당 선택 기능은 계속 접근 가능해야 한다.

## Assumptions

없음.

## Relevant context

- PRODUCT.md
- DESIGN.md
- TECH.md
- src/app/page.tsx
- src/app/random/components/map.tsx
- src/app/random/components/ListContent.tsx

## Forbidden scope

- `src/`, `public/`, `styles/`, package.json, yarn.lock
- 로그인, 모바일 앱, 지도 제공자 전환 또는 추상화의 구현
- 제품 방향을 사용자 조사 결과나 검증된 성과로 표현하는 것

## Human judgment

사용자가 이번 대화에서 제시한 핵심 컨셉과 장기 희망 사항을 기록한다. 최종 제품 의미와 향후 우선순위에 대한 승인은 사용자에게 남긴다.

## Allowed scope

- PRODUCT.md
- DESIGN.md
- TECH.md
- .bass/tasks/WHATEVER-003.md
- .bass/records/WHATEVER-003.json
- .bass/evidence/WHATEVER-003/
- .bass/events.jsonl

## Acceptance criteria

- PRODUCT.md에 한 문장 서비스 컨셉, 주요 사용자 문제, 현재 경험, 향후 방향이 반영된다.
- 향후 방향은 확정된 현재 기능이나 일정으로 오해되지 않는다.
- DESIGN.md에 모바일·웹·앱 간 일관된 경험과 랜딩 기능의 지속성을 설계 원칙으로 기록한다.
- TECH.md에 지도 종속성 완화와 앱 운영을 장기 고려사항으로 기록하되 구현 방식을 선택하지 않는다.
- 기존 구현 근거와 사용자가 제시한 제품 방향을 구분하고, 근거 없는 사용자 조사·성과 주장을 추가하지 않는다.
- 앱 코드와 런타임 동작은 변경하지 않는다.

## Verification

- BASS task validation and pre-review gate
- PRODUCT.md, DESIGN.md, TECH.md가 위 범위 및 현재·향후 구분을 일관되게 반영하는지 확인

## Rollback

최종 검토에서 의미가 맞지 않으면 PRODUCT.md, DESIGN.md, TECH.md를 이 작업 전 버전으로 되돌린다. 앱 코드에는 변경이 없다.
