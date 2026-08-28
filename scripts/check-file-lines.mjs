#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const LINE_LIMIT = 500;
const ALLOWED_EXTENSIONS = new Set([".ts", ".tsx", ".css"]);
const SKIP_DIRECTORY_NAMES = new Set([
  "node_modules",
  "dist",
  "coverage",
  "playwright-report",
  "test-results",
]);

function collectFiles(directory) {
  const found = [];
  for (const entry of readdirSync(directory)) {
    if (SKIP_DIRECTORY_NAMES.has(entry)) continue;
    const fullPath = join(directory, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      found.push(...collectFiles(fullPath));
    } else if (ALLOWED_EXTENSIONS.has(extname(entry))) {
      found.push(fullPath);
    }
  }
  return found;
}

function countLines(filePath) {
  const rawLines = readFileSync(filePath, "utf8").split(/\r?\n/);
  if (rawLines.length > 0 && rawLines[rawLines.length - 1] === "") {
    rawLines.pop();
  }
  return rawLines.length;
}

const offenders = [];
for (const targetDirectory of ["src", "tests"]) {
  const absoluteDirectory = join(ROOT, targetDirectory);
  if (!existsSync(absoluteDirectory)) continue;
  for (const filePath of collectFiles(absoluteDirectory)) {
    const lines = countLines(filePath);
    if (lines >= LINE_LIMIT) {
      offenders.push({ file: relative(ROOT, filePath), lines });
    }
  }
}

if (offenders.length > 0) {
  console.error("500줄 이상인 파일을 발견했습니다. 기능 단위로 분리하세요:");
  for (const { file, lines } of offenders) {
    console.error(`  ${file}: ${lines}줄`);
  }
  process.exit(1);
}

console.log("모든 TS·TSX·CSS 파일이 500줄 미만입니다.");
