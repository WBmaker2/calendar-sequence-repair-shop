import { expect, test } from "@playwright/test";
import { goToNext, startToPredict, submitPredict } from "./helpers";

test.describe("키보드 E2E", () => {
  test("화살표로 달력 칸을 이동하고 Enter로 선택한다", async ({ page }) => {
    await startToPredict(page);
    await submitPredict(page);
    await goToNext(page);

    const firstCell = page.getByRole("button", { name: "2026년 9월 7일 월요일" });
    await firstCell.focus();
    await expect(firstCell).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("button", { name: "2026년 9월 8일 화요일" })).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("button", { name: "2026년 9월 9일 수요일" })).toBeFocused();

    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("button", { name: "2026년 9월 8일 화요일" })).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "2026년 9월 8일 화요일" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "2026년 9월 9일 수요일" })).toBeFocused();

    await page.keyboard.press("Shift+Tab");
    await expect(page.getByRole("button", { name: "2026년 9월 8일 화요일" })).toBeFocused();
  });

  test("Space로도 같은 결과를 만든다", async ({ page }) => {
    await startToPredict(page);
    await submitPredict(page);
    await goToNext(page);

    const cell = page.getByRole("button", { name: "2026년 9월 14일 월요일" });
    await cell.focus();
    await page.keyboard.press("Space");
    await expect(cell).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("Space");
    await expect(cell).toHaveAttribute("aria-pressed", "false");
  });
});
