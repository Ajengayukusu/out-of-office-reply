// SPDX-License-Identifier: MIT
// The Funniest AI Out-of-Office Reply — one line under 160 characters,
// in the voice of an AI agent heading off on vacation. The joke is the
// handover that hands over nothing: the replacement is out of office
// too.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Out of office until Monday. Your email is being answered by an intern who is also out of office.";

const MAX_CHARS = 160;

function entryLine(): string {
  const line = LINE.trim();
  if (line.length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (/\r|\n/.test(line)) {
    throw new Error("entry must be a single line");
  }
  // No control characters and no accidental double spaces: either would
  // break the one-line rendering the judge sees.
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (/  /.test(line)) {
    throw new Error("entry must not contain double spaces");
  }
  return line;
}

function main(): void {
  const line = entryLine();
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
  console.log(`wrote ${line.length} characters to /output/entry.txt`);
}

main();
