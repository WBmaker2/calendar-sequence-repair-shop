import { epochDay, formatKoreanDate, weekdayNameKo, weekdayOf } from "../../domain/calendarMath";
import type { CalendarCell, CalendarMission, DateKey, Weekday } from "../../domain/types";

export const WEEKDAY_ORDER: readonly Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WEEKDAY_KO: Record<Weekday, string> = {
  Sunday: "일요일",
  Monday: "월요일",
  Tuesday: "화요일",
  Wednesday: "수요일",
  Thursday: "목요일",
  Friday: "금요일",
  Saturday: "토요일",
};

export function weekdayFromKo(ko: string): Weekday {
  const found = WEEKDAY_ORDER.find((weekday) => WEEKDAY_KO[weekday] === ko);
  if (!found) {
    throw new Error(`알 수 없는 요일 표기입니다: ${ko}`);
  }
  return found;
}

export function weekdayIndexOf(date: DateKey): number {
  return WEEKDAY_ORDER.indexOf(weekdayOf(date));
}

/** "9월 5일 토요일" 형태의 짧은 화면 표기 (연도는 문맥으로 생략). */
export function shortDateLabel(date: DateKey): string {
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));
  return `${month}월 ${day}일 ${weekdayNameKo(date)}`;
}

export function cellLabel(cell: CalendarCell): string {
  return formatKoreanDate(cell.date);
}

export interface PositionedCalendarCell {
  readonly cell: CalendarCell;
  readonly hidden: boolean;
  readonly row: number;
  readonly column: number;
}

export interface MissionGrid {
  readonly entries: readonly PositionedCalendarCell[];
  readonly maxRow: number;
}

/**
 * 미션의 visible·hidden 날짜를 실제 요일 열 위치에 배치한다.
 * hidden 날짜는 빈 칸(복원 대상)으로 렌더링되고 절대 숫자를 노출하지 않는다.
 */
export function buildMissionGrid(mission: CalendarMission): MissionGrid {
  const hiddenSet = new Set<string>(mission.hiddenDates);
  const dates = [...new Set<string>([...mission.visibleDates, ...mission.hiddenDates])].sort();
  const firstEpoch = epochDay(dates[0] as DateKey);
  const entries = dates.map((date) => {
    const cell: CalendarCell = {
      date: date as DateKey,
      day: Number(date.slice(8, 10)),
      weekday: weekdayOf(date as DateKey),
      inCurrentMonth: date.slice(0, 7) === mission.anchorDate.slice(0, 7),
    };
    return {
      cell,
      hidden: hiddenSet.has(date),
      row: Math.floor((epochDay(cell.date) - firstEpoch) / 7),
      column: weekdayIndexOf(cell.date),
    };
  });
  const maxRow = entries.reduce((max, entry) => Math.max(max, entry.row), 0);
  return { entries, maxRow };
}
