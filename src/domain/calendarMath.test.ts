import {
  addDays,
  diffInDays,
  epochDay,
  evaluateCalendarRepair,
  formatKoreanDate,
  isValidDateKey,
  nextDate,
  previousDate,
  weekdayOf,
} from "./calendarMath";
import type { CalendarAnswer, CalendarMission, DateKey, Relation } from "./types";

function makeMission(overrides: Partial<CalendarMission> = {}): CalendarMission {
  return {
    id: "calendar-gap-01",
    anchorDate: "2026-09-02",
    visibleDates: ["2026-09-01", "2026-09-02", "2026-09-04", "2026-09-05"],
    hiddenDates: ["2026-09-03"],
    expectedAnswers: [
      { selectedDates: ["2026-09-03"], relation: "next-day", weekday: "Thursday" },
    ],
    sourceNote: "2026년 9월 실제 달력 fixture (docs/content-review.md)",
    reviewStatus: "approved",
    misconceptionGuard: "앞뒤 칸 근거 없이 빈 칸을 임의로 채우지 않도록 안내한다.",
    ...overrides,
  };
}

describe("isValidDateKey", () => {
  it("zero-padded 실제 달력 날짜를 허용한다", () => {
    expect(isValidDateKey("2026-09-03")).toBe(true);
    expect(isValidDateKey("2026-02-28")).toBe(true);
    expect(isValidDateKey("2024-02-29")).toBe(true);
    expect(isValidDateKey("2026-10-01")).toBe(true);
    expect(isValidDateKey("2026-12-31")).toBe(true);
  });

  it("잘못된 날짜 6건을 거부한다", () => {
    expect(isValidDateKey("2026-9-3")).toBe(false);
    expect(isValidDateKey("2026-09-31")).toBe(false);
    expect(isValidDateKey("2026-02-29")).toBe(false);
    expect(isValidDateKey("2026-13-01")).toBe(false);
    expect(isValidDateKey("2026-00-05")).toBe(false);
    expect(isValidDateKey("2026-09-00")).toBe(false);
  });
});

describe("weekdayOf", () => {
  it("2026년 9~10월 고정 요일 fixture와 일치한다", () => {
    expect(weekdayOf("2026-09-01")).toBe("Tuesday");
    expect(weekdayOf("2026-09-03")).toBe("Thursday");
    expect(weekdayOf("2026-09-05")).toBe("Saturday");
    expect(weekdayOf("2026-09-07")).toBe("Monday");
    expect(weekdayOf("2026-09-08")).toBe("Tuesday");
    expect(weekdayOf("2026-09-12")).toBe("Saturday");
    expect(weekdayOf("2026-09-13")).toBe("Sunday");
    expect(weekdayOf("2026-09-14")).toBe("Monday");
    expect(weekdayOf("2026-09-15")).toBe("Tuesday");
    expect(weekdayOf("2026-09-21")).toBe("Monday");
    expect(weekdayOf("2026-09-29")).toBe("Tuesday");
    expect(weekdayOf("2026-09-30")).toBe("Wednesday");
    expect(weekdayOf("2026-10-01")).toBe("Thursday");
  });
});

describe("nextDate와 previousDate", () => {
  it("어제·내일 8건을 월·연도 경계까지 정확히 계산한다", () => {
    expect(nextDate("2026-09-02")).toBe("2026-09-03");
    expect(previousDate("2026-09-02")).toBe("2026-09-01");
    expect(nextDate("2026-09-13")).toBe("2026-09-14");
    expect(previousDate("2026-09-13")).toBe("2026-09-12");
    expect(nextDate("2026-09-30")).toBe("2026-10-01");
    expect(previousDate("2026-10-01")).toBe("2026-09-30");
    expect(nextDate("2026-08-31")).toBe("2026-09-01");
    expect(previousDate("2026-09-01")).toBe("2026-08-31");
  });

  it("연말 경계와 평년 2월 끝을 처리한다", () => {
    expect(nextDate("2026-12-31")).toBe("2027-01-01");
    expect(previousDate("2027-01-01")).toBe("2026-12-31");
    expect(nextDate("2026-02-28")).toBe("2026-03-01");
    expect(nextDate("2024-02-28")).toBe("2024-02-29");
  });

  it("존재하지 않는 9월 31일 입력을 거부한다", () => {
    expect(() => epochDay("2026-09-31")).toThrow(RangeError);
    expect(() => epochDay("2026-09-3")).toThrow(RangeError);
  });
});

describe("addDays", () => {
  it("일주일 뒤 6건을 같은 요일로 계산한다", () => {
    const cases: readonly (readonly [DateKey, DateKey])[] = [
      ["2026-09-01", "2026-09-08"],
      ["2026-09-05", "2026-09-12"],
      ["2026-09-07", "2026-09-14"],
      ["2026-09-08", "2026-09-15"],
      ["2026-09-30", "2026-10-07"],
      ["2026-09-24", "2026-10-01"],
    ];
    for (const [from, to] of cases) {
      expect(addDays(from, 7)).toBe(to);
      expect(weekdayOf(addDays(from, 7))).toBe(weekdayOf(from));
    }
  });

  it("음수 이동도 지원한다", () => {
    expect(addDays("2026-09-03", -7)).toBe("2026-08-27");
    expect(diffInDays("2026-08-27", "2026-09-03")).toBe(7);
  });
});

describe("diffInDays", () => {
  it("같은 월요일 사이는 7이다", () => {
    expect(diffInDays("2026-09-07", "2026-09-14")).toBe(7);
    expect(diffInDays("2026-09-05", "2026-09-21")).toBe(16);
    expect(diffInDays("2026-09-21", "2026-09-05")).toBe(-16);
  });
});

describe("formatKoreanDate", () => {
  it("한국어 화면 표기로 바꾼다", () => {
    expect(formatKoreanDate("2026-09-03")).toBe("2026년 9월 3일 목요일");
    expect(formatKoreanDate("2026-09-30")).toBe("2026년 9월 30일 수요일");
    expect(formatKoreanDate("2026-10-01")).toBe("2026년 10월 1일 목요일");
  });
});

describe("시간대 독립성", () => {
  const originalTimeZone = process.env.TZ;

  it("서버 시간대를 바꿔도 결과가 변하지 않는다", () => {
    const offsets = new Set<number>();
    const zones = ["UTC", "America/New_York", "Pacific/Kiritimati"] as const;
    try {
      for (const zone of zones) {
        process.env.TZ = zone;
        offsets.add(new Date(2026, 8, 1).getTimezoneOffset());
        expect(weekdayOf("2026-09-01")).toBe("Tuesday");
        expect(nextDate("2026-09-30")).toBe("2026-10-01");
        expect(weekdayOf("2026-10-01")).toBe("Thursday");
      }
      expect(offsets.size).toBe(3);
    } finally {
      if (originalTimeZone === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = originalTimeZone;
      }
    }
  });
});

describe("evaluateCalendarRepair", () => {
  it("빠진 날짜 정답을 받아들이고 근거를 한국어로 반환한다", () => {
    const mission = makeMission();
    const evaluation = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-03"],
      relation: "next-day",
      weekday: "Thursday",
    });
    expect(evaluation.accepted).toBe(true);
    expect(evaluation.expectedRelation).toBe("next-day");
    expect(evaluation.evidenceDates).toContain("2026-09-02");
    expect(evaluation.evidenceDates).toContain("2026-09-03");
    expect(evaluation.evidenceKeys.length).toBeGreaterThan(0);
    for (const evidence of evaluation.evidenceKeys) {
      expect(evidence).toMatch(/[가-힣]/);
      expect(evidence).not.toMatch(/[A-Za-z]/);
    }
  });

  it("오답에는 정답을 공개하지 않는 힌트 근거를 준다", () => {
    const mission = makeMission();
    const evaluation = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-04"],
      relation: "next-day",
      weekday: "Thursday",
    });
    expect(evaluation.accepted).toBe(false);
    expect(evaluation.expectedRelation).toBe("next-day");
    for (const evidence of evaluation.evidenceKeys) {
      expect(evidence).not.toContain("9월 3일");
    }
  });

  it("요일이 다르면 거부한다", () => {
    const mission = makeMission();
    const evaluation = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-03"],
      relation: "next-day",
      weekday: "Friday",
    });
    expect(evaluation.accepted).toBe(false);
  });

  it("잘못된 날짜·빈 선택·모르는 관계·범위 밖 날짜를 거부한다", () => {
    const mission = makeMission();
    const invalidDate = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-31" as DateKey],
      relation: "next-day",
      weekday: "Thursday",
    });
    expect(invalidDate.accepted).toBe(false);

    const empty = evaluateCalendarRepair(mission, {
      selectedDates: [],
      relation: "next-day",
      weekday: "Thursday",
    });
    expect(empty.accepted).toBe(false);

    const unknownRelation = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-03"],
      relation: "month-boundary" as Relation,
      weekday: "Thursday",
    });
    expect(unknownRelation.accepted).toBe(false);

    const outsideUniverse = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-20"],
      relation: "next-day",
      weekday: "Thursday",
    });
    expect(outsideUniverse.accepted).toBe(false);
  });

  it("어제·내일 쌍 답을 복수 해법으로 받아들이고 부분 답은 거부한다", () => {
    const mission = makeMission({
      id: "calendar-yesterday-03",
      anchorDate: "2026-09-14",
      visibleDates: ["2026-09-13", "2026-09-14", "2026-09-15"],
      hiddenDates: [],
      expectedAnswers: [
        { selectedDates: ["2026-09-13", "2026-09-15"], relation: "previous-day" },
        { selectedDates: ["2026-09-13", "2026-09-15"], relation: "next-day" },
      ],
    });
    const asPrevious = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-15", "2026-09-13"],
      relation: "previous-day",
    });
    expect(asPrevious.accepted).toBe(true);

    const asNext = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-13", "2026-09-15"],
      relation: "next-day",
    });
    expect(asNext.accepted).toBe(true);

    const partial = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-13"],
      relation: "previous-day",
    });
    expect(partial.accepted).toBe(false);
  });

  it("순서 배열 답은 순서까지 정확해야 받아들인다", () => {
    const mission = makeMission({
      id: "calendar-order-05",
      anchorDate: "2026-09-05",
      visibleDates: ["2026-09-05", "2026-09-12", "2026-09-21"],
      hiddenDates: [],
      expectedAnswers: [
        {
          selectedDates: ["2026-09-05", "2026-09-12", "2026-09-21"],
          relation: "chronological-order",
        },
      ],
    });
    const inOrder = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-05", "2026-09-12", "2026-09-21"],
      relation: "chronological-order",
    });
    expect(inOrder.accepted).toBe(true);

    const swapped = evaluateCalendarRepair(mission, {
      selectedDates: ["2026-09-12", "2026-09-05", "2026-09-21"],
      relation: "chronological-order",
    });
    expect(swapped.accepted).toBe(false);
  });

  it("일주일 뒤와 월 경계 정답을 받아들인다", () => {
    const week = makeMission({
      id: "calendar-after-seven-04",
      anchorDate: "2026-09-08",
      visibleDates: ["2026-09-08", "2026-09-14", "2026-09-15", "2026-09-16"],
      hiddenDates: [],
      expectedAnswers: [
        { selectedDates: ["2026-09-15"], relation: "seven-days-after", weekday: "Tuesday" },
      ],
    });
    expect(
      evaluateCalendarRepair(week, {
        selectedDates: ["2026-09-15"],
        relation: "seven-days-after",
        weekday: "Tuesday",
      }).accepted,
    ).toBe(true);

    const boundary = makeMission({
      id: "calendar-month-06",
      anchorDate: "2026-09-30",
      visibleDates: ["2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02"],
      hiddenDates: [],
      expectedAnswers: [
        { selectedDates: ["2026-10-01"], relation: "month-boundary", weekday: "Thursday" },
      ],
    });
    const evaluation = evaluateCalendarRepair(boundary, {
      selectedDates: ["2026-10-01"],
      relation: "month-boundary",
      weekday: "Thursday",
    });
    expect(evaluation.accepted).toBe(true);
    expect(evaluation.evidenceKeys.join(" ")).toContain("10월 1일");
  });
});

describe("순수성", () => {
  it("입력을 변경하지 않고 readonly 배열을 받는다", () => {
    const mission = makeMission();
    const frozenAnswer: CalendarAnswer = Object.freeze({
      selectedDates: Object.freeze(["2026-09-03"]),
      relation: "next-day",
      weekday: "Thursday",
    }) as CalendarAnswer;
    const before = JSON.stringify(mission);
    const evaluation = evaluateCalendarRepair(mission, frozenAnswer);
    expect(evaluation.accepted).toBe(true);
    expect(JSON.stringify(mission)).toBe(before);
    expect(Array.isArray(frozenAnswer.selectedDates)).toBe(true);
  });
});
