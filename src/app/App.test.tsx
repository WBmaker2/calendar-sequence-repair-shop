import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";

function BrokenComponent(): never {
  throw new Error("테스트용 렌더링 오류");
}

describe("App 셸", () => {
  it("앱 제목과 입구를 렌더링한다", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "달력 순서 복원소" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "활동으로 건너뛰기" })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(document.querySelector("#main-content")).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("button", { name: "달력 복원 시작하기" })).toBeInTheDocument();
  });

  it("시작하면 현재 학습 영역으로 초점이 옮겨지고 요일 띠 단계가 된다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "달력 복원 시작하기" }));
    await waitFor(() => {
      expect(screen.getByRole("main")).toHaveFocus();
    });
    expect(screen.getByRole("heading", { name: "요일 띠 확인" })).toBeInTheDocument();
  });

  it("업데이트 내역 대화상자는 닫으면 초점을 호출 버튼으로 돌려 준다", async () => {
    const user = userEvent.setup();
    render(<App />);
    const openButton = screen.getByRole("button", { name: "업데이트 내역" });
    await user.click(openButton);
    const dialog = screen.getByRole("dialog", { name: "업데이트 내역" });
    expect(dialog).toBeInTheDocument();
    expect(screen.getAllByText(/2026-08-28/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/학습 앱 구현 완료/)).toBeInTheDocument();
    expect(screen.getByText(/구현 계획 확정/)).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "업데이트 내역" })).not.toBeInTheDocument();
    });
    expect(openButton).toHaveFocus();
  });

  it("애니메이션 줄이기 토글이 문서 클래스를 바꾼다", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: "애니메이션 줄이기" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(document.documentElement.classList.contains("reduce-motion")).toBe(true);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    await user.click(toggle);
    expect(document.documentElement.classList.contains("reduce-motion")).toBe(false);
  });
});

describe("ErrorBoundary", () => {
  it("렌더링 오류 시 어린이용 안내만 보여 주고 다시 시작을 제공한다", async () => {
    const user = userEvent.setup();
    const onRestart = vi.fn();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary onRestart={onRestart}>
        <BrokenComponent />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("활동을 다시 불러오지 못했어요.")).toBeInTheDocument();
    expect(screen.queryByText(/테스트용 렌더링 오류/)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "처음부터 다시 하기" }));
    expect(onRestart).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });
});
