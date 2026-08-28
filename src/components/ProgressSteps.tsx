export const FLOW_STEPS = [
  "요일 띠 확인",
  "빈 칸 예측",
  "달력 칸 선택",
  "관계 카드",
  "일주일 관계",
  "월 경계",
  "달력 기록",
] as const;

interface ProgressStepsProps {
  readonly currentIndex: number;
}

export default function ProgressSteps({ currentIndex }: ProgressStepsProps) {
  return (
    <nav className="progress-steps" aria-label="학습 진도">
      <ol>
        {FLOW_STEPS.map((label, index) => {
          const stateClass =
            index === currentIndex ? "is-current" : index < currentIndex ? "is-done" : "";
          return (
            <li key={label} className={stateClass} aria-current={index === currentIndex ? "step" : undefined}>
              <span className="progress-index" aria-hidden="true">
                {index < currentIndex ? "✓" : index + 1}
              </span>
              <span className="progress-label">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
