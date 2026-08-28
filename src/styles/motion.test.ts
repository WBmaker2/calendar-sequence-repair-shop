import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FEATURE_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "features",
  "calendar-repair",
);
const STAGE_DIR = join(FEATURE_DIR, "stages");
const REPORT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "features", "report");
const MOTION_CSS = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "motion.css"),
  "utf8",
);

function readSource(directory: string, file: string): string {
  return readFileSync(join(directory, file), "utf8");
}

describe("모션 CSS와 축소 모션 대체", () => {
  it("gi-pulse 맥박을 정의한다", () => {
    expect(MOTION_CSS).toContain(".gi-pulse");
    expect(MOTION_CSS).toContain("@keyframes");
  });

  it("prefers-reduced-motion에서 맥박을 제거하고 고정 외곽선과 필수 배지로 대체한다", () => {
    const reduced = MOTION_CSS.slice(MOTION_CSS.indexOf("prefers-reduced-motion"));
    expect(reduced).toContain("animation");
    expect(reduced).toContain("none");
    expect(reduced).toContain("필수");
    expect(reduced).toContain("3px");
  });

  it("수동 축소 모드(.reduce-motion)도 같은 대체를 제공한다", () => {
    expect(MOTION_CSS).toContain(".reduce-motion");
  });
});

describe("gi-pulse는 두 필수 행동에만 사용된다", () => {
  it("필수 행동 버튼(달력 칸 확인·관계 완성)만 pulse를 켠다", () => {
    expect(readSource(STAGE_DIR, "SelectStage.tsx")).toContain("달력 칸 확인");
    for (const file of ["RelateStage.tsx", "WeekStage.tsx", "BoundaryStage.tsx"]) {
      const source = readSource(STAGE_DIR, file);
      expect(source).toContain("관계 완성");
      expect(source).toContain("pulse");
    }
  });

  it("나머지 화면은 pulse를 쓰지 않는다", () => {
    for (const [directory, file] of [
      [STAGE_DIR, "WeekdayStripStage.tsx"],
      [STAGE_DIR, "PredictStage.tsx"],
      [REPORT_DIR, "LearningReport.tsx"],
      [join(dirname(fileURLToPath(import.meta.url)), "..", "features", "calendar-repair"), "EntranceScreen.tsx"],
    ] as const) {
      expect(readSource(directory, file)).not.toContain("pulse");
    }
  });
});
