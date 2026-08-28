import type { CalendarMission, MissionId } from "../domain/types";

/**
 * 검수된 고정 미션 6개. 런타임 무작위 생성 없음.
 * 승인 근거: docs/content-review.md (2026-08-28 기준 fixture).
 */
export const MISSIONS: readonly CalendarMission[] = [
  {
    id: "calendar-gap-01",
    anchorDate: "2026-09-01",
    visibleDates: ["2026-09-01", "2026-09-02", "2026-09-04", "2026-09-05"],
    hiddenDates: ["2026-09-03"],
    expectedAnswers: [
      { selectedDates: ["2026-09-03"], relation: "next-day", weekday: "Thursday" },
    ],
    sourceNote:
      "2026년 9월 실제 그레고리력 fixture. 9월 1일은 화요일이고 3일은 목요일이다. docs/content-review.md 검수.",
    reviewStatus: "approved",
    misconceptionGuard:
      "앞뒤 칸의 날짜와 요일 근거 없이 빈 칸을 임의로 채우지 않도록 안내한다.",
  },
  {
    id: "calendar-week-02",
    anchorDate: "2026-09-07",
    visibleDates: [
      "2026-09-07",
      "2026-09-08",
      "2026-09-09",
      "2026-09-14",
      "2026-09-15",
      "2026-09-16",
    ],
    hiddenDates: [],
    expectedAnswers: [
      {
        selectedDates: ["2026-09-07", "2026-09-14"],
        relation: "seven-days-after",
        weekday: "Monday",
      },
    ],
    sourceNote:
      "2026년 9월 7일과 14일은 실제로 모두 월요일이고 7일 차이가 난다. docs/content-review.md 검수.",
    reviewStatus: "approved",
    misconceptionGuard:
      "같은 요일의 날짜는 7일 차이로 이어진다는 근거를 확인하게 하고, 아무 날짜나 같은 요일로 보지 않게 한다.",
  },
  {
    id: "calendar-yesterday-03",
    anchorDate: "2026-09-14",
    visibleDates: ["2026-09-13", "2026-09-14", "2026-09-15"],
    hiddenDates: [],
    expectedAnswers: [
      { selectedDates: ["2026-09-13", "2026-09-15"], relation: "previous-day" },
      { selectedDates: ["2026-09-13", "2026-09-15"], relation: "next-day" },
    ],
    sourceNote:
      "2026년 9월 14일은 월요일이고 13일은 일요일, 15일은 화요일이다. docs/content-review.md 검수.",
    reviewStatus: "approved",
    misconceptionGuard:
      "어제와 내일을 요일 감으로 정하지 않고 달력 칸 위치 근거로 연결하게 한다.",
  },
  {
    id: "calendar-after-seven-04",
    anchorDate: "2026-09-08",
    visibleDates: ["2026-09-08", "2026-09-14", "2026-09-15", "2026-09-16"],
    hiddenDates: [],
    expectedAnswers: [
      { selectedDates: ["2026-09-15"], relation: "seven-days-after", weekday: "Tuesday" },
    ],
    sourceNote:
      "2026년 9월 8일은 화요일이고 7일 뒤인 15일도 화요일이다. docs/content-review.md 검수.",
    reviewStatus: "approved",
    misconceptionGuard:
      "일주일 뒤를 5일이나 10일 뒤와 혼동하지 않게 7일 뒤 같은 요일 근거를 제시한다.",
  },
  {
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
    sourceNote:
      "가상 행사(도서관 9월 5일 토, 화단 9월 12일 토, 체육 9월 21일 월)의 실제 날짜 순서. docs/content-review.md 검수.",
    reviewStatus: "approved",
    misconceptionGuard:
      "요일만 보고 순서를 판단하지 않게 날짜 숫자가 커지는 근거를 제시한다.",
  },
  {
    id: "calendar-month-06",
    anchorDate: "2026-09-30",
    visibleDates: ["2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02"],
    hiddenDates: [],
    expectedAnswers: [
      { selectedDates: ["2026-10-01"], relation: "month-boundary", weekday: "Thursday" },
    ],
    sourceNote:
      "2026년 9월 30일은 수요일이고 다음 날은 10월 1일 목요일이다. docs/content-review.md 검수.",
    reviewStatus: "approved",
    misconceptionGuard:
      "9월은 30일까지임을 확인하게 하고 9월 31일이 존재한다는 오개념을 막는다.",
  },
] as const;

export const MISSION_IDS: readonly MissionId[] = MISSIONS.map((mission) => mission.id);

export function missionById(id: MissionId): CalendarMission {
  const mission = MISSIONS.find((candidate) => candidate.id === id);
  if (!mission) {
    throw new Error(`검수된 미션 목록에 없는 ID입니다: ${id}`);
  }
  return mission;
}
