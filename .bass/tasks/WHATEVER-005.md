---
id: WHATEVER-005
title: 공통 UI 컴포넌트 정리를 TODO 1순위로 반영
status: CANCELLED
type: docs
profile: web

risk:
  level: low
  reasons: []

config:
  changed_surfaces:
    - TODO.md

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
    - TODO.md
    - .bass/tasks/WHATEVER-005.md
    - .bass/records/WHATEVER-005.json
    - .bass/evidence/WHATEVER-005/
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
TODO.md에는 제안 방향은 있지만, 사용자가 먼저 진행하기로 한 작업이 1순위로 표시되어 있지 않다.

## What we are shipping
기존 화면의 반복 UI를 공통 컴포넌트로 정리하는 일을 첫 번째 TODO로 추가하고, 이후 기능의 디자인 일관성을 위한 준비라는 목적을 기록한다. 나머지 작업의 순서와 일정은 미정으로 둔다.

## What we are not shipping
컴포넌트 조사나 코드 분리, 디자인 변경, 구현 방식 선택은 이번 작업에 포함하지 않는다.

## Facts
- CONFIRMED BY USER: 현재 컴포넌트에서 공통 UI를 분리하면 추가 기능의 디자인을 정리하는 데 도움이 될 것이며, 이를 1순위로 두기로 했다.

## Decisions
- DECISION: 공통 UI 컴포넌트 정리를 TODO의 유일하게 확정된 우선순위 1번으로 추가한다.
- DECISION: 나머지 항목은 제안으로 유지하고 우선순위와 일정은 확정하지 않는다.

## Assumptions
공통 컴포넌트 후보와 분리 범위는 아직 정하지 않았다.

## Relevant context
- TODO.md

## Allowed scope
- TODO.md
- .bass/tasks/WHATEVER-005.md
- .bass/records/WHATEVER-005.json
- .bass/evidence/WHATEVER-005/
- .bass/events.jsonl

## Forbidden scope
- 앱 코드, 컴포넌트, 스타일, 의존성 또는 기술 구조 변경

## Acceptance criteria
- TODO.md의 첫 TODO가 기존 UI에서 공통 컴포넌트를 정리하는 작업이다.
- 항목에는 추가 기능의 디자인 일관성에 도움이 된다는 목적이 담겨 있다.
- 나머지 우선순위와 일정이 확정된 것처럼 표현되지 않는다.

## Human judgment
공통으로 추출할 컴포넌트와 실제 리팩터링 범위는 후속 작업에서 결정한다.

## Verification
`bass task validate WHATEVER-005`, `bass gate pre-task WHATEVER-005`, `bass gate pre-review WHATEVER-005`, `git diff --check`, TODO 범위 검토

## Rollback
TODO.md에서 새 항목과 이에 따른 우선순위 표현만 되돌린다.
