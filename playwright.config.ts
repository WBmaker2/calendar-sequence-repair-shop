import { defineConfig, devices } from "@playwright/test";

const PREVIEW_ORIGIN = "http://127.0.0.1:4173";
const BASE_PATH = "/calendar-sequence-repair-shop/";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `${PREVIEW_ORIGIN}${BASE_PATH}`,
    trace: "retain-on-failure",
  },
  expect: {
    timeout: 5000,
  },
  webServer: {
    command: "npm run preview -- --port 4173 --strictPort",
    url: `${PREVIEW_ORIGIN}${BASE_PATH}`,
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      testIgnore: /mobile-reduced-motion\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile",
      testMatch: /mobile-reduced-motion\.spec\.ts/,
      use: { ...devices["Pixel 5"] },
    },
  ],
});
