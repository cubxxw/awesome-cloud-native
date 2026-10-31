import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import * as runner from "./build-verified-docs.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), "cloud-native-source-snapshot-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "docs/.vuepress"), { recursive: true });
  await mkdir(path.join(root, "scripts"));
  for (const name of ["package.json", "package-lock.json"]) await writeFile(path.join(root, name), "{}\n");
  await writeFile(path.join(root, "docs/.vuepress/config.ts"), "export default {};\n");
  await writeFile(path.join(root, "scripts/build-verified-docs.mjs"), "// fixture\n");
  for (const args of [["init"], ["add", "."], ["-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid",
    "-c", "core.hooksPath=/dev/null", "commit", "-m", "fixture"]]) {
    const result = spawnSync("git", args, { cwd: root, encoding: "utf8", env: { ...process.env,
      GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1", GIT_TERMINAL_PROMPT: "0" } });
    assert.equal(result.status, 0, result.stderr);
  }
  return root;
}

test("a provider install cannot silently change the committed lock before identity", async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, "package-lock.json"), '{"changed":true}\n');
  assert.throws(() => runner.assertSourceSnapshot?.(root), /Build inputs changed/);
});

test("new uncommitted articles cannot be certified as the current Git commit", async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, "docs/new.md"), "# uncommitted\n");
  assert.throws(() => runner.assertSourceSnapshot?.(root), /Build inputs changed/);
});

test("owned build output outside source paths does not dirty the source identity", async t => {
  const root = await fixture(t);
  await mkdir(path.join(root, ".build-artifacts"));
  await writeFile(path.join(root, ".build-artifacts/build.log"), "fixture\n");
  assert.doesNotThrow(() => runner.assertSourceSnapshot(root));
});
