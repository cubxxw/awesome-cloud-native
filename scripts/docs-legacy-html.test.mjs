import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { legacyHtmlCompilerOptions } from "./docs-legacy-html.mjs";

const require = createRequire(new URL("../package.json", import.meta.url));
const vue = require("vue");
const vueRequire = createRequire(require.resolve("vue/package.json"));
const rendererRequire = createRequire(vueRequire.resolve("@vue/server-renderer/package.json"));
const { compile } = rendererRequire("@vue/compiler-ssr");
const { compile: compileClient } = vueRequire("@vue/compiler-dom");
const { renderToString } = require("vue/server-renderer");

async function render(template) {
  const compiled = compile(template, { mode: "function", ...legacyHtmlCompilerOptions });
  const component = { ssrRender: new Function("require", compiled.code)(require) };
  const app = vue.createSSRApp(component), warnings = [];
  app.config.warnHandler = warning => warnings.push(warning);
  return { html: await renderToString(app), code: compiled.code, warnings };
}

test("the real Vue compilers preserve the archived font markup and text", async () => {
  const source = await readFile(new URL("../docs/README.md", import.meta.url), "utf8");
  const markup = source.match(/<font\b[^>]*>([\s\S]*?)<\/font>/i);
  assert(markup, "Keep the existing archived font regression fixture");
  const result = await render(`<p>${markup[0]}</p>`);
  assert(result.html.includes('<font color="gree">'));
  assert(result.html.includes(markup[1]));
  assert.deepEqual(result.warnings, []);
  const client = compileClient(`<p>${markup[0]}</p>`, { mode: "function", ...legacyHtmlCompilerOptions });
  assert(!client.code.includes('resolveComponent("font")'));
  assert(!result.code.includes('resolveComponent("font")'));
});

test("the real compilers still resolve an unknown component", async () => {
  const template = '<p><unknown-widget>not native</unknown-widget></p>';
  const result = await render(template);
  assert(result.code.includes('resolveComponent("unknown-widget")'));
  assert(result.html.includes("<!---->"));
  assert(!result.html.includes("not native"));
  assert(result.warnings.some(warning => warning.includes("Failed to resolve component")));
  const client = compileClient(template, { mode: "function", ...legacyHtmlCompilerOptions });
  assert(client.code.includes('resolveComponent("unknown-widget")'));
});
