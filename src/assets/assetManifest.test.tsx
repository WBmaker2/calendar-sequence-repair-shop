import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import EntranceScreen from "../features/calendar-repair/EntranceScreen";

const PROJECT_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const GENERATED_DIR = join(PROJECT_ROOT, "src", "assets", "generated");
const LEDGER_PATH = join(PROJECT_ROOT, "docs", "image-rights-ledger.md");

describe("생성 자산 권리 장부 1:1 대응", () => {
  it("권리 장부 문서가 존재한다", () => {
    expect(existsSync(LEDGER_PATH)).toBe(true);
  });

  it("generated 디렉터리의 모든 자산이 장부에 기록되어 있다", () => {
    const ledger = readFileSync(LEDGER_PATH, "utf8");
    const files = readdirSync(GENERATED_DIR).filter((name) => !name.startsWith("."));
    expect(files.length).toBeGreaterThan(0);
    for (const file of files) {
      expect(ledger).toContain(file);
    }
  });

  it("장부에 적힌 모든 자산이 실제로 존재한다", () => {
    const ledger = readFileSync(LEDGER_PATH, "utf8");
    const references = [...ledger.matchAll(/friendly-paper-calendar\.[a-z0-9]+/g)].map(
      (match) => match[0],
    );
    expect(references.length).toBeGreaterThan(0);
    for (const reference of new Set(references)) {
      expect(existsSync(join(GENERATED_DIR, reference))).toBe(true);
    }
  });
});

describe("장식 자산 내용 한계", () => {
  it("입구 일러스트에 글자·숫자가 없고 장식으로만 제공된다", () => {
    const svgPath = join(GENERATED_DIR, "friendly-paper-calendar.svg");
    const svg = readFileSync(svgPath, "utf8");
    expect(svg).not.toContain("<text");
    const visibleContent = svg
      .replace(/<[^>]+>/g, " ")
      .replace(/xmlns[^ ]*/g, " ");
    expect(visibleContent).not.toMatch(/[0-9]/);
    expect(visibleContent).not.toMatch(/[가-힣]/);
    expect(visibleContent).not.toMatch(/[A-Za-z]{2,}/);

    render(<EntranceScreen onStart={() => undefined} />);
    const image = screen.getByAltText("");
    expect(image).toHaveAttribute("aria-hidden", "true");
  });
});
