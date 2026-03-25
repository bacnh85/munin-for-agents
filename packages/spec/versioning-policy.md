# Munin Spec Versioning Policy

Spec uses semantic versioning with `vMAJOR.MINOR.PATCH`.

## Rules

- **MAJOR**: Breaking protocol changes.
- **MINOR**: Backward-compatible additions (new optional actions, fields).
- **PATCH**: Clarifications, typo fixes, non-breaking metadata updates.

## Compatibility

- Adapters MUST declare the spec version they target.
- Servers SHOULD expose current `specVersion` via capabilities.
- Adapters SHOULD fail fast on incompatible major versions.
- Optional feature absence must degrade gracefully.

## Deprecation

- Mark deprecated fields/actions in MINOR release.
- Keep deprecated behavior for at least 2 MINOR releases.
- Remove only in next MAJOR.
