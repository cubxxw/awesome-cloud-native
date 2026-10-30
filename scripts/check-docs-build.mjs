import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { lstat, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stripVTControlCharacters } from "node:util";
import { markdownSources, relativeFile } from "./docs-source-inventory.mjs";
import { assertTabContent } from "./docs-tab-content.mjs";

const [dest, buildLog, declaredInventory, declaredSource] = process.argv.slice(2);
assert(dest && buildLog, "Pass the isolated output directory and complete build log");
const output = path.resolve(dest);
const outputInfo = await lstat(output);
assert(outputInfo.isDirectory() && !outputInfo.isSymbolicLink(), "Refuse linked output root");
const realOutput = await realpath(output);
const inventoryPath = declaredInventory || path.join(path.dirname(output), "temp/source-inventory.json");
const sourceDir = declaredSource || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../docs");
const log = stripVTControlCharacters(await readFile(buildLog, "utf8"));
assert(!/^(?:Error|TypeError|ReferenceError|RangeError|SyntaxError)(?:\s+\[[^\]]+\])?:/m.test(log),
  "Every page must render without SSR exceptions even when the CLI exits zero");
const inventory = JSON.parse(await readFile(inventoryPath, "utf8"));
assert(inventory.schemaVersion === 1 && Array.isArray(inventory.pages), "A native page inventory is required");
const sources = await markdownSources(sourceDir), seenSources = new Set(), htmlPages = new Map();
const version = createRequire(import.meta.url)("vuepress/package.json").version;
for (const page of inventory.pages) {
  assert(relativeFile(page.html) && page.html.endsWith(".html"), "Invalid inventory output path");
  assert(!htmlPages.has(page.html), "Duplicate inventory output");
  const filename = path.join(output, page.html), info = await lstat(filename);
  assert(info.isFile() && !info.isSymbolicLink(), "Every native page must have a regular HTML output");
  const relativeOutput = path.relative(realOutput, await realpath(filename));
  assert(relativeFile(relativeOutput), "A linked output parent escaped the isolated directory");
  const html = await readFile(filename, "utf8");
  assert(html.includes(`content="VuePress ${version}"`), "Serve the installed generator, never historical output");
  assert(!html.includes("hm.baidu.com") && !html.includes("clientSecret"), "Do not publish legacy analytics or OAuth configuration");
  assert(!html.includes("code-group-item"), "Do not expose obsolete code group markers");
  htmlPages.set(page.html, html);
  if (page.source !== null) {
    assert(relativeFile(page.source) && sources.has(page.source), "Invalid inventory source path");
    assert(!seenSources.has(page.source), "Duplicate native source");
    assert.equal(page.sourceSHA256, sources.get(page.source), "Source changed after native page preparation");
    seenSources.add(page.source);
    const source = await readFile(path.join(sourceDir, page.source), "utf8");
    const tabGroups = [...source.matchAll(/^:{3,}\s+(?:code-tabs|tabs)(?:[#\s]|$)/gm)].length;
    assert([...html.matchAll(/role="tablist"/g)].length >= tabGroups, "Every source group must keep its rendered tabs");
    assertTabContent(source, html);
  }
}
assert(sources.size > 0 && seenSources.size === sources.size, "Every Markdown source must have a native rendered page");
for (const page of ["index.html", "404.html", "markdown/index.html", "markdown/1.html", "Cloud-Native-k8s/index.html", "Cloud-Native-k8s/1.html"]) {
  assert(htmlPages.has(page), "Keep the existing home, Docker and Kubernetes routes");
}
assert(htmlPages.get("index.html").includes("云原生"), "Keep the Cloud Native home content");
assert(htmlPages.get("markdown/1.html").includes("Docker是什么"), "Keep the existing Docker article");
assert(htmlPages.get("Cloud-Native-k8s/1.html").includes("第1节 云平台"), "Keep the existing Kubernetes article");
assert(htmlPages.get("markdown/1.html").includes("历史评论"), "Expose the explicit unverified comment recovery state");
console.log(`Documentation build output checks passed: ${seenSources.size} sources, ${htmlPages.size} pages`);
