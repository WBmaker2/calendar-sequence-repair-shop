import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../src/app/App";

const FORBIDDEN_APIS = [
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "document.cookie",
  "window.fetch",
  "XMLHttpRequest",
  "WebSocket",
  "EventSource",
  "sendBeacon",
] as const;

const SKIP_DIRECTORY_NAMES = new Set(["node_modules", "dist", "coverage"]);
const SKIP_FILE_NAMES = new Set(["vite.config.ts", "vitest.config.ts", "playwright.config.ts"]);

function collectSourceFiles(directory: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory)) {
    if (SKIP_DIRECTORY_NAMES.has(entry)) continue;
    const fullPath = join(directory, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      found.push(...collectSourceFiles(fullPath));
    } else if (
      [".ts", ".tsx"].includes(extname(entry)) &&
      !entry.includes(".test.") &&
      !SKIP_FILE_NAMES.has(entry)
    ) {
      found.push(fullPath);
    }
  }
  return found;
}

function installWatchers(violations: string[]): () => void {
  const originals: Array<() => void> = [];

  const watchProperty = (target: object, key: string, label: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, key);
    Object.defineProperty(target, key, {
      configurable: true,
      get() {
        // 읽기는 기록만 한다(내부 동작을 깨지 않게).
        return descriptor?.get ? descriptor.get.call(target) : undefined;
      },
      set(_value: unknown) {
        violations.push(label);
        throw new Error(`금지된 저장소 쓰기: ${label}`);
      },
    });
    originals.push(() => {
      if (descriptor) {
        Object.defineProperty(target, key, descriptor);
      }
    });
  };

  watchProperty(window, "localStorage", "localStorage");
  watchProperty(window, "sessionStorage", "sessionStorage");
  watchProperty(document, "cookie", "document.cookie");

  const watchFunction = (target: object, key: string, label: string) => {
    const original = Reflect.get(target, key);
    Object.defineProperty(target, key, {
      configurable: true,
      writable: true,
      value: () => {
        violations.push(label);
        throw new Error(`금지된 네트워크 호출: ${label}`);
      },
    });
    originals.push(() => {
      Object.defineProperty(target, key, {
        configurable: true,
        writable: true,
        value: original,
      });
    });
  };

  watchFunction(window, "fetch", "window.fetch");
  watchFunction(window, "XMLHttpRequest", "XMLHttpRequest");
  watchFunction(window, "WebSocket", "WebSocket");
  watchFunction(window, "EventSource", "EventSource");
  watchFunction(navigator, "sendBeacon", "sendBeacon");

  return () => originals.forEach((restore) => restore());
}

describe("런타임 개인정보·네트워크 경계", () => {
  it("전체 학습 흐름 동안 네트워크 호출이 0건이다", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const violations: string[] = [];
    const restore = installWatchers(violations);

    try {
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
      await user.click(screen.getByRole("button", { name: "2026년 9월 7일 월요일" }));
      await user.click(screen.getByRole("button", { name: "2026년 9월 14일 월요일" }));
      await user.click(screen.getByRole("button", { name: "달력 칸 확인" }));
      await user.click(screen.getByRole("button", { name: "다음으로" }));
      await user.click(screen.getByRole("button", { name: "어제: 9월 13일 일요일" }));
      await user.click(screen.getByRole("button", { name: "내일: 9월 15일 화요일" }));
      await user.click(screen.getByRole("button", { name: "관계 완성" }));
      await user.click(screen.getByRole("button", { name: "다음으로" }));
      await user.click(screen.getByRole("button", { name: "2026년 9월 15일 화요일" }));
      await user.click(screen.getByRole("button", { name: "관계 완성" }));
      await user.click(screen.getByRole("button", { name: "다음으로" }));
      await user.click(screen.getByRole("button", { name: "도서관 행사 9월 5일 토요일" }));
      await user.click(screen.getByRole("button", { name: "화단 행사 9월 12일 토요일" }));
      await user.click(screen.getByRole("button", { name: "체육 행사 9월 21일 월요일" }));
      await user.click(screen.getByRole("button", { name: "관계 완성" }));
      await user.click(screen.getByRole("button", { name: "다음으로" }));
      await user.click(screen.getByRole("button", { name: "10월 1일" }));
      await user.click(screen.getByRole("button", { name: "목요일" }));
      await user.click(screen.getByRole("button", { name: "관계 완성" }));
      await user.click(screen.getByRole("button", { name: "달력 기록 보기" }));

      expect(screen.getByText("오늘 복원한 달력 기록")).toBeInTheDocument();
      expect(violations).toEqual([]);
    } finally {
      restore();
    }
  });

  it("학습 코드는 금지된 API를 소스 수준에서 참조하지 않는다", () => {
    const offenders: string[] = [];
    for (const file of collectSourceFiles(join(process.cwd(), "src"))) {
      const source = readFileSync(file, "utf8");
      for (const forbidden of FORBIDDEN_APIS) {
        if (source.includes(forbidden)) {
          offenders.push(`${file} → ${forbidden}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
