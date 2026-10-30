import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { markdownSources, writeSourceInventory } from "./docs-source-inventory.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "cloud-native-source-inventory-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const sourceDir = path.join(root, "docs"), filename = path.join(root, "temp/source-inventory.json");
  await mkdir(path.join(sourceDir, "section"), { recursive: true });
  await mkdir(path.join(sourceDir, ".vuepress"));
  await writeFile(path.join(sourceDir, "README.md"), "# Home\n");
  await writeFile(path.join(sourceDir, "section/a b.md"), "# Article\n");
  await writeFile(path.join(sourceDir, ".vuepress/not-a-page.md"), "internal\n");
  const pages = [
    { filePathRelative: "README.md", htmlFilePathRelative: "index.html" },
    { filePathRelative: "section/a b.md", htmlFilePathRelative: "section/a b.html" },
    { filePathRelative: null, htmlFilePathRelative: "404.html" },
  ];
  return { root, sourceDir, filename, pages };
}

test("native route names and exact source bytes are preserved in the inventory", async t => {
  const args = await fixture(t);
  await writeSourceInventory(args);
  const inventory = JSON.parse(await readFile(args.filename, "utf8"));
  assert.deepEqual(inventory.pages.map(page => [page.source, page.html]), [
    ["README.md", "index.html"], ["section/a b.md", "section/a b.html"], [null, "404.html"],
  ]);
  assert.equal(inventory.pages[1].sourceSHA256, createHash("sha256").update("# Article\n").digest("hex"));
  assert.equal((await markdownSources(args.sourceDir)).size, 2);
});

test("a source excluded by the native renderer cannot disappear silently", async t => {
  const args = await fixture(t);
  args.pages.splice(1, 1);
  await assert.rejects(writeSourceInventory(args), /Every Markdown source/);
  await assert.rejects(readFile(args.filename), { code: "ENOENT" });
});

test("duplicate output routes reject the inventory before publishing it", async t => {
  const args = await fixture(t);
  args.pages[1].htmlFilePathRelative = "index.html";
  await assert.rejects(writeSourceInventory(args), /Duplicate native output/);
});

test("linked Markdown directories cannot pull foreign files into the source inventory", async t => {
  const args = await fixture(t);
  const outside = path.join(args.root, "outside");
  await mkdir(outside);
  await writeFile(path.join(outside, "private.md"), "not a project source\n");
  await symlink(outside, path.join(args.sourceDir, "linked"), "dir");
  await assert.rejects(markdownSources(args.sourceDir), /Refuse linked/);
});
