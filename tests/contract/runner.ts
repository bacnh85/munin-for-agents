import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MuninClient } from "../../packages/sdk-ts/src/client";
import { runCoreActionSuite } from "./suites/core-actions";

interface AdapterManifest {
  name: string;
  type: "sdk" | "adapter";
  baseUrl: string;
  project: string;
  apiKey?: string;
  requiredActions: string[];
}

function loadManifest(filePath: string): AdapterManifest {
  const fullPath = resolve(filePath);
  const data = readFileSync(fullPath, "utf-8");
  return JSON.parse(data) as AdapterManifest;
}

function getManifestPaths(inputPath?: string): string[] {
  if (inputPath) {
    return [inputPath];
  }

  const dir = "tests/contract/adapter-manifests";
  return readdirSync(resolve(dir))
    .filter((file) => file.endsWith(".json"))
    .map((file) => `${dir}/${file}`)
    .sort();
}

async function runForManifest(manifestPath: string): Promise<boolean> {
  const manifest = loadManifest(manifestPath);
  const client = new MuninClient({
    baseUrl: manifest.baseUrl,
    project: manifest.project,
    apiKey: manifest.apiKey,
  });

  const suiteResults = await runCoreActionSuite(client);
  const failed = suiteResults.filter((result) => !result.passed);

  console.log(`Contract suite: ${manifest.name} (${manifestPath})`);
  for (const result of suiteResults) {
    console.log(
      `- [${result.passed ? "PASS" : "FAIL"}] ${result.name}${
        result.message ? ` - ${result.message}` : ""
      }`,
    );
  }

  return failed.length === 0;
}

async function main() {
  const inputPath = process.argv[2];
  const manifestPaths = getManifestPaths(inputPath);

  const results = await Promise.all(manifestPaths.map(runForManifest));
  if (results.some((ok) => !ok)) {
    process.exitCode = 1;
  }
}

void main();
