import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EntranceScreen from "./EntranceScreen";

function renderEntrance() {
  const onStart = vi.fn();
  const view = render(<EntranceScreen onStart={onStart} />);
  return { onStart, view };
}

describe("EntranceScreen", () => {
  it("학습 목표·예상 시간·저장 안내·새로고침 안내를 보여 준다", () => {
    renderEntrance();
    expect(screen.getByRole("heading", { name: "빠진 날짜를 찾아 달력을 복원해요!" })).toBeInTheDocument();
    expect(screen.getAllByText(/어제·오늘·내일/).length).toBeGreaterThan(0);
    expect(screen.getByText(/10~15분/)).toBeInTheDocument();
    expect(screen.getByText(/2026년 9월.*실제/)).toBeInTheDocument();
    expect(screen.getByText(/저장하거나 보내지 않아요/)).toBeInTheDocument();
    expect(screen.getByText(/새로고침하면.*사라져요/)).toBeInTheDocument();
  });

  it("오늘의 미션 6개를 목록으로 보여 준다", () => {
    renderEntrance();
    const missionList = screen.getByRole("list", { name: "오늘의 미션 6개" });
    expect(within(missionList).getAllByRole("listitem")).toHaveLength(6);
    expect(within(missionList).getByText(/빠진 날짜와 요일 찾기/)).toBeInTheDocument();
    expect(within(missionList).getByText(/다음 달로 이어 주기/)).toBeInTheDocument();
  });

  it("시작 버튼이 첫 화면 영역 안에 있다", () => {
    renderEntrance();
    const hero = document.querySelector(".entrance-hero");
    expect(hero).not.toBeNull();
    expect(
      within(hero as HTMLElement).getByRole("button", { name: "달력 복원 시작하기" }),
    ).toBeInTheDocument();
  });

  it("Enter와 Space로 시작할 수 있다", async () => {
    const user = userEvent.setup();
    const { onStart } = renderEntrance();
    const startButton = screen.getByRole("button", { name: "달력 복원 시작하기" });
    startButton.focus();
    await user.keyboard("{Enter}");
    expect(onStart).toHaveBeenCalledTimes(1);
    await user.keyboard(" ");
    expect(onStart).toHaveBeenCalledTimes(2);
  });
});
