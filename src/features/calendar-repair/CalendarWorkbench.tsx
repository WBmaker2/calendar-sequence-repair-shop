import { useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import { MISSIONS } from "../../content/missions";
import type { CalendarAnswer, CalendarMission, MissionId } from "../../domain/types";
import type { SessionAction, SessionState } from "../../app/sessionReducer";
import FeedbackPanel from "./FeedbackPanel";
import WeekdayStripStage from "./stages/WeekdayStripStage";
import PredictStage from "./stages/PredictStage";
import SelectStage from "./stages/SelectStage";
import RelateStage from "./stages/RelateStage";
import WeekStage from "./stages/WeekStage";
import BoundaryStage from "./stages/BoundaryStage";
import "./workbench.css";

const MISSION_HEADINGS: Record<MissionId, string> = {
  "calendar-gap-01": "빈 칸 예측하기",
  "calendar-week-02": "같은 월요일 찾기",
  "calendar-yesterday-03": "어제·오늘·내일 연결",
  "calendar-after-seven-04": "일주일 뒤 찾기",
  "calendar-order-05": "행사 날짜 순서 배열",
  "calendar-month-06": "다음 달로 이어 주기",
};

const MISSION_INSTRUCTIONS: Record<MissionId, string> = {
  "calendar-gap-01": "9월 첫 주에서 빠진 칸을 날짜와 요일 근거로 복원해요.",
  "calendar-week-02": "같은 요일은 7일 차이로 이어져요. 월요일 두 개를 찾아요.",
  "calendar-yesterday-03": "9월 14일 월요일을 기준으로 어제와 내일을 연결해요.",
  "calendar-after-seven-04": "일주일 뒤에는 같은 요일이 돌아와요.",
  "calendar-order-05": "달력에서 앞쪽 칸일수록 날짜가 빨라요.",
  "calendar-month-06": "한 달이 끝나면 다음 달 1일로 이어져요.",
};

interface CalendarWorkbenchProps {
  readonly state: SessionState;
  readonly dispatch: (action: SessionAction) => void;
}

export default function CalendarWorkbench({ state, dispatch }: CalendarWorkbenchProps) {
  const [retryNonce, setRetryNonce] = useState(0);
  const [repairing, setRepairing] = useState(false);

  const missionIndex = state.missionIndex;
  const record = state.records[missionIndex];
  const responseCount = record?.responses.length ?? 0;

  useEffect(() => {
    setRepairing(false);
  }, [responseCount]);

  if (state.step === "WEEKDAY_STRIP") {
    return (
      <section className="workbench" aria-label="요일 띠 확인 단계">
        <h2 className="workbench-heading">요일 띠 확인</h2>
        <WeekdayStripStage onConfirm={() => dispatch({ type: "CONFIRM_WEEKDAY_STRIP" })} />
      </section>
    );
  }

  const mission: CalendarMission | undefined = MISSIONS[missionIndex];

  if (mission === undefined || record === undefined) {
    return null;
  }

  const evaluation = record.finalEvaluation;
  const isLastMission = missionIndex === MISSIONS.length - 1;
  const nextLabel = isLastMission ? "달력 기록 보기" : "다음으로";

  const handleSubmit = (answer: CalendarAnswer) => {
    dispatch({
      type: "SUBMIT_RESPONSE",
      missionIndex,
      revision: record.responses.length === 0 ? 0 : 1,
      answer,
    });
  };

  const renderStage = () => {
    switch (mission.id) {
      case "calendar-gap-01":
        return <PredictStage mission={mission} onSubmit={handleSubmit} />;
      case "calendar-week-02":
        return <SelectStage mission={mission} onSubmit={handleSubmit} />;
      case "calendar-yesterday-03":
        return <RelateStage mission={mission} onSubmit={handleSubmit} />;
      case "calendar-after-seven-04":
      case "calendar-order-05":
        return <WeekStage mission={mission} onSubmit={handleSubmit} />;
      case "calendar-month-06":
        return <BoundaryStage mission={mission} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <section className="workbench" aria-label={`${MISSION_HEADINGS[mission.id]} 단계`}>
      <header className="workbench-header">
        <p className="workbench-mission-count">
          미션 {missionIndex + 1} / {MISSIONS.length}
        </p>
        <h2 className="workbench-heading">{MISSION_HEADINGS[mission.id]}</h2>
        <p className="workbench-instruction">{MISSION_INSTRUCTIONS[mission.id]}</p>
      </header>

      <div
        key={retryNonce}
        className={record.completed ? "workbench-stage is-locked" : "workbench-stage"}
      >
        {renderStage()}
      </div>

      {evaluation !== null && !repairing ? (
        <FeedbackPanel
          evaluation={evaluation}
          canRepair={!record.completed && !evaluation.accepted}
          onRetry={() => {
            setRepairing(true);
            setRetryNonce((nonce) => nonce + 1);
          }}
          onNext={() => dispatch({ type: "NEXT" })}
          nextLabel={nextLabel}
        />
      ) : null}

      <footer className="workbench-footer">
        <ActionButton variant="ghost" onClick={() => dispatch({ type: "BACK" })}>
          뒤로 가기
        </ActionButton>
        <p className="workbench-refresh-note">새로고침하면 응답이 사라져요.</p>
      </footer>
    </section>
  );
}
