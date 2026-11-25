// Make the AI Judge Laugh — one-line office joke entry.
// Writes a single joke about office life (<200 chars, one line)
// to /output/entry.txt for the make.fun program/v1 harness.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a true office observation (IT requests spawn meetings about
// the request) with a tight parallel turn — "second monitor" becomes
// "second meeting". One breath, no wasted setup.
const JOKE =
  "I asked IT for a second monitor and got a second meeting about why I need a second monitor.";

// The sealed scorer accepts 1–200 UTF-8 characters, not only whitespace,
// a single line. Count code points, the way the scorer counts characters.
// Fail loudly here rather than shipping an invalid entry.
const charCount = [...JOKE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`joke is ${charCount} chars, must be 1-200`);
}
if (JOKE.includes("\n") || JOKE.trim() !== JOKE) {
  throw new Error("joke must be a single line with no surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

// Round-trip check: what the grader reads must be byte-identical to JOKE.
if (readFileSync(outPath, "utf8") !== JOKE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${charCount}-char entry to ${outPath}`);
