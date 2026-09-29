# Product design identity

<!--
  이 문서는 디자인 의도의 단일 명세다 (Single Source of Truth of intent).
  - 세부 값(정확한 색상 코드 전체 목록 등)은 design-tokens 파일에, 여기는 의미와 사용 원칙.
  - 모든 섹션을 기계적으로 채우지 마라. 이 프로젝트에 필요한 항목만 유지하고 나머지는 삭제하라.
  - 기존 프로젝트라면 먼저 코드를 조사해 CONFIRMED / INCONSISTENT / MISSING / PROPOSED 로
    분류한 뒤 작성한다. 가장 많이 쓰인 값을 자동으로 진실로 결정하지 마라.
-->

## Purpose

- CONFIRMED from the current UI: make choosing a meal quick through a menu roulette and restaurant map.

## Design principles

- Keep the meal choice and restaurant discovery as the two visible entry points.
- Preserve the responsive layouts already defined in the application.
- Treat current visual choices as implementation evidence, not as validated user preferences.

## Personas

- MISSING: no user research or persona source is present.

## Color palette

- CONFIRMED tokens in tailwind.config.ts: orange #F58700, #FF9700, #FFAB40; black #141414; gray #C6C6C6; snow #FFFFFF; white #FAFAFA.
- No role-based palette specification is documented.

## Typography

- CONFIRMED: PretendardVariable is bundled locally and used by the app.

## Layout and responsiveness

- CONFIRMED Tailwind breakpoints: mobile 320px, tablet 744px, tablet-l 1024px, laptop 1280px.

## Interaction states

- The menu roulette uses Framer Motion transitions.
- The map flow includes search, bookmark, history, and random-selection controls.
- Focus behavior and complete keyboard testing are not documented.

## Voice and microcopy

- Current UI copy is Korean and conversational. Preserve existing meaning when editing.

## Accessibility

- MISSING: no accessibility review or conformance target is documented.

## Do

- Check the affected responsive layouts when a task changes visible UI.

## Do not

- Do not infer user preferences or accessibility compliance from implementation alone.

## References

- CONFIRMED from source: src/app/page.tsx, src/app/random/components, tailwind.config.ts, styles/globals.css.

## Decisions and history

- 2026-09-29: recorded current UI evidence; no new visual direction was selected.
