# Munin Adapter for Google Antigravity

Scaffold adapter generated from generic MCP template.

## Usage

```ts
import { createAntigravityMuninAdapter } from "@kalera/munin-antigravity";

const adapter = createAntigravityMuninAdapter({
  apiKey: process.env.MUNIN_API_KEY,
  project: process.env.MUNIN_PROJECT ?? "default-core",
});

await adapter.invokeTool("your-context-core-id", "list", { limit: 10 });
```