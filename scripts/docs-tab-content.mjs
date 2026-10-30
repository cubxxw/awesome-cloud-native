import assert from "node:assert/strict";

const normalize = value => value.replace(/\s+/g, " ").trim();
const decode = value => value
  .replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)))
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const visible = value => normalize(decode(value
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
  .replace(/<[^>]*>/g, "")));

// These documentation groups use fences, inline-code prose and standalone images.
// Check their payload as well as their tab controls: code-tabs can hide later blocks.
export function assertTabContent(source, html) {
  const code = [], prose = [], images = [];
  let inGroup = false, fence = null, body = [];
  for (const line of source.split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      if (marker && marker[1][0] === fence[0] && marker[1].length >= fence.length) {
        if (inGroup) code.push(normalize(body.join("\n")));
        fence = null;
        body = [];
      } else if (inGroup) body.push(line);
      continue;
    }
    if (marker) { fence = marker[1]; continue; }
    if (/^\s*:{3,}\s+(?:code-tabs|tabs)(?:[#\s]|$)/.test(line)) { inGroup = true; continue; }
    if (!inGroup) continue;
    if (/^\s*:{3,}\s*$/.test(line)) { inGroup = false; continue; }
    if (/^\s*@tab(?:\s|:|$)/.test(line) || !line.trim()) continue;
    const image = line.match(/^\s*!\[[^\]]*\]\((\S+?)(?:\s+"[^"]*")?\)\s*$/);
    if (image) images.push(image[1]);
    else prose.push(normalize(line.replace(/^\s*>\s?/, "").replace(/`+/g, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")));
  }
  const blocks = [...html.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi)]
    .map(match => visible(match[1].match(/<code\b[^>]*>([\s\S]*?)<\/code>/i)?.[1] || match[1]));
  const remaining = new Map();
  for (const block of blocks) remaining.set(block, (remaining.get(block) || 0) + 1);
  for (const block of code) {
    assert((remaining.get(block) || 0) > 0, "A tab lost a fenced instruction block");
    remaining.set(block, remaining.get(block) - 1);
  }
  const text = visible(html);
  for (const paragraph of prose) assert(text.includes(paragraph), "A tab lost explanatory content");
  const renderedImages = [...html.matchAll(/<img\b[^>]*\bsrc=(?:"([^"]*)"|'([^']*)')[^>]*>/gi)]
    .map(match => decode(match[1] || match[2]));
  for (const image of images) assert(renderedImages.includes(image), "A tab lost its source image");
}
