# Munin Ecosystem

Monorepo scaffold for Munin multi-agent ecosystem:

- Protocol spec (`packages/spec`)
- TypeScript SDK (`packages/sdk-ts`)
- Python SDK (`packages/sdk-py`)
- First-class adapters (`adapters/cursor`, `adapters/claude-code`, `adapters/gemini-cli`)
- Generic MCP adapter template (`adapters/generic-mcp-template`)
- Contract test harness (`tests/contract`)
- Release tag mapping (`docs/release-tags.md`)

## Quick commands

```bash
pnpm install
pnpm lint
pnpm build
pnpm test
pnpm test:contract
```

## Contract test

By default contract runner uses:

- `tests/contract/adapter-manifests/local-sdk-ts.json`

Override with custom manifest:

```bash
pnpm test:contract -- tests/contract/adapter-manifests/<manifest>.json
```
