import { useReducer } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalendarWorkbench from "./CalendarWorkbench";
import {
  correctAnswer,
  initialSessionState,
  sessionReducer,
  wrongAnswer,
} from "../../app/sessionReducer";
import type { SessionState } from "../../app/sessionReducer";

function WorkbenchHarness({ initialState }: { readonly initialState: SessionState }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);
  return <CalendarWorkbench state={state} dispatch={dispatch} />;
}

function renderAt(state: SessionState) {
  return render(<WorkbenchHarness initialState={state} />);
}

function submitAt(state: SessionState, missionIndex: number, answer: 0 | 1): SessionState {
  const submitted = sessionReducer(state, {
    type: "SUBMIT_RESPONSE",
    missionIndex,
    revision: 0,
    answer: answer === 0 ? correctAnswer(missionIndex) : wrongAnswer(missionIndex),
  });
  return sessionReducer(submitted, { type: "NEXT" });
}

const started = sessionReducer(initialSessionState(), { type: "START_SESSION" });
const predict = sessionReducer(started, { type: "CONFIRM_WEEKDAY_STRIP" });
const select = submitAt(predict, 0, 0);
const relate = submitAt(select, 1, 0);
const weekFirst = submitAt(relate, 2, 0);
const weekSecond = submitAt(weekFirst, 3, 0);
const boundary = submitAt(weekSecond, 4, 0);

describe("요일 띠 단계", () => {
  it("일요일부터 토요일까지 순서대로 눌러야 확인할 수 있다", async () => {
    const user = userEvent.setup();
    renderAt(started);
    for (const name of ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]) {
      await user.click(screen.getByRole("button", { name }));
    }
    const confirm = screen.getByRole("button", { name: "요일 띠 확인했어요" });
    expect(confirm).toBeEnabled();
    await user.click(confirm);
    expect(screen.getByRole("heading", { name: "빈 칸 예측하기" })).toBeInTheDocument();
  });

  it("순서가 틀리면 안내하고 진행되지 않는다", async () => {
    const user = userEvent.setup();
    renderAt(started);
    await user.click(screen.getByRole("button", { name: "월요일" }));
    expect(screen.getByText(/일요일부터 차례대로/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "요일 띠 확인했어요" })).toBeDisabled();
  });
});

describe("빈 칸 예측 단계 (calendar-gap-01)", () => {
  it("숨긴 날짜는 달력에 렌더링되지 않는다", () => {
    renderAt(predict);
    expect(
      screen.queryByRole("button", { name: "2026년 9월 3일 목요일" }),
    ).not.toBeInTheDocument();
    expect(document.querySelector(".calendar-cell.is-missing")).not.toBeNull();
  });

  it("날짜와 요일을 예상해 제출하면 근거와 함께 통과한다", async () => {
    const user = userEvent.setup();
    renderAt(predict);
    await user.click(screen.getByRole("button", { name: "3일" }));
    await user.click(screen.getByRole("button", { name: "목요일" }));
    await user.click(screen.getByRole("button", { name: "예상 완료하기" }));
    expect(screen.getByText(/좋아요/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "좋아요! 달력 근거를 찾았어요." })).toHaveFocus();
    expect(screen.getByRole("button", { name: "다음으로" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    expect(screen.getByRole("heading", { name: "같은 월요일 찾기" })).toBeInTheDocument();
  });

  it("오답에는 정답을 공개하지 않고 한 번의 수정 기회를 준다", async () => {
    const user = userEvent.setup();
    renderAt(predict);
    await user.click(screen.getByRole("button", { name: "4일" }));
    await user.click(screen.getByRole("button", { name: "금요일" }));
    await user.click(screen.getByRole("button", { name: "예상 완료하기" }));
    const feedback = screen.getByRole("status");
    expect(feedback).toHaveTextContent(/다시/);
    expect(feedback).not.toHaveTextContent("9월 3일");
    await user.click(screen.getByRole("button", { name: "다시 고치기" }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "1일" })).toHaveFocus();
    });
    expect(screen.getByRole("button", { name: "4일" })).toHaveAttribute("aria-pressed", "false");
    await user.click(screen.getByRole("button", { name: "3일" }));
    await user.click(screen.getByRole("button", { name: "목요일" }));
    await user.click(screen.getByRole("button", { name: "예상 완료하기" }));
    expect(screen.getByText(/좋아요/)).toBeInTheDocument();
  });
});

describe("달력 칸 선택 단계 (calendar-week-02)", () => {
  it("두 개의 월요일을 선택해 확인한다", async () => {
    const user = userEvent.setup();
    renderAt(select);
    await user.click(screen.getByRole("button", { name: "2026년 9월 7일 월요일" }));
    await user.click(screen.getByRole("button", { name: "2026년 9월 14일 월요일" }));
    await user.click(screen.getByRole("button", { name: "달력 칸 확인" }));
    expect(screen.getByText(/좋아요/)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/7일/);
  });

  it("두 개 미만이면 확인할 수 없다", async () => {
    const user = userEvent.setup();
    renderAt(select);
    await user.click(screen.getByRole("button", { name: "2026년 9월 7일 월요일" }));
    expect(screen.getByRole("button", { name: "달력 칸 확인" })).toBeDisabled();
  });

  it("화살표로 칸을 이동하고 Enter로 선택한다", async () => {
    const user = userEvent.setup();
    renderAt(select);
    const firstCell = screen.getByRole("button", { name: "2026년 9월 7일 월요일" });
    firstCell.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "2026년 9월 8일 화요일" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "2026년 9월 8일 화요일" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

describe("관계 카드 단계 (calendar-yesterday-03)", () => {
  it("어제와 내일 카드를 연결해 완성한다", async () => {
    const user = userEvent.setup();
    renderAt(relate);
    await user.click(screen.getByRole("button", { name: "어제: 9월 13일 일요일" }));
    await user.click(screen.getByRole("button", { name: "내일: 9월 15일 화요일" }));
    await user.click(screen.getByRole("button", { name: "관계 완성" }));
    expect(screen.getByText(/좋아요/)).toBeInTheDocument();
  });
});

describe("일주일 관계 단계 (calendar-after-seven-04 · calendar-order-05)", () => {
  it("일주일 뒤 칸을 찾는다", async () => {
    const user = userEvent.setup();
    renderAt(weekFirst);
    await user.click(screen.getByRole("button", { name: "2026년 9월 15일 화요일" }));
    await user.click(screen.getByRole("button", { name: "관계 완성" }));
    expect(screen.getByText(/좋아요/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    expect(screen.getByRole("heading", { name: "행사 날짜 순서 배열" })).toBeInTheDocument();
  });

  it("행사 카드를 빠른 날짜 순서로 눌러 배열한다", async () => {
    const user = userEvent.setup();
    renderAt(weekSecond);
    await user.click(screen.getByRole("button", { name: "도서관 행사 9월 5일 토요일" }));
    await user.click(screen.getByRole("button", { name: "화단 행사 9월 12일 토요일" }));
    await user.click(screen.getByRole("button", { name: "체육 행사 9월 21일 월요일" }));
    await user.click(screen.getByRole("button", { name: "관계 완성" }));
    expect(screen.getByText(/좋아요/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    expect(screen.getByRole("heading", { name: "다음 달로 이어 주기" })).toBeInTheDocument();
  });

  it("잘못 누른 순서는 지우고 다시 배열할 수 있다", async () => {
    const user = userEvent.setup();
    renderAt(weekSecond);
    await user.click(screen.getByRole("button", { name: "체육 행사 9월 21일 월요일" }));
    await user.click(screen.getByRole("button", { name: "순서 지우기" }));
    expect(screen.getByRole("button", { name: "체육 행사 9월 21일 월요일" })).toBeEnabled();
  });
});

describe("월 경계 단계 (calendar-month-06)", () => {
  it("없는 날짜 9월 31일은 제출할 수 없고 안내를 보여 준다", async () => {
    const user = userEvent.setup();
    renderAt(boundary);
    await user.click(screen.getByRole("button", { name: "9월 31일" }));
    await user.click(screen.getByRole("button", { name: "목요일" }));
    await user.click(screen.getByRole("button", { name: "관계 완성" }));
    expect(screen.getByText(/달력에 없는 날짜/)).toBeInTheDocument();
    expect(screen.queryByText(/좋아요/)).not.toBeInTheDocument();
  });

  it("10월 1일 목요일로 월 경계를 수리한다", async () => {
    const user = userEvent.setup();
    renderAt(boundary);
    await user.click(screen.getByRole("button", { name: "10월 1일" }));
    await user.click(screen.getByRole("button", { name: "목요일" }));
    await user.click(screen.getByRole("button", { name: "관계 완성" }));
    expect(screen.getByText(/좋아요/)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/10월 1일/);
  });
});

describe("수정 기회 소진", () => {
  it("두 번 모두 틀리면 근거 날짜를 공개하고 진행할 수 있다", async () => {
    const user = userEvent.setup();
    let state = predict;
    state = sessionReducer(state, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 0,
      answer: wrongAnswer(0),
    });
    state = sessionReducer(state, {
      type: "SUBMIT_RESPONSE",
      missionIndex: 0,
      revision: 1,
      answer: wrongAnswer(0),
    });
    renderAt(state);
    expect(screen.getByText(/수정 결과를 기록했어요/)).toBeInTheDocument();
    expect(screen.getByText(/9월 3일/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    expect(screen.getByRole("heading", { name: "같은 월요일 찾기" })).toBeInTheDocument();
  });
});

describe("뒤로 가기", () => {
  it("뒤로 가기 버튼으로 직전 단계로 돌아간다", async () => {
    const user = userEvent.setup();
    renderAt(select);
    await user.click(screen.getByRole("button", { name: "뒤로 가기" }));
    expect(screen.getByRole("heading", { name: "빈 칸 예측하기" })).toBeInTheDocument();
  });
});
