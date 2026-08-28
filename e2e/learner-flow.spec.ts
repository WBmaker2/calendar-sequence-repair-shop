import { expect, test } from "@playwright/test";
import {
  expectReportVisible,
  goToNext,
  goToReport,
  startToPredict,
  submitAfterSeven,
  submitBoundary,
  submitOrder,
  submitPredict,
  submitRelate,
  submitSelect,
} from "./helpers";

test.describe("학습 흐름 E2E", () => {
  test("9월 3일 목요일 빈칸을 복원한다", async ({ page }) => {
    await startToPredict(page);
    await expect(page.getByRole("button", { name: "2026년 9월 3일 목요일" })).toHaveCount(0);
    await submitPredict(page);
    await expect(page.getByText(/좋아요! 달력 근거를 찾았어요/)).toBeVisible();
    await expect(
      page.getByText(/9월 2일 수요일의 다음 날은 2026년 9월 3일 목요일이에요/),
    ).toBeVisible();
    await goToNext(page);
  });

  test("9월 14일의 어제와 내일을 정확히 연결한다", async ({ page }) => {
    await startToPredict(page);
    await submitPredict(page);
    await goToNext(page);
    await submitSelect(page);
    await goToNext(page);
    await submitRelate(page);
    await expect(page.getByText(/어제는 2026년 9월 13일 일요일이에요/)).toBeVisible();
    await expect(page.getByText(/내일은 2026년 9월 15일 화요일이에요/)).toBeVisible();
    await goToNext(page);
  });

  test("9월 8일에서 일주일 뒤인 15일을 찾는다", async ({ page }) => {
    await startToPredict(page);
    await submitPredict(page);
    await goToNext(page);
    await submitSelect(page);
    await goToNext(page);
    await submitRelate(page);
    await goToNext(page);
    await submitAfterSeven(page);
    await expect(
      page.getByText(/2026년 9월 8일 화요일에서 7일 뒤는 2026년 9월 15일 화요일이에요/),
    ).toBeVisible();
  });

  test("9월 30일 다음을 10월 1일 목요일로 완성하고 기록에 도착한다", async ({ page }) => {
    await startToPredict(page);
    await submitPredict(page);
    await goToNext(page);
    await submitSelect(page);
    await goToNext(page);
    await submitRelate(page);
    await goToNext(page);
    await submitAfterSeven(page);
    await goToNext(page);
    await submitOrder(page);
    await goToNext(page);
    await submitBoundary(page);
    await expect(
      page.getByText(/다음 날은 새로운 달인 2026년 10월 1일 목요일이에요/),
    ).toBeVisible();
    await goToReport(page);
    await expectReportVisible(page);
  });
});
