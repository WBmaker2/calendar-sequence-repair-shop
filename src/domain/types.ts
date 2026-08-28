export type MissionId =
  | "calendar-gap-01"
  | "calendar-week-02"
  | "calendar-yesterday-03"
  | "calendar-after-seven-04"
  | "calendar-order-05"
  | "calendar-month-06";

/** zero-padded `YYYY-MM-DD` 문자열만 유효하다. 런타임 검증은 isValidDateKey가 담당한다. */
export type DateKey = `${number}-${number}-${number}`;

export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type Relation =
  | "previous-day"
  | "next-day"
  | "seven-days-after"
  | "chronological-order"
  | "month-boundary";

export interface CalendarCell {
  readonly date: DateKey;
  readonly day: number;
  readonly weekday: Weekday;
  readonly inCurrentMonth: boolean;
}

export interface CalendarAnswer {
  readonly selectedDates: readonly DateKey[];
  readonly relation: Relation;
  readonly weekday?: Weekday;
}

export interface CalendarMission {
  readonly id: MissionId;
  readonly anchorDate: DateKey;
  readonly visibleDates: readonly DateKey[];
  readonly hiddenDates: readonly DateKey[];
  readonly expectedAnswers: readonly CalendarAnswer[];
  readonly sourceNote: string;
  readonly reviewStatus: "pending" | "approved";
  readonly misconceptionGuard: string;
}

export interface CalendarEvaluation {
  readonly accepted: boolean;
  readonly expectedRelation: Relation;
  readonly evidenceDates: readonly DateKey[];
  readonly evidenceKeys: readonly string[];
}

export type SessionStep =
  | "INTRO"
  | "WEEKDAY_STRIP"
  | "PREDICT"
  | "SELECT"
  | "RELATE"
  | "WEEK"
  | "BOUNDARY"
  | "REPORT";
