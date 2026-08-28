import { useEffect, useReducer, useRef } from "react";
import { initialSessionState, sessionReducer } from "./sessionReducer";
import type { SessionStep } from "../domain/types";
import EntranceScreen from "../features/calendar-repair/EntranceScreen";
import CalendarWorkbench from "../features/calendar-repair/CalendarWorkbench";
import ProgressSteps from "../components/ProgressSteps";
import UpdateHistoryButton from "../components/UpdateHistoryButton";
import AccessibilityToolbar from "../accessibility/AccessibilityToolbar";
import ErrorBoundary from "./ErrorBoundary";
import "../styles/tokens.css";
import "../styles/app.css";

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
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const { step } = state;

  useEffect(() => {
    const heading = mainHeadingRef.current;
    if (!heading) return;
    heading.focus();
    if (typeof heading.scrollIntoView === "function") {
      heading.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [step]);

  const progressIndex = FLOW_ORDER.indexOf(step);

  const renderStep = () => {
    if (step === "INTRO") {
      return <EntranceScreen onStart={() => dispatch({ type: "START_SESSION" })} />;
    }
    if (step === "REPORT") {
      return (
        <section className="step-placeholder" aria-labelledby="report-placeholder-heading">
          <h2 id="report-placeholder-heading">달력 기록</h2>
          <p>복원한 달력 기록을 정리하는 화면이에요. 새로고침하면 응답이 사라져요.</p>
        </section>
      );
    }
    return <CalendarWorkbench state={state} dispatch={dispatch} />;
  };

  return (
    <ErrorBoundary onRestart={() => dispatch({ type: "RESTART_CONFIRMED" })}>
      <div className="app-shell">
        <header className="app-header">
          <h1 ref={mainHeadingRef} tabIndex={-1} className="app-title">
            달력 순서 복원소
          </h1>
          <div className="app-header-tools">
            <AccessibilityToolbar />
            <UpdateHistoryButton />
          </div>
        </header>

        {progressIndex >= 0 ? <ProgressSteps currentIndex={progressIndex} /> : null}

        <main className="app-main">{renderStep()}</main>

        <footer className="app-footer">
          <p>2026년 9월 실제 달력으로 연습해요 · 응답은 저장·전송되지 않아요</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
