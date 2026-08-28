import { MISSIONS } from "../content/missions";
import { evaluateCalendarRepair } from "../domain/calendarMath";
import type {
  CalendarAnswer,
  CalendarEvaluation,
  MissionId,
  SessionStep,
} from "../domain/types";

export const MISSION_STEPS: Record<MissionId, SessionStep> = {
  "calendar-gap-01": "PREDICT",
  "calendar-week-02": "SELECT",
  "calendar-yesterday-03": "RELATE",
  "calendar-after-seven-04": "WEEK",
  "calendar-order-05": "WEEK",
  "calendar-month-06": "BOUNDARY",
};

const STEP_ORDER: readonly SessionStep[] = [
  "INTRO",
  "WEEKDAY_STRIP",
  "PREDICT",
  "SELECT",
  "RELATE",
  "WEEK",
  "BOUNDARY",
  "REPORT",
];

const MISSION_STEP_VALUES = new Set<SessionStep>(Object.values(MISSION_STEPS));

export interface SessionResponse {
  readonly revision: 0 | 1;
  readonly answer: CalendarAnswer;
  readonly evaluation: CalendarEvaluation;
}

export interface MissionRecord {
  readonly missionId: MissionId;
  readonly responses: readonly SessionResponse[];
  readonly firstEvaluation: CalendarEvaluation | null;
  readonly finalEvaluation: CalendarEvaluation | null;
  readonly completed: boolean;
}

export interface SessionState {
  readonly step: SessionStep;
  readonly missionIndex: number;
  readonly records: readonly MissionRecord[];
  readonly weekdayStripConfirmed: boolean;
  readonly finished: boolean;
}

export type SessionAction =
  | { type: "START_SESSION" }
  | { type: "CONFIRM_WEEKDAY_STRIP" }
  | {
      type: "SUBMIT_RESPONSE";
      missionIndex: number;
      revision: 0 | 1;
      answer: CalendarAnswer;
    }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "RESTART_CONFIRMED" };

export function initialSessionState(): SessionState {
  return {
    step: "INTRO",
    missionIndex: -1,
    records: MISSIONS.map((mission) => ({
      missionId: mission.id,
      responses: [],
      firstEvaluation: null,
      finalEvaluation: null,
      completed: false,
    })),
    weekdayStripConfirmed: false,
    finished: false,
  };
}

function expectedRevision(record: MissionRecord): 0 | 1 | null {
  if (record.completed) return null;
  if (record.responses.length === 0) return 0;
  const first = record.responses[0];
  if (record.responses.length === 1 && first && !first.evaluation.accepted) return 1;
  return null;
}

export function correctAnswer(missionIndex: number): CalendarAnswer {
  const mission = MISSIONS[missionIndex];
  const canonical = mission?.expectedAnswers[0];
  if (!mission || !canonical) {
    throw new Error(`승인된 정답이 없는 미션입니다: ${String(mission?.id ?? missionIndex)}`);
  }
  return canonical;
}

/** 테스트와 수정-기회 시연용 오답 예시. 판정은 항상 evaluateCalendarRepair가 수행한다. */
export function wrongAnswer(missionIndex: number): CalendarAnswer {
  const id = MISSIONS[missionIndex]?.id;
  switch (id) {
    case "calendar-gap-01":
      return { selectedDates: ["2026-09-04"], relation: "next-day", weekday: "Friday" };
    case "calendar-week-02":
      return {
        selectedDates: ["2026-09-07", "2026-09-09"],
        relation: "seven-days-after",
        weekday: "Monday",
      };
    case "calendar-yesterday-03":
      return { selectedDates: ["2026-09-12", "2026-09-16"], relation: "previous-day" };
    case "calendar-after-seven-04":
      return { selectedDates: ["2026-09-14"], relation: "seven-days-after", weekday: "Tuesday" };
    case "calendar-order-05":
      return {
        selectedDates: ["2026-09-12", "2026-09-05", "2026-09-21"],
        relation: "chronological-order",
      };
    case "calendar-month-06":
      return { selectedDates: ["2026-09-30"], relation: "month-boundary", weekday: "Wednesday" };
    default:
      throw new Error(`오답 예시가 정의되지 않은 미션입니다: ${String(id)}`);
  }
}

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case "START_SESSION": {
      if (state.step !== "INTRO") return state;
      return { ...state, step: "WEEKDAY_STRIP" };
    }
    case "CONFIRM_WEEKDAY_STRIP": {
      if (state.step !== "WEEKDAY_STRIP") return state;
      return { ...state, step: "PREDICT", missionIndex: 0, weekdayStripConfirmed: true };
    }
    case "SUBMIT_RESPONSE": {
      if (!MISSION_STEP_VALUES.has(state.step)) return state;
      const { missionIndex, revision, answer } = action;
      if (missionIndex !== state.missionIndex) return state;
      if (missionIndex < 0 || missionIndex >= MISSIONS.length) return state;
      const record = state.records[missionIndex];
      if (!record || expectedRevision(record) !== revision) return state;
      const evaluation = evaluateCalendarRepair(MISSIONS[missionIndex], answer);
      const response: SessionResponse = { revision, answer, evaluation };
      const updatedRecord: MissionRecord = {
        ...record,
        responses: [...record.responses, response],
        firstEvaluation: revision === 0 ? evaluation : record.firstEvaluation,
        finalEvaluation: evaluation,
        completed: evaluation.accepted || record.responses.length + 1 >= 2,
      };
      return {
        ...state,
        records: state.records.map((candidate, index) =>
          index === missionIndex ? updatedRecord : candidate,
        ),
      };
    }
    case "NEXT": {
      if (!MISSION_STEP_VALUES.has(state.step)) return state;
      const currentRecord = state.records[state.missionIndex];
      if (!currentRecord?.completed) return state;
      let nextIndex = -1;
      for (let index = state.missionIndex + 1; index < state.records.length; index += 1) {
        const candidate = state.records[index];
        if (candidate && !candidate.completed) {
          nextIndex = index;
          break;
        }
      }
      if (nextIndex === -1) {
        return { ...state, step: "REPORT", missionIndex: -1, finished: true };
      }
      const nextMission = MISSIONS[nextIndex];
      return {
        ...state,
        step: MISSION_STEPS[nextMission.id],
        missionIndex: nextIndex,
      };
    }
    case "BACK": {
      if (!MISSION_STEP_VALUES.has(state.step)) return state;
      const currentIndex = STEP_ORDER.indexOf(state.step);
      const previousStep = STEP_ORDER[currentIndex - 1];
      if (!previousStep) return state;
      let lastMissionOfPrevious = -1;
      MISSIONS.forEach((mission, index) => {
        if (MISSION_STEPS[mission.id] === previousStep) {
          lastMissionOfPrevious = index;
        }
      });
      return {
        ...state,
        step: previousStep,
        missionIndex: lastMissionOfPrevious === -1 ? state.missionIndex : lastMissionOfPrevious,
      };
    }
    case "RESTART_CONFIRMED": {
      return initialSessionState();
    }
    default: {
      return state;
    }
  }
}
