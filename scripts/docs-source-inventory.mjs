import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export function relativeFile(name) {
  return typeof name === "string" && name.length > 0 && !path.posix.isAbsolute(name)
    && !name.includes("\\") && !name.includes("\0") && !name.split("/").includes("..");
}

export async function markdownSources(sourceDir) {
  const files = new Map();
  async function visit(relative = "") {
    for (const entry of await readdir(path.join(sourceDir, relative), { withFileTypes: true })) {
      if (entry.name === ".vuepress" || entry.name === "node_modules") continue;
      const name = path.posix.join(relative, entry.name);
      assert(!entry.isSymbolicLink(), `Refuse linked documentation source: ${name}`);
      if (entry.isDirectory()) await visit(name);
      else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.set(name, createHash("sha256").update(await readFile(path.join(sourceDir, name))).digest("hex"));
      }
    }
  }
  await visit();
  return files;
}

export async function writeSourceInventory({ sourceDir, filename, pages }) {
  const sources = await markdownSources(sourceDir);
  const seenSources = new Set(), seenOutputs = new Set();
  const records = pages.map(page => {
    const source = page.filePathRelative || null, html = page.htmlFilePathRelative;
    assert(relativeFile(html) && html.endsWith(".html"), "Invalid native page output");
    assert(!seenOutputs.has(html), `Duplicate native output: ${html}`);
    seenOutputs.add(html);
    if (source !== null) {
      assert(relativeFile(source) && sources.has(source), `Unknown native source: ${source}`);
      assert(!seenSources.has(source), `Duplicate native source: ${source}`);
      seenSources.add(source);
    }
    return { source, html, ...(source ? { sourceSHA256: sources.get(source) } : {}) };
  });
  assert(sources.size > 0 && seenSources.size === sources.size, "Every Markdown source must become a native page");
  const inventory = { schemaVersion: 1, pages: records };
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, JSON.stringify(inventory, null, 2) + "\n");
  return inventory;
}

export function docsInventoryPlugin() {
  return {
    name: "cloud-native-source-inventory",
    async onPrepared(app) {
      if (process.env.CLOUD_NATIVE_VERIFIED_DOCS !== "1") return;
      await writeSourceInventory({ sourceDir: app.dir.source(), pages: app.pages,
        filename: app.dir.temp("source-inventory.json") });
    },
  };
}
