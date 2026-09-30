# Ponytail capability status

- BASS host doctor: Ponytail is installed for Codex, but session activation is unknown and a restart is required before invocation.
- `bass capability claim WHATEVER-003 ponytail:full --host codex --json` was refused with: `Cannot invoke ponytail on codex: ponytail is installed for codex; start a new session and confirm activation before invocation`.
- No `capability.started` event was created, so no completion event or invocation record was fabricated.
- The Ponytail constraints already present in the active conversation instructions were followed during the documentation edit.

## Attempt 3

- The task loop was explicitly extended by one bounded attempt and a 600-minute elapsed-time ceiling; its maximum remains three attempts and eight turns.
- BASS doctor with `BASS_CODEX_ACTIVE_CAPABILITIES=ponytail` confirmed the active session provider.
- BASS claimed and completed `ponytail:full` for attempt 3 with a passing review. See `ponytail-capability-attempt-3.md`.
