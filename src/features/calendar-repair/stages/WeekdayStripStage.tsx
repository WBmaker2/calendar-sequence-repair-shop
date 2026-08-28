import { useState } from "react";
import ActionButton from "../../../components/ActionButton";
import { WEEKDAY_KO, WEEKDAY_ORDER } from "../calendarCells";

interface WeekdayStripStageProps {
  readonly onConfirm: () => void;
}

export default function WeekdayStripStage({ onConfirm }: WeekdayStripStageProps) {
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const done = progress === WEEKDAY_ORDER.length;

  const handleClick = (index: number) => {
    if (index === progress) {
      setProgress(index + 1);
      setShowHint(false);
      return;
    }
    setShowHint(true);
  };

  return (
    <div className="weekday-strip">
      <p className="stage-lead">
        요일은 일요일부터 토요일까지 순서대로 돌아와요. 차례대로 눌러 확인해요.
      </p>
      <div className="weekday-strip-buttons" role="group" aria-label="요일 띠 순서 확인">
        {WEEKDAY_ORDER.map((weekday, index) => (
          <button
            key={weekday}
            type="button"
            className={index < progress ? "weekday-strip-button is-lit" : "weekday-strip-button"}
            aria-pressed={index < progress}
            onClick={() => handleClick(index)}
          >
            {WEEKDAY_KO[weekday]}
          </button>
        ))}
      </div>
      {showHint ? (
        <p className="stage-hint" role="status">
          일요일부터 차례대로 눌러 주세요.
        </p>
      ) : null}
      <ActionButton variant="primary" disabled={!done} onClick={onConfirm}>
        요일 띠 확인했어요
      </ActionButton>
    </div>
  );
}
