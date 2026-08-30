import { useEffect, useState } from "react";
import ActionButton from "../../components/ActionButton";
import { MISSIONS } from "../../content/missions";
import type { CalendarAnswer, CalendarMission } from "../../domain/types";
import type { SessionAction, SessionState } from "../../app/sessionReducer";
import { MISSION_HEADINGS, MISSION_INSTRUCTIONS } from "./missionNames";
import FeedbackPanel from "./FeedbackPanel";
import WeekdayStripStage from "./stages/WeekdayStripStage";
import PredictStage from "./stages/PredictStage";
import SelectStage from "./stages/SelectStage";
import RelateStage from "./stages/RelateStage";
import WeekStage from "./stages/WeekStage";
import BoundaryStage from "./stages/BoundaryStage";
import "./workbench.css";

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
        <header className="workbench-header">
          <p className="workbench-mission-count">준비 단계 · 1 / 7</p>
          <h2 className="workbench-heading">요일 띠 확인</h2>
          <p className="workbench-instruction">달력을 읽기 전에 요일이 돌아오는 순서를 살펴봐요.</p>
        </header>
        <div className="workbench-stage">
          <WeekdayStripStage onConfirm={() => dispatch({ type: "CONFIRM_WEEKDAY_STRIP" })} />
        </div>
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
