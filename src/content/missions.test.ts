import {
  diffInDays,
  epochDay,
  evaluateCalendarRepair,
  formatKoreanDate,
  isValidDateKey,
  nextDate,
  previousDate,
  weekdayOf,
} from "../domain/calendarMath";
import { MISSIONS, missionById } from "./missions";
import { assertContentValid, validateContent } from "./validateContent";

const EXPECTED_MISSION_ORDER = [
  "calendar-gap-01",
  "calendar-week-02",
  "calendar-yesterday-03",
  "calendar-after-seven-04",
  "calendar-order-05",
  "calendar-month-06",
] as const;

describe("고정 미션 데이터", () => {
  it("정확히 6개 미션을 계획된 순서로 제공한다", () => {
    expect(MISSIONS).toHaveLength(6);
    expect(MISSIONS.map((mission) => mission.id)).toEqual([
      ...EXPECTED_MISSION_ORDER,
    ]);
  });

  it("모든 미션 ID가 유일하고 검수 메타데이터를 가진다", () => {
    const ids = new Set(MISSIONS.map((mission) => mission.id));
    expect(ids.size).toBe(6);
    for (const mission of MISSIONS) {
      expect(mission.reviewStatus).toBe("approved");
      expect(mission.sourceNote.length).toBeGreaterThan(8);
      expect(mission.sourceNote).toMatch(/[가-힣]/);
      expect(mission.misconceptionGuard.length).toBeGreaterThan(8);
      expect(mission.misconceptionGuard).toMatch(/[가-힣]/);
    }
  });

  it("모든 DateKey가 실제 달력에 존재하고 visible·hidden이 겹치지 않는다", () => {
    for (const mission of MISSIONS) {
      expect(isValidDateKey(mission.anchorDate)).toBe(true);
      for (const date of [...mission.visibleDates, ...mission.hiddenDates]) {
        expect(isValidDateKey(date)).toBe(true);
      }
      const visible = new Set<string>(mission.visibleDates);
      for (const hidden of mission.hiddenDates) {
        expect(visible.has(hidden)).toBe(false);
      }
      expect(visible.has(mission.anchorDate) || mission.hiddenDates.includes(mission.anchorDate)).toBe(true);
    }
  });

  it("숨긴 칸은 곧 복원해야 할 정답 날짜다", () => {
    const gap = missionById("calendar-gap-01");
    expect(gap.hiddenDates).toEqual(["2026-09-03"]);
    expect(gap.expectedAnswers[0]?.selectedDates).toContain("2026-09-03");
  });
});

describe("미션 정답과 실제 UTC 달력의 일치", () => {
  it("빠진 날짜 미션은 9월 3일 목요일이다", () => {
    const gap = missionById("calendar-gap-01");
    expect(gap.anchorDate).toBe("2026-09-01");
    expect(weekdayOf("2026-09-03")).toBe("Thursday");
    expect(nextDate("2026-09-02")).toBe("2026-09-03");
  });

  it("같은 월요일 미션은 9월 7일과 14일, 차이 7일이다", () => {
    const week = missionById("calendar-week-02");
    expect(weekdayOf("2026-09-07")).toBe("Monday");
    expect(weekdayOf("2026-09-14")).toBe("Monday");
    expect(diffInDays("2026-09-07", "2026-09-14")).toBe(7);
    expect(week.anchorDate).toBe("2026-09-07");
  });

  it("어제·내일 미션은 13일 일요일과 15일 화요일이다", () => {
    expect(previousDate("2026-09-14")).toBe("2026-09-13");
    expect(nextDate("2026-09-14")).toBe("2026-09-15");
    expect(weekdayOf("2026-09-13")).toBe("Sunday");
    expect(weekdayOf("2026-09-15")).toBe("Tuesday");
  });

  it("일주일 뒤 미션은 9월 15일 화요일이다", () => {
    const afterSeven = missionById("calendar-after-seven-04");
    expect(afterSeven.anchorDate).toBe("2026-09-08");
    expect(epochDay("2026-09-15") - epochDay("2026-09-08")).toBe(7);
    expect(weekdayOf("2026-09-15")).toBe("Tuesday");
  });

  it("순서 배열 미션은 5일→12일→21일이다", () => {
    const order = missionById("calendar-order-05");
    const expected = order.expectedAnswers[0]?.selectedDates;
    expect(expected).toEqual(["2026-09-05", "2026-09-12", "2026-09-21"]);
    expect(diffInDays("2026-09-05", "2026-09-12")).toBe(7);
  });

  it("월 경계 미션은 2026년 10월 1일 목요일이다", () => {
    const boundary = missionById("calendar-month-06");
    expect(boundary.anchorDate).toBe("2026-09-30");
    expect(nextDate("2026-09-30")).toBe("2026-10-01");
    expect(weekdayOf("2026-10-01")).toBe("Thursday");
    expect(formatKoreanDate("2026-10-01")).toBe("2026년 10월 1일 목요일");
  });

  it("여섯 미션 모두 승인된 정답으로 판정을 통과한다", () => {
    for (const mission of MISSIONS) {
      const expected = mission.expectedAnswers[0];
      if (!expected) throw new Error(`정답이 없는 미션: ${mission.id}`);
      const evaluation = evaluateCalendarRepair(mission, expected);
      expect(evaluation.accepted).toBe(true);
    }
  });
});

describe("콘텐츠 검수기 통합", () => {
  it("실제 미션 데이터는 검수기를 통과한다", () => {
    expect(validateContent(MISSIONS)).toEqual([]);
    expect(() => assertContentValid(MISSIONS)).not.toThrow();
  });
});
