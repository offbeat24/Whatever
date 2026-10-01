---
id: WHATEVER-006
title: 공통 UI 컴포넌트 정리를 TODO 1순위로 반영
status: DONE
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
    - .bass/tasks/WHATEVER-006.md
    - .bass/records/WHATEVER-006.json
    - .bass/evidence/WHATEVER-006/

loop:
  stop_when:
    - acceptance criteria pass
    - required evaluators pass
    - no open high/medium findings
  required_evidence: []
---

<!-- Eligible Fast, low-risk work can keep only Problem, shipping, acceptance, and verification populated. Fill exclusions, context, task-level rollback, and custom loop fields when they affect the task. Implementation tasks need literal Allowed scope paths; read-only exploration can omit them. -->

## Problem
TODO.md에 제안된 작업은 있으나, 사용자가 먼저 진행하기로 한 공통 UI 컴포넌트 정리가 첫 번째로 표시되어 있지 않다.

## What we are shipping
현재 화면의 반복 UI를 공통 컴포넌트로 정리하는 일을 TODO의 1순위로 추가하고, 이후 기능의 디자인 일관성에 도움이 된다는 목적을 적는다. 다른 TODO의 우선순위와 일정은 미정으로 둔다.

## What we are not shipping
컴포넌트 조사나 코드 분리, 디자인 변경, 구현 방식 선택은 이번 작업에 포함하지 않는다.

## Facts
- CONFIRMED BY USER: 기존 화면의 UI에서 공통 컴포넌트를 분리하면 추가 기능의 디자인을 정리하는 데 도움이 될 것이며, 이 작업을 1순위로 두기로 했다.

## Decisions
- DECISION: 공통 UI 컴포넌트 정리를 TODO의 첫 번째이자 현재 유일하게 선택된 우선순위로 표시한다.
- DECISION: 나머지 항목은 제안으로 유지하고 순서와 일정은 확정하지 않는다.

## Assumptions
공통 컴포넌트 후보와 실제 분리 범위는 아직 정하지 않았다.

## Relevant context
- TODO.md

## Allowed scope
- TODO.md
- .bass/tasks/WHATEVER-004.md
- .bass/tasks/WHATEVER-005.md
- .bass/tasks/WHATEVER-006.md
- .bass/records/WHATEVER-006.json
- .bass/evidence/WHATEVER-006/
- .bass/events.jsonl

## Forbidden scope
- 앱 코드, 공통 컴포넌트, 스타일, 의존성 또는 기술 구조 변경

## Acceptance criteria
- TODO.md의 첫 TODO가 기존 화면의 공통 UI 컴포넌트 정리다.
- 그 목적에 추가 기능의 디자인 일관성 지원이 포함된다.
- 나머지 항목은 확정된 순서나 일정처럼 표현되지 않는다.

## Human judgment
공통으로 분리할 컴포넌트와 리팩터링 범위는 후속 작업에서 결정한다.

## Verification
`bass task validate WHATEVER-006`, `bass gate pre-task WHATEVER-006`, `bass gate pre-review WHATEVER-006`, `git diff --check`, TODO 범위 검토

## Rollback
TODO.md에서 추가한 1순위 문구만 되돌린다.
