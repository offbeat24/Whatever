# WHATEVER-010 verification

## Change

- `map.tsx` fetches places once for each distinct visible map bounds, refreshes on map idle only when the bounds differ, ignores stale responses, and deduplicates by Kakao place ID.
- `roulette.tsx` selects from the loaded candidate list without a search request. The map screen excludes its last five distinct roulette results and restores the oldest recent results when fewer than 24 candidates remain. The homepage text roulette call site remains unchanged.

## Checks

- Final `yarn lint`: pass; no ESLint warnings or errors. An earlier simplification attempt removed the function default props and failed `react/require-default-props`; the defaults were restored before the passing run.
- Final `yarn build`: pass; static pages generated, including `/random`.
- `git diff --check`: pass.
- Call-site review: the `/random` map fetches from map creation and map idle; the roulette click handler has no search callback. The homepage continues to pass text candidates.
- Browser render: `/random` loaded in the BSK Agent Window with the Kakao map, roulette, and map controls rendered. Viewport was 717×484 CSS pixels (1434×968 screenshot pixels at 2×). Evidence: `before-viewport.png`, `after-viewport.png` and their screenshot metadata.
- Console comparison: three error signatures before and after, with identical per-error SHA-256 signatures: `ce01ae4f3f22af2111d16d50ee65745291705e926f1f969ea31bc46db1acae64`, `f6e9f0764beecce8509334dedb626fe5ff1c341244f87e553106a435889ac146`, `64c3117fe897e1d0060c724e5715f770bc3476a9d502fa6241769ca7d5664781`. They include browser-extension errors and the existing Next.js hydration warning; no new signature appeared. Raw evidence: `console-before.json` and `console-after.json`.
- No automated tests were added or run. The roulette action and map movement were not manually exercised in the browser.

## BASS capability

- BASS doctor initially reported Ponytail installed but session unknown. The documented `BASS_CODEX_ACTIVE_CAPABILITIES=ponytail` host signal confirmed the active instruction in this session; the project and global configuration were unchanged.
- `ponytail:full` was claimed and completed for attempt 1 and re-claimed for the final execution-plan fingerprint in attempt 2. See `ponytail-review.md`.

## Environment cleanup

- Next.js rewrote `tsconfig.json` during lint, build, and dev-server startup. It was restored to the branch baseline; it is not part of this change.
