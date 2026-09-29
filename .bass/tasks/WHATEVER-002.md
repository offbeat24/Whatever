---
id: WHATEVER-002
title: Dependabot 보안 취약점 수정
status: NEEDS_DECISION
type: bug
profile: web

risk:
  level: medium
  reasons:
    - Next.js 14에서 15로, React 18에서 19로 올려 앱 라우터 호환성을 확인해야 한다.

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
    - package.json
    - yarn.lock
    - .bass/tasks/WHATEVER-002.md
    - .bass/records/WHATEVER-002.json
    - .bass/evidence/WHATEVER-002/
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

GitHub Dependabot이 `main`의 `yarn.lock`에서 열린 취약점 82개를 보고한다. 취약한 직접 의존성은 Next.js 14.1.0이며, 나머지는 Next.js 및 개발 도구의 전이 의존성이다.

## What we are shipping

보안 권고가 제시한 패치 버전으로 `package.json`과 `yarn.lock`을 갱신한다. GitHub가 Next.js 15.5.24 이상으로 34개, tar 7.5.21 이상으로 12개 알림을 해결한다고 안내한다. 남은 알림도 권고된 안전 버전으로 갱신하고, App Router 실행에 맞춰 React 및 타입 패키지를 함께 올린다.

## What we are not shipping

앱 기능·UI·상태 구조 변경, 취약점 알림 dismiss, 보안 패치와 무관한 직접 의존성 업그레이드, Next.js 16 마이그레이션. React 19 전환에 필요한 `roulette.tsx`의 타입 전용 수정 외에는 앱 코드를 바꾸지 않는다.

## Facts

- CONFIRMED: `main`의 열린 Dependabot 알림은 82개이며 모두 `yarn.lock`에 연결된다.
- CONFIRMED: Next.js 15.5.24 이상이 Next.js 알림 34개를 해결하고, tar 7.5.21 이상이 tar 알림 12개를 해결한다고 GitHub 알림 상세가 안내한다.
- CONFIRMED: 현재 `package.json`은 `next`와 `eslint-config-next`를 14.1.0으로 고정하고 React와 React DOM을 18 범위로 사용한다.
- CONFIRMED: 앱은 App Router를 사용하며 `cookies()`, `headers()`, `draftMode()`, 동적 `params`/`searchParams`의 동기 접근 사용은 검색 결과에서 발견되지 않았다.
- CONFIRMED: Next.js 15 업그레이드 안내는 App Router의 React 19 최소 버전을 명시하고, Pages Router에 한해 React 18 호환성을 유지한다고 안내한다.
- CONFIRMED: 첫 Next.js 15 빌드는 `src/app/components/roulette.tsx`의 반환 타입 `JSX.Element`가 React 19에서 더는 전역 타입으로 제공되지 않아 타입 검사에 실패했다.
- CONFIRMED: 갱신된 잠금 파일의 취약 패키지 해상 버전은 GitHub 권고 기준을 만족하며, 패키지별 대조표는 `.bass/evidence/WHATEVER-002/resolved-lock-versions.md`에 기록했다.
- CONFIRMED: `yarn install --immutable`와 Next.js 15.5.24 `yarn build`가 통과했다. 빌드에는 lint 및 TypeScript 검사도 포함된다.
- OBSERVED: Yarn은 `eslint-config-airbnb`의 네 플러그인 peer dependency 경고를 출력했으나, lint와 build는 통과했다.
- CONFIRMED: `main`의 Dependabot 알림 82개는 2026-09-29 확인 기준이며, 브랜치 병합 뒤 GitHub 재검사가 아직 필요하다.

## Decisions

- DECISION: 앱이 사용하는 App Router에 맞춰 Next.js 15.5.24와 React 19를 사용한다.
- DECISION: `eslint-config-next`를 Next.js와 같은 15.5.24 버전으로 맞춘다.
- DECISION: 취약 패키지는 기존 전이 의존성 범위 안에서만 갱신한다. 취약한 버전이 고정 범위에 남는 경우에만 필요한 최소 override를 추가한다.
- DECISION: React 19 타입 호환성을 위해 `roulette.tsx`의 반환 타입에 `React.JSX.Element`를 사용하고, Framer Motion variant의 반환 타입을 `Target`으로 맞춘다. 런타임 동작은 바꾸지 않는다.
- DECISION: 알림은 dismiss하지 않고 잠금 파일을 패치해 해결한다.

## Assumptions

- 없음. GitHub의 패치 권고와 Yarn 레지스트리 업데이트 가능 여부를 확인했다.

## Relevant context

- `package.json`
- `yarn.lock`
- `.yarnrc.yml`
- `src/app/layout.tsx`
- `src/app/random/page.tsx`
- `src/app/components/roulette.tsx`
- `AGENTS.md`

## Allowed scope

- `package.json`
- `yarn.lock`
- `src/app/components/roulette.tsx`
- `.bass/tasks/WHATEVER-002.md`
- `.bass/records/WHATEVER-002.json`
- `.bass/evidence/WHATEVER-002/`
- `.bass/events.jsonl`

## Forbidden scope

- `src/app/components/roulette.tsx` 외 `src/`, `public/`, `styles/` 변경
- BASS 설정 또는 기존 `WHATEVER-001` 기록
- Dependabot 알림 dismiss 또는 무관한 잠금 파일 정리

## Acceptance criteria

- Next.js/React/App Router 조합이 설치되고 lint/build가 통과한다.
- React 19에서 반환 JSX 타입이 올바르게 해석되며 앱 런타임 동작은 바뀌지 않는다.
- GitHub에서 식별한 82개 알림 각각의 취약한 잠금 버전이 권고된 패치 버전 이상으로 해소된다.
- `package.json`과 `yarn.lock`이 일치하고 다른 앱 파일은 변경되지 않는다.
- 변경을 기본 브랜치에 병합한 뒤 GitHub Dependabot 재검사에서 열린 알림이 0개다.

## Human judgment

병합 전 Next.js 15 및 React 19 전환이 승인되어야 한다. 자동 검증만으로 런타임 동작이나 GitHub 경보 해소를 대신 승인하지 않는다.

## Verification

- BASS 작업 검증과 pre-review gate
- Yarn immutable install
- `yarn build` (lint와 TypeScript 검사 포함)
- 보안 권고별 해결 버전과 최종 `yarn.lock` 대조
- BASS pre-review gate 및 작업 기록
- `.bass/evidence/WHATEVER-002/`의 전체 검사 로그와 패치 버전 대조표

## Rollback

보안 브랜치의 패키지 변경 커밋을 되돌리고 이전 `package.json`과 `yarn.lock`으로 복구한다.
