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

describe("gi-pulse는 단계의 필수 완료 행동에 사용된다", () => {
  it("각 학습 단계의 완료 버튼에 pulse를 켠다", () => {
    for (const file of [
      "WeekdayStripStage.tsx",
      "PredictStage.tsx",
      "SelectStage.tsx",
      "RelateStage.tsx",
      "WeekStage.tsx",
      "BoundaryStage.tsx",
    ]) {
      expect(readSource(STAGE_DIR, file)).toContain("pulse");
    }
  });

  it("나머지 화면은 pulse를 쓰지 않는다", () => {
    for (const [directory, file] of [
      [REPORT_DIR, "LearningReport.tsx"],
      [join(dirname(fileURLToPath(import.meta.url)), "..", "features", "calendar-repair"), "EntranceScreen.tsx"],
    ] as const) {
      expect(readSource(directory, file)).not.toContain("pulse");
    }
  });
});
