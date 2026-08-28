import { MISSIONS } from "./missions";
import { assertContentValid, validateContent, type ContentIssue } from "./validateContent";
import type { CalendarMission, DateKey } from "../domain/types";

function cloneWith(overrides: Partial<CalendarMission>): CalendarMission {
  return { ...MISSIONS[0], ...overrides };
}

function issueCodes(missions: readonly CalendarMission[]): string[] {
  return validateContent(missions).map((issue: ContentIssue) => issue.code);
}

describe("validateContent", () => {
  it("검수된 6개 미션에서는 문제가 없다", () => {
    expect(validateContent(MISSIONS)).toEqual([]);
  });

  it("미션 수가 6개가 아니면 실패한다", () => {
    expect(issueCodes(MISSIONS.slice(0, 5))).toContain("mission-count");
  });

  it("미션 ID가 중복되거나 계획과 다르면 실패한다", () => {
    const duplicated = [MISSIONS[0], MISSIONS[0], ...MISSIONS.slice(1, 5)];
    expect(issueCodes(duplicated)).toContain("mission-id");
  });

  it("달력에 없는 날짜가 있으면 실패한다", () => {
    const broken = MISSIONS.map((mission) =>
      mission.id === "calendar-week-02"
        ? {
            ...mission,
            visibleDates: ["2026-09-31" as DateKey, ...mission.visibleDates.slice(1)],
          }
        : mission,
    );
    expect(issueCodes(broken)).toContain("date-key");
  });

  it("visibleDates와 hiddenDates가 겹치면 실패한다", () => {
    const broken = MISSIONS.map((mission) =>
      mission.id === "calendar-gap-01"
        ? { ...mission, hiddenDates: ["2026-09-02" as const] }
        : mission,
    );
    expect(issueCodes(broken)).toContain("visible-hidden-overlap");
  });

  it("검수 상태가 approved가 아니면 실패한다", () => {
    const broken = MISSIONS.map((mission) =>
      mission.id === "calendar-order-05"
        ? { ...mission, reviewStatus: "pending" as const }
        : mission,
    );
    expect(issueCodes(broken)).toContain("review-status");
  });

  it("sourceNote나 misconceptionGuard가 비면 실패한다", () => {
    const broken = MISSIONS.map((mission) =>
      mission.id === "calendar-yesterday-03"
        ? { ...mission, misconceptionGuard: "" }
        : mission,
    );
    expect(issueCodes(broken)).toContain("metadata");
  });

  it("기대 정답의 요일이 실제 달력과 다르면 실패한다", () => {
    const broken = MISSIONS.map((mission) =>
      mission.id === "calendar-gap-01"
        ? {
            ...mission,
            expectedAnswers: [
              { selectedDates: ["2026-09-03" as const], relation: "next-day" as const, weekday: "Friday" as const },
            ],
          }
        : mission,
    );
    expect(issueCodes(broken)).toContain("expected-consistency");
  });

  it("다음 날 관계인데 날짜가 실제 계산과 다르면 실패한다", () => {
    const broken = MISSIONS.map((mission) =>
      mission.id === "calendar-month-06"
        ? {
            ...mission,
            expectedAnswers: [
              { selectedDates: ["2026-10-02" as const], relation: "month-boundary" as const, weekday: "Friday" as const },
            ],
          }
        : mission,
    );
    expect(issueCodes(broken)).toContain("expected-consistency");
  });

  it("순서 배열 정답이 날짜 빠른 순서가 아니면 실패한다", () => {
    const broken = MISSIONS.map((mission) =>
      mission.id === "calendar-order-05"
        ? {
            ...mission,
            expectedAnswers: [
              {
                selectedDates: ["2026-09-12", "2026-09-05", "2026-09-21"] as const,
                relation: "chronological-order" as const,
              },
            ],
          }
        : mission,
    );
    expect(issueCodes(broken)).toContain("expected-consistency");
  });

  it("기대 정답이 하나도 없으면 실패한다", () => {
    const broken = [cloneWith({ id: "calendar-gap-01", expectedAnswers: [] }), ...MISSIONS.slice(1)];
    expect(issueCodes(broken)).toContain("expected-answers");
  });

  it("assertContentValid는 문제 목록을 모아 던진다", () => {
    expect(() => assertContentValid([])).toThrow(/mission-count/);
  });
});
