#!/usr/bin/env node
import { startMcpServer } from "@kalera/munin-runtime";

async function main() {
  // Check if we are imported as a module or run directly (CJS-safe)
  const isImported =
    typeof import.meta !== "undefined" &&
    import.meta.url !== `file://${process.argv[1]}`;
  if (isImported) return;

  try {
    await startMcpServer();
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exitCode = 1;
  }
}

void main();
