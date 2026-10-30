import assert from "node:assert/strict";

const normalize = value => value.replace(/\s+/g, " ").trim();
const decode = value => value
  .replace(/&#(?:x([\da-f]+)|(\d+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)))
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const visible = value => normalize(decode(value
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
  .replace(/<[^>]*>/g, "")));
const paragraph = line => normalize(line.replace(/^\s*>\s?/, "").replace(/`+/g, "")
  .replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1")
  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));

// The native Markdown pass uses components; SSG uses nested HTML divs. Exclude
// both shapes so a shared note cannot pass merely by appearing in a hidden tab.
function outsideTabs(html) {
  const stack = [], output = [];
  for (const token of html.match(/<!--[\s\S]*?-->|<\/?[a-z][^>]*>|[^<]+|</gi) || []) {
    const close = token.match(/^<\/([\w:-]+)/);
    if (close) {
      const index = stack.findLastIndex(entry => entry.name === close[1].toLowerCase());
      if (index !== -1) stack.splice(index);
      continue;
    }
    const open = token.match(/^<([\w:-]+)/);
    if (open) {
      const name = open[1].toLowerCase();
      const classes = token.match(/\bclass\s*=\s*["']([^"']*)["']/i)?.[1].split(/\s+/) || [];
      const blocked = stack.at(-1)?.blocked || ["tabs", "codetabs"].includes(name)
        || classes.some(value => ["vp-tabs", "vp-code-tabs"].includes(value));
      if (!/\/$/.test(token.slice(0, -1)) && !["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"].includes(name)) {
        stack.push({ name, blocked });
      }
      continue;
    }
    if (!stack.at(-1)?.blocked && !token.startsWith("<!--")) output.push(token);
  }
  return visible(output.join(""));
}

// These documentation groups use fences, inline-code prose and standalone images.
// Check their payload as well as their tab controls: code-tabs can hide later blocks.
export function assertTabContent(source, html) {
  const code = [], prose = [], images = [], sharedNotes = [];
  let inGroup = false, afterGroup = false, fence = null, body = [];
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
    if (marker) { fence = marker[1]; afterGroup = false; continue; }
    if (/^\s*:{3,}\s+(?:code-tabs|tabs)(?:[#\s]|$)/.test(line)) { inGroup = true; afterGroup = false; continue; }
    if (!inGroup) {
      if (afterGroup && line.trim()) {
        if (/^\s*(?:#{1,6}\s|:{3,}|[-*+]\s|\d+[.)]\s|\||<|!\[)/.test(line)) afterGroup = false;
        else sharedNotes.push(paragraph(line));
      }
      continue;
    }
    if (/^\s*:{3,}\s*$/.test(line)) { inGroup = false; afterGroup = true; continue; }
    if (/^\s*@tab(?:\s|:|$)/.test(line) || !line.trim()) continue;
    const image = line.match(/^\s*!\[[^\]]*\]\((\S+?)(?:\s+"[^"]*")?\)\s*$/);
    if (image) images.push(image[1]);
    else prose.push(paragraph(line));
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
  const sharedText = outsideTabs(html);
  for (const note of sharedNotes) assert(sharedText.includes(note), "A shared note disappeared or moved into a tab");
}
