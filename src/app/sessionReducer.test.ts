import { correctAnswer, initialSessionState, sessionReducer, wrongAnswer } from "./sessionReducer";
import type { SessionState } from "./sessionReducer";

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const key of Object.keys(value as object)) {
      deepFreeze((value as Record<string, unknown>)[key]);
    }
    Object.freeze(value);
  }
  return value;
}

function driveToStep(step: SessionState["step"], state = initialSessionState()): SessionState {
  let current = state;
  current = sessionReducer(current, { type: "START_SESSION" });
  if (step === "WEEKDAY_STRIP") return current;
  current = sessionReducer(current, { type: "CONFIRM_WEEKDAY_STRIP" });
  if (step === "PREDICT") return current;

  const answers: readonly (readonly [number, 0 | 1])[] = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ];
  for (const [missionIndex, revision] of answers) {
    if (current.step === step && current.missionIndex === answers[missionIndex]?.[0]) break;
    if (current.step !== step) {
      current = sessionReducer(current, {
        type: "SUBMIT_RESPONSE",
        missionIndex,
        revision,
        answer: correctAnswer(missionIndex),
      });
      current = sessionReducer(current, { type: "NEXT" });
    }
    if (current.step === step) return current;
  }
  return current;
}

describe("초기 상태", () => {
  it("입구에서 시작하고 6개 미션 기록이 비어 있다", () => {
    const state = initialSessionState();
    expect(state.step).toBe("INTRO");
    expect(state.missionIndex).toBe(-1);
    expect(state.records).toHaveLength(6);
    for (const record of state.records) {
      expect(record.responses).toEqual([]);
      expect(record.completed).toBe(false);
    }
    expect(state.finished).toBe(false);
    expect(state.weekdayStripConfirmed).toBe(false);
  });

  it("알 수 없는 action은 상태를 바꾸지 않는다", () => {
    const state = initialSessionState();
    const unknown = { type: "TIME_TRAVEL" } as unknown as Parameters<typeof sessionReducer>[1];
    expect(sessionReducer(state, unknown)).toBe(state);
  });
});

describe("단계 전이 잠금", () => {
  it("입구에서만 시작할 수 있다", () => {
    const state = initialSessionState();
    const started = sessionReducer(state, { type: "START_SESSION" });
    expect(started.step).toBe("WEEKDAY_STRIP");
    expect(sessionReducer(started, { type: "START_SESSION" })).toBe(started);
  });

  it("요일 띠 확인은 요일 띠 단계에서만 통과한다", () => {
    const started = sessionReducer(initialSessionState(), { type: "START_SESSION" });
    const confirmed = sessionReducer(started, { type: "CONFIRM_WEEKDAY_STRIP" });
    expect(confirmed.step).toBe("PREDICT");
    expect(confirmed.missionIndex).toBe(0);
    expect(confirmed.weekdayStripConfirmed).toBe(true);
    expect(sessionReducer(confirmed, { type: "CONFIRM_WEEKDAY_STRIP" })).toBe(confirmed);
  });

  it("필수 응답 없이는 다음 단계로 가지 않는다", () => {
    const predict = driveToStep("PREDICT");
    expect(sessionReducer(predict, { type: "NEXT" })).toBe(predict);
  });
});

describe("응답 제출 잠금", () => {
  it("범위를 벗어난 missionIndex 제출은 무시한다", () => {
    const predict = driveToStep("PREDICT");
    const next = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 9,
      revision: 0,
      answer: correctAnswer(0),
    });
    expect(next).toBe(predict);

    const negative = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: -1,
      revision: 0,
      answer: correctAnswer(0),
    });
    expect(negative).toBe(predict);
  });

  it("현재 미션이 아닌 제출은 무시한다", () => {
    const predict = driveToStep("PREDICT");
    const next = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 1,
      revision: 0,
      answer: correctAnswer(1),
    });
    expect(next).toBe(predict);
  });

  it("이전 revision 응답은 상태를 바꾸지 않는다", () => {
    const predict = driveToStep("PREDICT");
    const stale = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 1,
      answer: correctAnswer(0),
    });
    expect(stale).toBe(predict);

    const submitted = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: correctAnswer(0),
    });
    const replay = sessionReducer(submitted, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: correctAnswer(0),
    });
    expect(replay).toBe(submitted);
  });
});

describe("정답·수정 흐름", () => {
  it("첫 제출이 정답이면 완료되고 다음 미션으로 진행한다", () => {
    const predict = driveToStep("PREDICT");
    const submitted = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: correctAnswer(0),
    });
    const record = submitted.records[0];
    expect(record?.completed).toBe(true);
    expect(record?.firstEvaluation?.accepted).toBe(true);
    expect(record?.finalEvaluation?.accepted).toBe(true);

    const next = sessionReducer(submitted, { type: "NEXT" });
    expect(next.step).toBe("SELECT");
    expect(next.missionIndex).toBe(1);
  });

  it("오답 뒤 한 번의 수정 기회를 주고 수정 결과를 기록한다", () => {
    const predict = driveToStep("PREDICT");
    const wrongFirst = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: wrongAnswer(0),
    });
    expect(wrongFirst.records[0]?.firstEvaluation?.accepted).toBe(false);
    expect(wrongFirst.records[0]?.completed).toBe(false);
    expect(sessionReducer(wrongFirst, { type: "NEXT" })).toBe(wrongFirst);

    const repaired = sessionReducer(wrongFirst, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 1,
      answer: correctAnswer(0),
    });
    expect(repaired.records[0]?.completed).toBe(true);
    expect(repaired.records[0]?.responses).toHaveLength(2);
    expect(repaired.records[0]?.responses[1]?.evaluation.accepted).toBe(true);
  });

  it("수정 기회를 모두 쓰면 결과를 기록하고 진행을 허용한다", () => {
    const predict = driveToStep("PREDICT");
    const wrongFirst = sessionReducer(predict, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: wrongAnswer(0),
    });
    const wrongRepair = sessionReducer(wrongFirst, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 1,
      answer: wrongAnswer(0),
    });
    expect(wrongRepair.records[0]?.completed).toBe(true);
    expect(wrongRepair.records[0]?.finalEvaluation?.accepted).toBe(false);

    const thirdTry = sessionReducer(wrongRepair, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      // 계약 밖 revision도 런타임에서 거부되는지 확인한다.
      revision: 2 as 0 | 1,
      answer: correctAnswer(0),
    });
    expect(thirdTry).toBe(wrongRepair);
  });
});

describe("전체 학습 흐름", () => {
  it("여섯 미션을 마치면 기록 단계에 도착한다", () => {
    let state = initialSessionState();
    state = sessionReducer(state, { type: "START_SESSION" });
    state = sessionReducer(state, { type: "CONFIRM_WEEKDAY_STRIP" });
    const steps: SessionState["step"][] = [
      "PREDICT",
      "SELECT",
      "RELATE",
      "WEEK",
      "WEEK",
      "BOUNDARY",
    ];
    for (const [index, expectedStep] of steps.entries()) {
      expect(state.step).toBe(expectedStep);
      expect(state.missionIndex).toBe(index);
      state = sessionReducer(state, {
        type: "SUBMIT_RESPONSE",
        missionIndex: index,
        revision: 0,
        answer: correctAnswer(index),
      });
      state = sessionReducer(state, { type: "NEXT" });
    }
    expect(state.step).toBe("REPORT");
    expect(state.finished).toBe(true);
  });

  it("기록 단계에서는 응답과 뒤로 가기가 잠긴다", () => {
    const report = driveToStep("REPORT");
    const locked = sessionReducer(report, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: correctAnswer(0),
    });
    expect(sessionReducer(locked, { type: "BACK" })).toBe(locked);
    expect(sessionReducer(locked, { type: "NEXT" })).toBe(locked);
  });
});

describe("뒤로 가기와 다시 시작", () => {
  it("뒤로 가도 응답을 보존한다", () => {
    const select = driveToStep("SELECT");
    const back = sessionReducer(select, { type: "BACK" });
    expect(back.step).toBe("PREDICT");
    expect(back.missionIndex).toBe(0);
    expect(back.records[0]?.completed).toBe(true);

    const forwardAgain = sessionReducer(back, { type: "NEXT" });
    expect(forwardAgain.step).toBe("SELECT");
    expect(forwardAgain.missionIndex).toBe(1);
    expect(forwardAgain.records[0]?.completed).toBe(true);
  });

  it("뒤로 가면 완료하지 못한 단계의 마지막 미션으로 돌아간다", () => {
    let state = initialSessionState();
    state = sessionReducer(state, { type: "START_SESSION" });
    state = sessionReducer(state, { type: "CONFIRM_WEEKDAY_STRIP" });
    state = sessionReducer(state, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: correctAnswer(0),
    });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "BACK" });
    state = sessionReducer(state, { type: "BACK" });
    expect(state.step).toBe("WEEKDAY_STRIP");

    const reconfirmed = sessionReducer(state, { type: "CONFIRM_WEEKDAY_STRIP" });
    expect(reconfirmed.step).toBe("PREDICT");
    expect(reconfirmed.missionIndex).toBe(0);
    expect(reconfirmed.records[0]?.completed).toBe(true);
  });

  it("다시 시작하면 초기 상태를 새 객체로 만든다", () => {
    const report = driveToStep("REPORT");
    const restarted = sessionReducer(report, { type: "RESTART_CONFIRMED" });
    expect(restarted.step).toBe("INTRO");
    expect(restarted.finished).toBe(false);
    expect(restarted).not.toBe(report);
    expect(restarted.records[0]?.responses).toEqual([]);
  });
});

describe("불변성", () => {
  it("이전 상태를 변경하지 않는다", () => {
    const frozen = deepFreeze(initialSessionState());
    const started = sessionReducer(frozen, { type: "START_SESSION" });
    expect(started.step).toBe("WEEKDAY_STRIP");
    expect(frozen.step).toBe("INTRO");
    expect(started).not.toBe(frozen);
    // 변경되지 않은 데이터는 참조가 공유된다(복사·변경 없음).
    expect(started.records).toBe(frozen.records);
    expect(frozen.records[0]?.responses).toEqual([]);
  });
});
