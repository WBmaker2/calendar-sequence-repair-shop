import { expect, test } from "@playwright/test";
import { goToNext, startToPredict, submitPredict } from "./helpers";

const WEEKDAY_IN_CELL = ".calendar-cell .cell-weekday";

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth, `가로 넘침: scrollWidth ${scrollWidth} > clientWidth ${clientWidth}`).toBeLessThanOrEqual(
    clientWidth,
  );
}

test.describe("좁은 화면과 축소 모션", () => {
  test("320px에서 7열이 읽기 목록으로 전환되고 가로 넘침이 없다", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await startToPredict(page);

    await expectNoHorizontalOverflow(page);

    const header = page.locator(".calendar-head").first();
    await expect(header).not.toBeVisible();

    const weekdayText = page.locator(WEEKDAY_IN_CELL).first();
    await expect(weekdayText).toBeVisible();
    const text = await weekdayText.textContent();
    expect(text).toMatch(/요일$/);

    await submitPredict(page);
    await expectNoHorizontalOverflow(page);
  });

  test("375px 입구와 예측 단계에서 가로 넘침이 없다", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("./");
    await expectNoHorizontalOverflow(page);
    await startToPredict(page);
    await expectNoHorizontalOverflow(page);
  });

  test("200% 확대(640×400)에서도 가로 넘침이 없다", async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 400 });
    await startToPredict(page);
    await expectNoHorizontalOverflow(page);
    await submitPredict(page);
    await expectNoHorizontalOverflow(page);
  });

  test("축소 모션에서 칸 전환 맥박이 제거되고 필수 배지로 대체된다", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await startToPredict(page);
    await submitPredict(page);
    await goToNext(page);

    const pulseButton = page.getByRole("button", { name: "달력 칸 확인" });
    await expect(pulseButton).toBeVisible();

    const styles = await pulseButton.evaluate((element) => {
      const computed = window.getComputedStyle(element);
      const after = window.getComputedStyle(element, "::after");
      return {
        animationName: computed.animationName,
        outlineWidth: computed.outlineWidth,
        badgeContent: after.content,
      };
    });
    expect(styles.animationName).toBe("none");
    expect(styles.outlineWidth).toBe("3px");
    expect(styles.badgeContent).toContain("필수");
  });
});
