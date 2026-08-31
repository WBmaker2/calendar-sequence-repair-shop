import { useEffect, useReducer, useRef } from "react";
import { initialSessionState, sessionReducer } from "./sessionReducer";
import type { SessionStep } from "../domain/types";
import EntranceScreen from "../features/calendar-repair/EntranceScreen";
import CalendarWorkbench from "../features/calendar-repair/CalendarWorkbench";
import LearningReport from "../features/report/LearningReport";
import ProgressSteps from "../components/ProgressSteps";
import UpdateHistoryButton from "../components/UpdateHistoryButton";
import AccessibilityToolbar from "../accessibility/AccessibilityToolbar";
import ErrorBoundary from "./ErrorBoundary";
import "../styles/tokens.css";
import "../styles/components.css";
import "../styles/app.css";
import "../styles/surfaces.css";
import "../styles/motion.css";

const FLOW_ORDER: readonly SessionStep[] = [
  "WEEKDAY_STRIP",
  "PREDICT",
  "SELECT",
  "RELATE",
  "WEEK",
  "BOUNDARY",
  "REPORT",
];

export default function App() {
  const [state, dispatch] = useReducer(sessionReducer, undefined, initialSessionState);
  const mainContentRef = useRef<HTMLElement>(null);
  const previousStepRef = useRef<SessionStep | null>(null);
  const { step } = state;

  useEffect(() => {
    const previousStep = previousStepRef.current;
    previousStepRef.current = step;
    if (previousStep === null || previousStep === step) return;

    const main = mainContentRef.current;
    if (!main) return;
    main.focus({ preventScroll: true });
    if (typeof main.scrollIntoView === "function") {
      main.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [step]);

  const progressIndex = FLOW_ORDER.indexOf(step);

  const renderStep = () => {
    if (step === "INTRO") {
      return <EntranceScreen onStart={() => dispatch({ type: "START_SESSION" })} />;
    }
    if (step === "REPORT") {
      return <LearningReport state={state} dispatch={dispatch} />;
    }
    return <CalendarWorkbench state={state} dispatch={dispatch} />;
  };

  return (
    <ErrorBoundary onRestart={() => dispatch({ type: "RESTART_CONFIRMED" })}>
      <div className="app-shell">
        <a className="skip-link" href="#main-content">
          활동으로 건너뛰기
        </a>
        <header className="app-header">
          <div className="app-brand">
            <p className="app-eyebrow">2026년 9월 · 탐구형 달력 학습</p>
            <h1 className="app-title">달력 순서 복원소</h1>
          </div>
          <div className="app-header-tools">
            <AccessibilityToolbar />
            <UpdateHistoryButton />
          </div>
        </header>

        {progressIndex >= 0 ? <ProgressSteps currentIndex={progressIndex} /> : null}

        <main ref={mainContentRef} id="main-content" tabIndex={-1} className="app-main">
          {renderStep()}
        </main>

        <footer className="app-footer">
          <p>2026년 9월 실제 달력으로 연습해요 · 응답은 저장·전송되지 않아요</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
