import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFile, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

const html = '<meta name="generator" content="VuePress 2.0.0-rc.30">云原生 Docker是什么 第1节 云平台 /markdown/ /Cloud-Native-k8s/ 历史评论 <div role="tablist">ubuntu centos</div>';
const sources = [
  ["README.md", "index.html"],
  ["markdown/README.md", "markdown/index.html"],
  ["markdown/1.md", "markdown/1.html"],
  ["Cloud-Native-k8s/README.md", "Cloud-Native-k8s/index.html"],
  ["Cloud-Native-k8s/1.md", "Cloud-Native-k8s/1.html"],
];

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "cloud-native-output-gate-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "scripts"));
  await copyFile(new URL("./check-docs-build.mjs", import.meta.url), path.join(root, "scripts/check-docs-build.mjs"));
  await copyFile(new URL("./docs-source-inventory.mjs", import.meta.url), path.join(root, "scripts/docs-source-inventory.mjs"));
  await copyFile(new URL("./docs-tab-content.mjs", import.meta.url), path.join(root, "scripts/docs-tab-content.mjs"));
  await mkdir(path.join(root, "node_modules/vuepress"), { recursive: true });
  await writeFile(path.join(root, "node_modules/vuepress/package.json"), '{"version":"2.0.0-rc.30"}');
  const pages = [{ source: null, html: "404.html" }];
  for (const [source, output] of sources) {
    const content = `# ${source}\n`;
    await mkdir(path.dirname(path.join(root, "docs", source)), { recursive: true });
    await writeFile(path.join(root, "docs", source), content);
    pages.push({ source, html: output, sourceSHA256: createHash("sha256").update(content).digest("hex") });
  }
  for (const page of pages) {
    await mkdir(path.dirname(path.join(root, "dist", page.html)), { recursive: true });
    await writeFile(path.join(root, "dist", page.html), html);
  }
  // Unrelated old sentinels must never substitute for this project's page coverage.
  for (const name of ["Gomd_super/index.html", "go-advancend/index.html"]) {
    await mkdir(path.dirname(path.join(root, "dist", name)), { recursive: true });
    await writeFile(path.join(root, "dist", name), 'Golang /Gomd_super/ 第21节 go 语言切片原理 第50节');
  }
  const previousMarkers = 'Golang /Gomd_super/ <input type="checkbox">';
  await writeFile(path.join(root, "dist/index.html"), html + previousMarkers);
  await writeFile(path.join(root, "build.log"), "fixture rendered\n");
  await writeFile(path.join(root, "pages.json"), JSON.stringify({ schemaVersion: 1, pages }));
  return { root, pages };
}

function check(root) {
  return spawnSync(process.execPath, [path.join(root, "scripts/check-docs-build.mjs"),
    path.join(root, "dist"), path.join(root, "build.log"), path.join(root, "pages.json"),
    path.join(root, "docs")], { cwd: root, encoding: "utf8" });
}

async function tabFixture(t, { secondFence = true, note = true, image = true } = {}) {
  const { root, pages } = await fixture(t);
  const source = "::: code-tabs\n@tab First\n```sh\nstep-one --flag <value>\n```\nKeep the **original** `note`.\n```sh\nstep-two --keep\n```\n![diagram](https://example.invalid/diagram.png)\n:::\n";
  await writeFile(path.join(root, "docs/markdown/1.md"), source);
  pages.find(page => page.source === "markdown/1.md").sourceSHA256 = createHash("sha256").update(source).digest("hex");
  await writeFile(path.join(root, "pages.json"), JSON.stringify({ schemaVersion: 1, pages }));
  await writeFile(path.join(root, "dist/markdown/1.html"), html
    + '<pre><code>step-one --flag &lt;value&gt;</code></pre>'
    + (secondFence ? '<pre><code><span>step-two</span> --keep</code></pre>' : '')
    + (note ? '<p>Keep the <strong>original</strong> <code>note</code>.</p>' : '')
    + (image ? '<img src="https://example.invalid/diagram.png" alt="diagram">' : ''));
  return root;
}

test("all native source pages and current project content are accepted", async t => {
  const { root } = await fixture(t);
  const result = check(root);
  assert.equal(result.status, 0, result.stderr);
});

test("an omitted Kubernetes HTML page is rejected even with old Go sentinels", async t => {
  const { root } = await fixture(t);
  await rm(path.join(root, "dist/Cloud-Native-k8s/1.html"));
  assert.notEqual(check(root).status, 0);
});

test("a source file omitted from native page inventory is rejected", async t => {
  const { root, pages } = await fixture(t);
  await writeFile(path.join(root, "pages.json"), JSON.stringify({ schemaVersion: 1,
    pages: pages.filter(page => page.source !== "Cloud-Native-k8s/1.md") }));
  assert.notEqual(check(root).status, 0);
});

test("source changes after page preparation reject the output", async t => {
  const { root } = await fixture(t);
  await writeFile(path.join(root, "docs/markdown/1.md"), "# changed during build\n");
  assert.notEqual(check(root).status, 0);
});

test("inventory paths cannot make the gate read outside its source and output", async t => {
  const { root, pages } = await fixture(t);
  pages[1].source = "../private.md";
  await writeFile(path.join(root, "pages.json"), JSON.stringify({ schemaVersion: 1, pages }));
  assert.notEqual(check(root).status, 0);
});

test("old project output cannot satisfy Cloud Native content acceptance", async t => {
  const { root } = await fixture(t);
  await writeFile(path.join(root, "dist/index.html"), '<meta name="generator" content="VuePress 2.0.0-rc.30">Golang /Gomd_super/ <input type="checkbox">');
  assert.notEqual(check(root).status, 0);
});

test("linked HTML parent directories cannot escape the isolated output", async t => {
  const { root } = await fixture(t);
  const outside = path.join(root, "outside");
  await mkdir(outside);
  await writeFile(path.join(outside, "1.html"), html);
  await writeFile(path.join(outside, "index.html"), html);
  await rm(path.join(root, "dist/Cloud-Native-k8s"), { recursive: true });
  await symlink(outside, path.join(root, "dist/Cloud-Native-k8s"), "dir");
  assert.notEqual(check(root).status, 0);
});

test("tab labels cannot substitute for a second fenced instruction", async t => {
  assert.notEqual(check(await tabFixture(t, { secondFence: false })).status, 0);
});

test("tab labels cannot substitute for the original explanatory text", async t => {
  assert.notEqual(check(await tabFixture(t, { note: false })).status, 0);
});

test("tab labels cannot substitute for a source image", async t => {
  assert.notEqual(check(await tabFixture(t, { image: false })).status, 0);
});

test("complete tab content remains accepted after HTML highlighting and escaping", async t => {
  const result = check(await tabFixture(t));
  assert.equal(result.status, 0, result.stderr);
});
