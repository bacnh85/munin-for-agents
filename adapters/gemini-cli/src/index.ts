import { MuninClient } from "@munin/sdk-ts";

export function createGeminiCliMuninAdapter(config: {
  baseUrl: string;
  apiKey?: string;
  project: string;
  timeoutMs?: number;
}) {
  const client = new MuninClient(config);

  return {
    callTool: async (name: string, args: Record<string, unknown>) =>
      client.invoke(name as any, args, { ensureCapability: true }),
    capabilities: () => client.capabilities(),
  };
}
