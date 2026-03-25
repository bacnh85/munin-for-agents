import { createServer } from "node:http";

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/mcp/capabilities") {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: true,
        data: {
          specVersion: "v1.0.0",
          actions: {
            core: ["store", "retrieve", "search", "list", "recent"],
            optional: ["share", "versions", "rollback", "encrypt", "decrypt"],
          },
          features: {
            semanticSearch: { supported: true },
            encryption: { supported: true },
          },
          metadata: {
            serverVersion: "mock-1.0.0",
            timestamp: new Date().toISOString(),
          },
        },
      }),
    );
    return;
  }

  if (req.method === "POST" && req.url === "/api/mcp/action") {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      const parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: true,
          data: {
            action: parsed.action,
            project: parsed.project,
            payload: parsed.payload,
            source: "mock-server",
          },
        }),
      );
    });
    return;
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ok: false, error: { code: "NOT_FOUND", message: "Not found" } }));
});

server.listen(4010, "127.0.0.1", () => {
  console.log("Munin contract mock server listening on http://127.0.0.1:4010");
});
