import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { correctAnswer, initialSessionState, sessionReducer, wrongAnswer } from "../../app/sessionReducer";
import type { SessionState } from "../../app/sessionReducer";
import LearningReport from "./LearningReport";

const printCss = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "print.css"),
  "utf8",
);

function completedReport(): SessionState {
  let state = sessionReducer(initialSessionState(), { type: "START_SESSION" });
  state = sessionReducer(state, { type: "CONFIRM_WEEKDAY_STRIP" });

  const answers: readonly (readonly [number, 0 | 1])[] = [
    [0, 1],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ];
  for (const [missionIndex, kind] of answers) {
    const revision = state.records[missionIndex]?.responses.length === 0 ? 0 : 1;
    state = sessionReducer(state, {
      type: "SUBMIT_RESPONSE",
      missionIndex,
      revision,
      answer: kind === 0 ? correctAnswer(missionIndex) : wrongAnswer(missionIndex),
    });
    if (kind === 1 && !state.records[missionIndex]?.completed) {
      state = sessionReducer(state, {
        type: "SUBMIT_RESPONSE",
        missionIndex,
        revision: 1,
        answer: correctAnswer(missionIndex),
      });
    }
    state = sessionReducer(state, { type: "NEXT" });
  }
  return state;
}

describe("LearningReport", () => {
  it("여섯 미션의 최초 판단·근거·수정 결과를 보여 준다", () => {
    render(<LearningReport state={completedReport()} dispatch={vi.fn()} />);
    const records = screen.getByRole("list", { name: "미션별 달력 기록" });
    const directRecords = records.querySelectorAll(":scope > li");
    expect(directRecords).toHaveLength(6);
    expect(within(records).getByText(/다시 고쳐서 통과/)).toBeInTheDocument();
    expect(within(records).getAllByText(/한 번에 복원/).length).toBe(5);
    expect(within(records).getByText(/9월 2일.*다음 날은/)).toBeInTheDocument();
  });

  it("점수·등급·순위를 만들지 않는다", () => {
    render(<LearningReport state={completedReport()} dispatch={vi.fn()} />);
    expect(screen.queryByText(/점수/)).not.toBeInTheDocument();
    expect(screen.queryByText(/등급/)).not.toBeInTheDocument();
    expect(screen.queryByText(/순위/)).not.toBeInTheDocument();
  });

  it("새로고침 안내와 연습 범위를 함께 보여 준다", () => {
    render(<LearningReport state={completedReport()} dispatch={vi.fn()} />);
    expect(screen.getByText(/새로고침하면.*사라져요/)).toBeInTheDocument();
    expect(screen.getByText(/교육 모형.*다른 달력의 날짜는 직접 확인/)).toBeInTheDocument();
  });

  it("인쇄 버튼은 인쇄 대화상자만 호출한다", async () => {
    const user = userEvent.setup();
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => undefined);
    render(<LearningReport state={completedReport()} dispatch={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: "결과 인쇄" }));
    expect(printSpy).toHaveBeenCalledTimes(1);
    printSpy.mockRestore();
  });

  it("다시 하기는 확인 대화상자 뒤 세션을 비운다", async () => {
    const user = userEvent.setup();
    const dispatch = vi.fn();
    render(<LearningReport state={completedReport()} dispatch={dispatch} />);
    await user.click(screen.getByRole("button", { name: "처음부터 다시 하기" }));
    const dialog = screen.getByRole("dialog", { name: "처음부터 다시 할까요?" });
    expect(within(dialog).getByText(/새로고침하면|모두 사라져요/)).toBeInTheDocument();
    await user.click(within(dialog).getByRole("button", { name: "네, 처음부터 할게요" }));
    expect(dispatch).toHaveBeenCalledWith({ type: "RESTART_CONFIRMED" });
  });

  it("인쇄 CSS는 A4 세로·검정 텍스트·버튼 숨김을 보장한다", () => {
    expect(printCss).toContain("@page");
    expect(printCss).toContain("A4 portrait");
    expect(printCss).toContain(".no-print");
    expect(printCss).toContain("@media print");
  });
});
