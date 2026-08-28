import type {
  CalendarAnswer,
  CalendarEvaluation,
  CalendarMission,
  DateKey,
  Relation,
  Weekday,
} from "./types";

const WEEKDAYS: readonly Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WEEKDAY_NAMES_KO: Record<Weekday, string> = {
  Sunday: "일요일",
  Monday: "월요일",
  Tuesday: "화요일",
  Wednesday: "수요일",
  Thursday: "목요일",
  Friday: "금요일",
  Saturday: "토요일",
};

const RELATIONS: readonly string[] = [
  "previous-day",
  "next-day",
  "seven-days-after",
  "chronological-order",
  "month-boundary",
];

const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function daysInMonth(year: number, month: number): number {
  const lengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError(`잘못된 달입니다: ${year}-${month}`);
  }
  return lengths[month - 1];
}

export function isValidDateKey(value: string): value is DateKey {
  const match = DATE_KEY_PATTERN.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > daysInMonth(year, month)) return false;
  return true;
}

function parseDateKey(key: DateKey): { year: number; month: number; day: number } {
  if (!isValidDateKey(key)) {
    throw new RangeError(`달력에 없는 날짜입니다: ${String(key)}`);
  }
  const [year, month, day] = key.split("-").map(Number);
  return { year, month, day };
}

/** 1970-01-01을 0으로 하는 UTC epoch-day. 지역 시간대의 영향을 받지 않는다. */
export function epochDay(key: DateKey): number {
  const { year, month, day } = parseDateKey(key);
  return Math.round(Date.UTC(year, month - 1, day) / MS_PER_DAY);
}

export function fromEpochDay(epochDays: number): DateKey {
  const utc = new Date(epochDays * MS_PER_DAY);
  const year = utc.getUTCFullYear();
  const padded = (value: number) => `${value}`.padStart(2, "0");
  return `${year}-${padded(utc.getUTCMonth() + 1)}-${padded(utc.getUTCDate())}` as DateKey;
}

export function addDays(key: DateKey, amount: number): DateKey {
  return fromEpochDay(epochDay(key) + amount);
}

export function nextDate(key: DateKey): DateKey {
  return addDays(key, 1);
}

export function previousDate(key: DateKey): DateKey {
  return addDays(key, -1);
}

export function diffInDays(from: DateKey, to: DateKey): number {
  return epochDay(to) - epochDay(from);
}

export function weekdayOf(key: DateKey): Weekday {
  const index = (epochDay(key) + 4) % 7;
  return WEEKDAYS[index];
}

export function weekdayNameKo(key: DateKey): string {
  return WEEKDAY_NAMES_KO[weekdayOf(key)];
}

export function formatKoreanDate(key: DateKey): string {
  const { year, month, day } = parseDateKey(key);
  return `${year}년 ${month}월 ${day}일 ${WEEKDAY_NAMES_KO[weekdayOf(key)]}`;
}

function sameDates(
  left: readonly DateKey[],
  right: readonly DateKey[],
  orderMatters: boolean,
): boolean {
  if (left.length !== right.length) return false;
  if (orderMatters) {
    return left.every((date, index) => date === right[index]);
  }
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return sortedLeft.every((date, index) => date === sortedRight[index]);
}

function answersEquivalent(answer: CalendarAnswer, expected: CalendarAnswer): boolean {
  if (answer.relation !== expected.relation) return false;
  if ((answer.weekday ?? null) !== (expected.weekday ?? null)) return false;
  return sameDates(
    answer.selectedDates,
    expected.selectedDates,
    answer.relation === "chronological-order",
  );
}

function acceptanceEvidence(mission: CalendarMission, answer: CalendarAnswer): string[] {
  const anchorText = formatKoreanDate(mission.anchorDate);
  switch (answer.relation) {
    case "next-day": {
      const lines: string[] = [];
      for (const date of answer.selectedDates) {
        lines.push(
          `${formatKoreanDate(previousDate(date))}의 다음 날은 ${formatKoreanDate(date)}이에요.`,
        );
      }
      lines.push("달력에서 날짜가 하루에 하나씩 커지는 규칙을 확인했어요.");
      return lines;
    }
    case "previous-day": {
      const lines: string[] = [];
      for (const date of answer.selectedDates) {
        if (epochDay(date) < epochDay(mission.anchorDate)) {
          lines.push(`오늘 ${anchorText}의 어제는 ${formatKoreanDate(date)}이에요.`);
        } else {
          lines.push(`오늘 ${anchorText}의 내일은 ${formatKoreanDate(date)}이에요.`);
        }
      }
      lines.push("달력 칸에서 하루 전과 하루 뒤를 나란히 확인했어요.");
      return lines;
    }
    case "seven-days-after": {
      const lines = [
        `${anchorText}에서 7일 뒤는 ${formatKoreanDate(answer.selectedDates[0])}이에요.`,
        "7일 뒤에는 같은 요일이 다시 돌아와요.",
      ];
      return lines;
    }
    case "chronological-order": {
      const sequence = answer.selectedDates.map(formatKoreanDate).join(" → ");
      return [
        `날짜가 빠른 순서대로 ${sequence}예요.`,
        "달력에서 앞쪽 칸일수록 날짜가 빠르다는 근거로 배열했어요.",
      ];
    }
    case "month-boundary": {
      return [
        `${anchorText}의 다음 날은 새로운 달인 ${formatKoreanDate(answer.selectedDates[0])}이에요.`,
        "한 달이 끝나면 다음 달 1일로 이어져요.",
      ];
    }
  }
}

function hintEvidence(mission: CalendarMission): string[] {
  const anchorText = formatKoreanDate(mission.anchorDate);
  const relation = mission.expectedAnswers[0]?.relation;
  switch (relation) {
    case "previous-day":
      return [`${anchorText}의 하루 전과 하루 뒤를 달력 칸에서 다시 찾아 보세요.`];
    case "next-day":
      return [`${anchorText}의 다음 날을 달력에서 다시 세어 보세요.`];
    case "seven-days-after":
      return [`${anchorText}보다 7일 뒤, 같은 요일 칸을 다시 찾아 보세요.`];
    case "chronological-order":
      return ["가장 빠른 날짜부터 차례대로 다시 눌러 보세요."];
    case "month-boundary":
      return [`${anchorText}이 그 달의 마지막 날이라면 다음 날은 어느 달의 며칠일까요? 다시 찾아 보세요.`];
    default:
      return ["달력 칸을 다시 한 번 살펴 보세요."];
  }
}

export function evaluateCalendarRepair(
  mission: CalendarMission,
  answer: CalendarAnswer,
): CalendarEvaluation {
  const primary = mission.expectedAnswers[0];
  const expectedRelation: Relation =
    primary?.relation ?? "chronological-order";

  const datesValid =
    answer.selectedDates.length > 0 && answer.selectedDates.every(isValidDateKey);
  const relationValid = RELATIONS.includes(answer.relation);
  if (!datesValid || !relationValid) {
    return {
      accepted: false,
      expectedRelation,
      evidenceDates: [mission.anchorDate],
      evidenceKeys: ["선택한 날짜를 다시 한 번 확인해 주세요."],
    };
  }

  const universe = new Set<string>([
    ...mission.visibleDates,
    ...mission.hiddenDates,
    ...mission.expectedAnswers.flatMap((expected) => [...expected.selectedDates]),
  ]);
  const insideUniverse = answer.selectedDates.every((date) => universe.has(date));

  const matched = mission.expectedAnswers.find((expected) =>
    answersEquivalent(answer, expected),
  );

  if (matched !== undefined && insideUniverse) {
    const evidenceDates = [...new Set([mission.anchorDate, ...answer.selectedDates])].sort();
    return {
      accepted: true,
      expectedRelation: matched.relation,
      evidenceDates,
      evidenceKeys: acceptanceEvidence(mission, answer),
    };
  }

  const evidenceDates = [
    ...new Set([mission.anchorDate, ...(primary?.selectedDates ?? [])]),
  ].sort();
  return {
    accepted: false,
    expectedRelation,
    evidenceDates,
    evidenceKeys: hintEvidence(mission),
  };
}
