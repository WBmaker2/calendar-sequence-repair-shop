import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../src/app/App";

async function expectNoSeriousViolations() {
  const results = await axe(document.body);
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  const summary = serious
    .map((violation) => `${violation.id}(${violation.impact}): ${violation.nodes.length}개`)
    .join(", ");
  expect(serious, `심각한 접근성 위반: ${summary}`).toEqual([]);
}

describe("자동 접근성 검사 (axe)", () => {
  beforeAll(() => {
    document.documentElement.lang = "ko";
    document.title = "달력 순서 복원소";
  });

  it("입구 화면에서 serious/critical 위반이 없다", async () => {
    render(<App />);
    await expectNoSeriousViolations();
  });

  it("요일 띠 단계에서 serious/critical 위반이 없다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "달력 복원 시작하기" }));
    await expectNoSeriousViolations();
  });

  it("빈 칸 예측 단계에서 serious/critical 위반이 없다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "달력 복원 시작하기" }));
    for (const weekday of ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]) {
      await user.click(screen.getByRole("button", { name: weekday}));
    }
    await user.click(screen.getByRole("button", { name: "요일 띠 확인했어요" }));
    await expectNoSeriousViolations();
  });

  it("달력 칸 선택 단계에서 serious/critical 위반이 없다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "달력 복원 시작하기" }));
    for (const weekday of ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]) {
      await user.click(screen.getByRole("button", { name: weekday}));
    }
    await user.click(screen.getByRole("button", { name: "요일 띠 확인했어요" }));
    await user.click(screen.getByRole("button", { name: "3일" }));
    await user.click(screen.getByRole("button", { name: "목요일" }));
    await user.click(screen.getByRole("button", { name: "예상 완료하기" }));
    await user.click(screen.getByRole("button", { name: "다음으로" }));
    await expectNoSeriousViolations();
  });

  it("업데이트 내역 대화상자에서 serious/critical 위반이 없다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "업데이트 내역" }));
    await expectNoSeriousViolations();
    await user.keyboard("{Escape}");
  });
});
