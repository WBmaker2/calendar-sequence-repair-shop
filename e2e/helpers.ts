import { expect, type Page } from "@playwright/test";

export async function startToPredict(page: Page): Promise<void> {
  await page.goto("./");
  await page.getByRole("button", { name: "달력 복원 시작하기" }).click();
  for (const weekday of ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]) {
    await page.getByRole("button", { name: weekday, exact: true }).click();
  }
  await page.getByRole("button", { name: "요일 띠 확인했어요" }).click();
}

export async function submitPredict(page: Page): Promise<void> {
  await page.getByRole("button", { name: "3일", exact: true }).click();
  await page.getByRole("button", { name: "목요일", exact: true }).click();
  await page.getByRole("button", { name: "예상 완료하기" }).click();
}

export async function submitSelect(page: Page): Promise<void> {
  await page.getByRole("button", { name: "2026년 9월 7일 월요일" }).click();
  await page.getByRole("button", { name: "2026년 9월 14일 월요일" }).click();
  await page.getByRole("button", { name: "달력 칸 확인" }).click();
}

export async function submitRelate(page: Page): Promise<void> {
  await page.getByRole("button", { name: "어제: 9월 13일 일요일" }).click();
  await page.getByRole("button", { name: "내일: 9월 15일 화요일" }).click();
  await page.getByRole("button", { name: "관계 완성" }).click();
}

export async function submitAfterSeven(page: Page): Promise<void> {
  await page.getByRole("button", { name: "2026년 9월 15일 화요일" }).click();
  await page.getByRole("button", { name: "관계 완성" }).click();
}

export async function submitOrder(page: Page): Promise<void> {
  await page.getByRole("button", { name: "도서관 행사 9월 5일 토요일" }).click();
  await page.getByRole("button", { name: "화단 행사 9월 12일 토요일" }).click();
  await page.getByRole("button", { name: "체육 행사 9월 21일 월요일" }).click();
  await page.getByRole("button", { name: "관계 완성" }).click();
}

export async function submitBoundary(page: Page): Promise<void> {
  await page.getByRole("button", { name: "10월 1일", exact: true }).click();
  await page.getByRole("button", { name: "목요일", exact: true }).click();
  await page.getByRole("button", { name: "관계 완성" }).click();
}

export async function goToNext(page: Page): Promise<void> {
  await page.getByRole("button", { name: "다음으로" }).click();
}

export async function goToReport(page: Page): Promise<void> {
  await page.getByRole("button", { name: "달력 기록 보기" }).click();
}

export async function expectReportVisible(page: Page): Promise<void> {
  await expect(page.getByText("오늘 복원한 달력 기록")).toBeVisible();
}
