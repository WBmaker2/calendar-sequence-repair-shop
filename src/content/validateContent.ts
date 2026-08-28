import {
  diffInDays,
  epochDay,
  isValidDateKey,
  weekdayOf,
} from "../domain/calendarMath";
import type {
  CalendarMission,
  DateKey,
  Relation,
} from "../domain/types";
import { MISSION_IDS } from "./missions";

export interface ContentIssue {
  readonly code: string;
  readonly message: string;
}

const RELATIONS: readonly Relation[] = [
  "previous-day",
  "next-day",
  "seven-days-after",
  "chronological-order",
  "month-boundary",
];

function collectDateIssues(mission: CalendarMission): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const dates: readonly DateKey[] = [
    mission.anchorDate,
    ...mission.visibleDates,
    ...mission.hiddenDates,
    ...mission.expectedAnswers.flatMap((answer) => [...answer.selectedDates]),
  ];
  for (const date of dates) {
    if (!isValidDateKey(date)) {
      issues.push({
        code: "date-key",
        message: `${mission.id}: 달력에 없는 날짜입니다 (${String(date)}).`,
      });
    }
  }
  return issues;
}

function collectAnswerIssues(mission: CalendarMission): ContentIssue[] {
  const issues: ContentIssue[] = [];
  if (mission.expectedAnswers.length === 0) {
    issues.push({
      code: "expected-answers",
      message: `${mission.id}: 승인된 기대 정답이 최소 1개 있어야 합니다.`,
    });
    return issues;
  }

  for (const [index, expected] of mission.expectedAnswers.entries()) {
    if (!RELATIONS.includes(expected.relation)) {
      issues.push({
        code: "expected-consistency",
        message: `${mission.id}: 알 수 없는 관계입니다 (${expected.relation}).`,
      });
      continue;
    }
    // 구조 검증(달력 파생 규칙 일치)은 대표 정답에만 적용한다.
    // 두 번째 이후 항목은 같은 판정을 받아들이는 복수 해법 표기다.
    const isCanonicalAnswer = index === 0;
    if (!isCanonicalAnswer) continue;
    if (expected.selectedDates.length === 0) {
      issues.push({
        code: "expected-consistency",
        message: `${mission.id}: 기대 정답에 날짜 선택이 없습니다.`,
      });
      continue;
    }

    const anchorWeekday = isValidDateKey(mission.anchorDate)
      ? weekdayOf(mission.anchorDate)
      : null;
    for (const date of expected.selectedDates) {
      if (expected.weekday !== undefined && isValidDateKey(date) && weekdayOf(date) !== expected.weekday) {
        issues.push({
          code: "expected-consistency",
          message: `${mission.id}: 정답 날짜 ${date}의 실제 요일이 승인된 요일(${expected.weekday})과 다릅니다.`,
        });
      }
      if (
        anchorWeekday !== null &&
        isValidDateKey(date) &&
        expected.relation === "seven-days-after" &&
        weekdayOf(date) !== anchorWeekday
      ) {
        issues.push({
          code: "expected-consistency",
          message: `${mission.id}: 7일 관계 정답 ${date}은 기준 날짜와 같은 요일이어야 합니다.`,
        });
      }
    }

    if (expected.relation === "next-day") {
      const baseDates = isValidDateKey(mission.anchorDate)
        ? [mission.anchorDate, ...mission.visibleDates]
        : mission.visibleDates;
      for (const date of expected.selectedDates) {
        if (!isValidDateKey(date)) continue;
        const hasPreviousVisibleCell = baseDates.some(
          (base) => isValidDateKey(base) && diffInDays(base, date) === 1,
        );
        if (!hasPreviousVisibleCell) {
          issues.push({
            code: "expected-consistency",
            message: `${mission.id}: 다음 날 정답 ${date}의 하루 전 칸이 미션 달력에 없습니다.`,
          });
        }
      }
    }

    if (expected.relation === "previous-day") {
      const previous = isValidDateKey(mission.anchorDate) ? epochDay(mission.anchorDate) - 1 : NaN;
      const next = isValidDateKey(mission.anchorDate) ? epochDay(mission.anchorDate) + 1 : NaN;
      const selected = expected.selectedDates.map((date) => (isValidDateKey(date) ? epochDay(date) : NaN));
      const isNeighborPair =
        selected.length === 2 && selected.includes(previous) && selected.includes(next);
      if (!isNeighborPair) {
        issues.push({
          code: "expected-consistency",
          message: `${mission.id}: 어제·내일 정답은 기준 날짜의 실제 전날과 다음 날이어야 합니다.`,
        });
      }
    }

    if (expected.relation === "month-boundary") {
      for (const date of expected.selectedDates) {
        if (isValidDateKey(mission.anchorDate) && isValidDateKey(date)) {
          const diff = diffInDays(mission.anchorDate, date);
          if (diff !== 1) {
            issues.push({
              code: "expected-consistency",
              message: `${mission.id}: 월 경계 정답 ${date}은 기준 날짜의 다음 날이어야 합니다.`,
            });
          }
        }
      }
    }

    if (expected.relation === "chronological-order" && expected.selectedDates.length > 1) {
      for (let index = 1; index < expected.selectedDates.length; index += 1) {
        const earlier = expected.selectedDates[index - 1];
        const later = expected.selectedDates[index];
        if (isValidDateKey(earlier) && isValidDateKey(later) && diffInDays(earlier, later) <= 0) {
          issues.push({
            code: "expected-consistency",
            message: `${mission.id}: 순서 배열 정답은 날짜가 빠른 순서대로 늘어야 합니다 (${earlier} → ${later}).`,
          });
        }
      }
    }
  }

  return issues;
}

export function validateContent(missions: readonly CalendarMission[]): ContentIssue[] {
  const issues: ContentIssue[] = [];

  if (missions.length !== 6) {
    issues.push({
      code: "mission-count",
      message: `미션은 정확히 6개여야 합니다 (현재 ${missions.length}개).`,
    });
  }

  const ids = missions.map((mission) => mission.id);
  const uniqueIds = new Set<MissionIdString>(ids);
  if (uniqueIds.size !== ids.length) {
    issues.push({
      code: "mission-id",
      message: "미션 ID가 중복됩니다.",
    });
  }
  const plannedIds = new Set<string>(MISSION_IDS);
  for (const id of ids) {
    if (!plannedIds.has(id)) {
      issues.push({
        code: "mission-id",
        message: `계획에 없는 미션 ID입니다: ${id}`,
      });
    }
  }

  for (const mission of missions) {
    issues.push(...collectDateIssues(mission));

    const visible = new Set<string>(mission.visibleDates);
    for (const hidden of mission.hiddenDates) {
      if (visible.has(hidden)) {
        issues.push({
          code: "visible-hidden-overlap",
          message: `${mission.id}: 날짜 ${hidden}이 보이는 칸과 숨긴 칸에 동시에 있습니다.`,
        });
      }
    }
    if (!visible.has(mission.anchorDate) && !mission.hiddenDates.includes(mission.anchorDate)) {
      issues.push({
        code: "anchor-universe",
        message: `${mission.id}: 기준 날짜 ${mission.anchorDate}가 미션 달력에 없습니다.`,
      });
    }

    issues.push(...collectAnswerIssues(mission));

    if (mission.reviewStatus !== "approved") {
      issues.push({
        code: "review-status",
        message: `${mission.id}: 검수 상태가 approved가 아닙니다 (${mission.reviewStatus}).`,
      });
    }
    for (const [field, value] of [
      ["sourceNote", mission.sourceNote],
      ["misconceptionGuard", mission.misconceptionGuard],
    ] as const) {
      if (value.length < 9 || !/[가-힣]/.test(value)) {
        issues.push({
          code: "metadata",
          message: `${mission.id}: ${field}가 비어 있거나 한국어 검수 문장이 아닙니다.`,
        });
      }
    }
  }

  return issues;
}

type MissionIdString = CalendarMission["id"];

export function assertContentValid(missions: readonly CalendarMission[]): void {
  const issues = validateContent(missions);
  if (issues.length > 0) {
    const details = issues.map((issue) => `[${issue.code}] ${issue.message}`).join("\n");
    throw new Error(`검수되지 않은 미션 콘텐츠입니다:\n${details}`);
  }
}
