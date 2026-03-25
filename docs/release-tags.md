# Release Tag Mapping

Per-package release tags follow this convention:

- `spec-vX.Y.Z` -> `packages/spec`
- `sdk-ts-vX.Y.Z` -> `packages/sdk-ts`
- `sdk-py-vX.Y.Z` -> `packages/sdk-py`
- `adapter-cursor-vX.Y.Z` -> `adapters/cursor`
- `adapter-claude-code-vX.Y.Z` -> `adapters/claude-code`
- `adapter-gemini-cli-vX.Y.Z` -> `adapters/gemini-cli`
- `adapter-openclaw-vX.Y.Z` -> `adapters/openclaw`
- `adapter-google-antigravity-vX.Y.Z` -> `adapters/google-antigravity`
- `adapter-kilo-code-vX.Y.Z` -> `adapters/kilo-code`
- `adapter-qwen-code-vX.Y.Z` -> `adapters/qwen-code`

## Examples

- `adapter-openclaw-v0.2.0`
- `sdk-ts-v0.3.1`
- `adapter-google-antigravity-v1.0.0`

## Validation rule

Only tags matching one of the prefixes above should trigger package-specific release jobs.
