import assert from "node:assert/strict";

// Keep the one archived HTML font element out of Vue component resolution.
export const legacyHtmlCompilerOptions = {
  isCustomElement: tag => tag === "font",
};

const text = value => value.replace(/<[^>]*>/g, "")
  .replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)))
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

export function assertLegacyFontContent(source, html) {
  const lines = [];
  let fence = null;
  for (const line of source.split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
      continue;
    }
    if (!fence) lines.push(line.replace(/(`+)(.*?)\1/g, (literal, _, body) => /<\/?font\b/i.test(body) ? "" : literal));
  }
  const rendered = [...html.matchAll(/<font\b[^>]*>([\s\S]*?)<\/font>/gi)].map(match => text(match[1]));
  for (const match of lines.join("\n").matchAll(/<font\b[^>]*>([\s\S]*?)<\/font>/gi)) {
    const expected = text(match[1].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*|`/g, ""));
    const index = rendered.indexOf(expected);
    assert(index !== -1, "Legacy font content disappeared from SSR output");
    rendered.splice(index, 1);
  }
}
