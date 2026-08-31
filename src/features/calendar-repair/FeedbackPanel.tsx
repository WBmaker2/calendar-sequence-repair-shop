import { useEffect, useRef } from "react";
import ActionButton from "../../components/ActionButton";
import { formatKoreanDate } from "../../domain/calendarMath";
import type { CalendarEvaluation } from "../../domain/types";

interface FeedbackPanelProps {
  readonly evaluation: CalendarEvaluation;
  readonly canRepair: boolean;
  readonly onRetry: () => void;
  readonly onNext: () => void;
  readonly nextLabel: string;
}

export default function FeedbackPanel({
  evaluation,
  canRepair,
  onRetry,
  onNext,
  nextLabel,
}: FeedbackPanelProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    title.focus();
    if (typeof title.scrollIntoView === "function") {
      title.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [evaluation]);

  if (evaluation.accepted) {
    return (
      <div className="feedback-panel is-success" role="status">
        <h3 ref={titleRef} tabIndex={-1} className="feedback-title">
          좋아요! 달력 근거를 찾았어요.
        </h3>
        <ul className="feedback-evidence">
          {evaluation.evidenceKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
        <ActionButton variant="primary" onClick={onNext}>
          {nextLabel}
        </ActionButton>
      </div>
    );
  }

  if (canRepair) {
    return (
      <div className="feedback-panel is-retry" role="status">
        <h3 ref={titleRef} tabIndex={-1} className="feedback-title">
          근거를 다시 확인해 볼까요?
        </h3>
        <ul className="feedback-evidence">
          {evaluation.evidenceKeys.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
        <ActionButton variant="secondary" onClick={onRetry}>
          다시 고치기
        </ActionButton>
      </div>
    );
  }

  return (
    <div className="feedback-panel is-recorded" role="status">
      <h3 ref={titleRef} tabIndex={-1} className="feedback-title">
        수정 결과를 기록했어요.
      </h3>
      <ul className="feedback-evidence">
        {evaluation.evidenceKeys.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
      <p className="feedback-dates-label">근거가 되는 날짜</p>
      <ul className="feedback-dates">
        {evaluation.evidenceDates.map((date) => (
          <li key={date}>{formatKoreanDate(date)}</li>
        ))}
      </ul>
      <ActionButton variant="primary" onClick={onNext}>
        {nextLabel}
      </ActionButton>
    </div>
  );
}
