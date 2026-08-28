import { useState } from "react";
import ActionButton from "../../../components/ActionButton";
import { formatKoreanDate } from "../../../domain/calendarMath";
import type { CalendarAnswer, CalendarMission, DateKey } from "../../../domain/types";
import { shortDateLabel } from "../calendarCells";

interface RelateStageProps {
  readonly mission: CalendarMission;
  readonly onSubmit: (answer: CalendarAnswer) => void;
}

export default function RelateStage({ mission, onSubmit }: RelateStageProps) {
  const [yesterday, setYesterday] = useState<DateKey | null>(null);
  const [tomorrow, setTomorrow] = useState<DateKey | null>(null);

  const choices = mission.visibleDates.filter((date) => date !== mission.anchorDate);

  const canSubmit = yesterday !== null && tomorrow !== null;

  const handleSubmit = () => {
    if (yesterday === null || tomorrow === null) return;
    const answer: CalendarAnswer = {
      selectedDates: [yesterday, tomorrow].sort(),
      relation: "previous-day",
    };
    onSubmit(answer);
  };

  return (
    <div className="relate-stage">
      <div className="relate-anchor" aria-label={`오늘 기준: ${formatKoreanDate(mission.anchorDate)}`}>
        <span className="relate-anchor-label">오늘</span>
        <span className="relate-anchor-date">{shortDateLabel(mission.anchorDate)}</span>
      </div>

      <div role="group" aria-label="어제 고르기" className="choice-group">
        <p className="choice-question">어제는 언제일까요?</p>
        <div className="choice-buttons">
          {choices.map((choice) => (
            <button
              key={choice}
              type="button"
              className="choice-button"
              aria-pressed={yesterday === choice}
              aria-label={`어제: ${shortDateLabel(choice)}`}
              onClick={() => setYesterday(choice)}
            >
              {shortDateLabel(choice)}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label="내일 고르기" className="choice-group">
        <p className="choice-question">내일은 언제일까요?</p>
        <div className="choice-buttons">
          {choices.map((choice) => (
            <button
              key={choice}
              type="button"
              className="choice-button"
              aria-pressed={tomorrow === choice}
              aria-label={`내일: ${shortDateLabel(choice)}`}
              onClick={() => setTomorrow(choice)}
            >
              {shortDateLabel(choice)}
            </button>
          ))}
        </div>
      </div>

      {canSubmit ? (
        <p className="stage-preview">
          어제 {shortDateLabel(yesterday)} · 오늘 {shortDateLabel(mission.anchorDate)} · 내일{" "}
          {shortDateLabel(tomorrow)}
        </p>
      ) : null}

      <ActionButton variant="primary" pulse disabled={!canSubmit} onClick={handleSubmit}>
        관계 완성
      </ActionButton>
    </div>
  );
}
