import { useState } from "react";
import ActionButton from "../../components/ActionButton";
import ModalDialog from "../../components/ModalDialog";
import { MISSIONS } from "../../content/missions";
import { formatKoreanDate } from "../../domain/calendarMath";
import type { MissionId } from "../../domain/types";
import type { MissionRecord, SessionAction, SessionState } from "../../app/sessionReducer";
import { MISSION_HEADINGS } from "../calendar-repair/missionNames";
import "./print.css";

interface LearningReportProps {
  readonly state: SessionState;
  readonly dispatch: (action: SessionAction) => void;
}

function firstJudgmentLabel(record: MissionRecord): string {
  const first = record.firstEvaluation;
  if (!first) return "진행하지 않았어요";
  return first.accepted ? "첫 시도에서 통과" : "다시 확인했어요";
}

function repairResultLabel(record: MissionRecord): string {
  if (record.responses.length === 0) return "—";
  if (record.responses.length === 1) {
    return record.finalEvaluation?.accepted ? "한 번에 복원" : "한 번 확인 후 기록";
  }
  return record.finalEvaluation?.accepted ? "다시 고쳐서 통과" : "다시 고쳤지만 근거 확인 필요";
}

export default function LearningReport({ state, dispatch }: LearningReportProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="report" aria-labelledby="report-heading">
      <header className="report-header">
        <h2 id="report-heading">오늘 복원한 달력 기록</h2>
        <p className="report-note">새로고침하면 이 기록이 모두 사라져요. 지켜 보고 싶으면 인쇄해요.</p>
      </header>

      <ol className="report-records" aria-label="미션별 달력 기록">
        {MISSIONS.map((mission, index) => {
          const record = state.records[index];
          if (!record) return null;
          return (
            <li key={mission.id} className="report-record">
              <h3>
                미션 {index + 1} · {MISSION_HEADINGS[mission.id as MissionId]}
              </h3>
              <dl className="report-fields">
                <div>
                  <dt>최초 판단</dt>
                  <dd>{firstJudgmentLabel(record)}</dd>
                </div>
                <div>
                  <dt>사용한 근거</dt>
                  <dd>
                    {record.finalEvaluation ? (
                      <ul className="report-evidence">
                        {record.finalEvaluation.evidenceKeys.map((key) => (
                          <li key={key}>{key}</li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
                <div>
                  <dt>수정 결과</dt>
                  <dd>{repairResultLabel(record)}</dd>
                </div>
                {record.responses.length >= 2 && !record.finalEvaluation?.accepted ? (
                  <div>
                    <dt>근거가 되는 날짜</dt>
                    <dd>
                      <ul className="report-evidence">
                        {(record.finalEvaluation?.evidenceDates ?? []).map((date) => (
                          <li key={date}>{formatKoreanDate(date)}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </li>
          );
        })}
      </ol>

      <div className="report-controls no-print">
        <ActionButton variant="primary" onClick={handlePrint}>
          결과 인쇄
        </ActionButton>
        <ActionButton variant="secondary" onClick={() => setConfirmOpen(true)}>
          처음부터 다시 하기
        </ActionButton>
      </div>

      <p className="report-limit">
        이 앱은 2026년 9월 연습 달력을 다루는 교육 모형이며 실제 세계 전체를 보장하지 않아요.
      </p>

      <ModalDialog open={confirmOpen} title="처음부터 다시 할까요?" onClose={() => setConfirmOpen(false)}>
        <p>지금까지의 응답과 근거 기록이 모두 사라져요.</p>
        <div className="report-confirm-actions">
          <ActionButton variant="primary" onClick={() => dispatch({ type: "RESTART_CONFIRMED" })}>
            네, 처음부터 할게요
          </ActionButton>
          <ActionButton variant="secondary" onClick={() => setConfirmOpen(false)}>
            계속 기록 볼게요
          </ActionButton>
        </div>
      </ModalDialog>
    </section>
  );
}
