import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalDialog from "./ModalDialog";

describe("ModalDialog", () => {
  it("열린 대화상자 안에서 Tab 초점이 순환한다", async () => {
    const user = userEvent.setup();

    render(
      <ModalDialog open title="키보드 확인" onClose={() => undefined}>
        <button type="button">첫 번째 선택</button>
        <button type="button">두 번째 선택</button>
      </ModalDialog>,
    );

    const closeButton = screen.getByRole("button", { name: "닫기" });
    const firstButton = screen.getByRole("button", { name: "첫 번째 선택" });
    const secondButton = screen.getByRole("button", { name: "두 번째 선택" });

    expect(closeButton).toHaveFocus();
    await user.tab();
    expect(firstButton).toHaveFocus();
    await user.tab();
    expect(secondButton).toHaveFocus();
    await user.tab();
    expect(closeButton).toHaveFocus();
    await user.tab({ shift: true });
    expect(secondButton).toHaveFocus();
  });
});
