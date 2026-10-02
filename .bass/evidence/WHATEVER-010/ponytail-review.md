# Ponytail full capability invocation

- BASS doctor initially could not infer the active Codex session. The BASS configuration documentation supports `BASS_CODEX_ACTIVE_CAPABILITIES` when discovery cannot expose session state. The current task instructions include Ponytail, so the host-specific signal was supplied only to the doctor and capability commands; no project or global configuration was changed.
- `doctor --capabilities --host codex` then reported `simplicity=ponytail`, `session=active`.
- BASS claimed `ponytail:full` for attempt 1 with call ID `cfc62e40065ef9d8136dec63638797ddc6536b7280f0cf42233307fedbfd7a7a` and for the final plan-bound attempt 2 with call ID `f55e8399b56ead1cb3ad2e6ab264b73edf3892fdbfdcd9e199b5393a474c7bb5`.
- Review simplified `new globalThis.Map` to `new Map` after the Kakao component was aliased as `KakaoMap`.
- An attempt to remove function-component `defaultProps` was rejected by `react/require-default-props`; the defaults were restored. The final implementation adds no abstraction or dependency.
- Re-reviewed both changed components against the active Ponytail full rules: the two-file change is limited to the map fetch lifecycle and roulette candidate selection; no additional helper, dependency, or abstraction reduced the implementation without obscuring its state flow.
- Final `yarn lint` and `yarn build` passed.
