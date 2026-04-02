# Munin Claude Code Plugin

## Memory Index Protocol (MANDATORY)

### 1. AT START OF EVERY NEW TASK (NON-NEGOTIABLE)
- Call `munin_search_memories` to scan for any relevant historical data (architecture, past fixes, dependencies).
- **Dependency Check**: Search for the `dependencies` tag to retrieve library versions without re-reading `package.json`.
- Use `munin_retrieve_memory` for full context if matches are found. **DO NOT GUESS** - verify everything from Munin.

### 2. AT END OF EVERY TASK (MANDATORY)
- Proactively summarize: Architectural decisions, new logic, or task outcomes.
- **Decision Versioning**: Explicitly state timelines or versions for major changes. This prevents using obsolete logic.
- **Code Anchoring**: Always include specific file paths and line numbers (e.g., `server/models/Project.ts:L45-50`).
- Use `munin_store_memory` to persist findings and build a robust Knowledge Graph.

### 3. DURING WORK & BUG FIXING
- **Error & Solution Catalog**: When a bug is fixed, immediately store a memory block containing: [Error Description/Stack Trace] + [Root Cause] + [Fixed Code Snippet (Anchoring)]. Use the `error-catalog` tag with relevant subsystem.
- If user provides critical info (preferences, IP, workflow), use `munin_store_memory` to pin it immediately.
- Do not wait for the end of the task for critical information.

### 4. PROJECT TAGGING & DEPENDENCY SYNC
- All memories MUST follow the tag format: `tags: ["category", "subcategory"]`.
- Update the `dependencies` memory block whenever `package.json` changes.

### 5. BEFORE EXECUTING /compact (MANDATORY)
- Ensure all critical context from the current session is stored via `munin_store_memory`.

### 6. MEMORY SEARCH
- Use `munin_search_memories` for semantic/content-based searches.
- Results include GraphRAG Entities and Relationships extracted automatically.

## Skill System

This plugin provides 4 specialized skills that activate automatically based on context:

| Skill | Triggers | Description |
|-------|----------|-------------|
| `munin-memory` | "search memory", "remember", "find in memory" | Full memory operations |
| `munin-architecture` | "architecture", "tech stack", "system design" | Architecture context |
| `munin-error-catalog` | "bug", "error", "crash", "doesn't work" | Error resolution |
| `munin-projectid` | "/munin:projectid", "/projectid" | Set/check MUNIN_PROJECT |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MUNIN_PROJECT` | *(required)* | Your project ID from munin.kalera.app |
| `MUNIN_BASE_URL` | `https://munin.kalera.dev` | Munin API server |
| `MUNIN_API_KEY` | *(from dashboard)* | API key for authentication |

## MCP Server

The plugin runs as an MCP server via `npx @kalera/munin-claude`. The `.mcp.json` reads env vars from your project's `.env` file automatically. Make sure `MUNIN_PROJECT` is set in your `.env` before using MCP tools.

## Plugin Structure

```
munin-claude-code/
├── .claude-plugin/
│   └── plugin.json        # Plugin manifest
├── .mcp.json              # MCP server config
├── hooks/
│   ├── session-start-hook.sh  # Load memories on start
│   ├── stop-hook.sh           # Save session summary on stop
│   ├── post-compact-hook.sh   # Pre-compact memory save
│   └── error-catalog-hook.sh  # Auto-catalog errors
└── skills/
    ├── munin-memory/
    ├── munin-architecture/
    ├── munin-error-catalog/
    └── munin-projectid/
```
