# 달력 순서 복원소 (Calendar Sequence Repair Shop)

초등 1~2학년 대상의 달력 날짜·요일 순서 복원 연습 정적 학습 앱입니다. 2026년 9월 연습 달력에서 빠진 날짜, 어제·오늘·내일, 일주일 뒤, 월 경계를 복원하며 날짜 관계를 말로 설명하는 경험을 제공합니다.

## 학습 계약

- 날짜는 하루씩 늘고 요일은 일요일부터 토요일까지 정해진 순서로 반복됩니다.
- 어제·오늘·내일, 같은 요일 7일 차이, 월 경계(9월 30일 다음은 10월 1일)를 달력 근거로 연결합니다.
- 점수·속도·등급·순위 대신 최초 판단, 사용한 근거, 수정 결과를 보여 줍니다.

## 실행 방법

```bash
npm install
npm run dev        # 로컬 개발 서버 (base /)
npm run verify     # lint + typecheck + 단위·a11y 테스트 + 줄 수 검사 + build + E2E
```

## 스크립트

| 스크립트 | 역할 |
|---|---|
| `npm run dev` | Vite 개발 서버 |
| `npm run build` | 타입 검사 후 `dist/` 생성 (base `/calendar-sequence-repair-shop/`) |
| `npm run preview` | 빌드 결과를 Pages와 같은 하위 경로에서 서빙 |
| `npm run lint` | ESLint 검사 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:run` | Vitest 단위·컴포넌트 테스트 |
| `npm run test:a11y` | axe 자동 접근성 테스트 |
| `npm run test:e2e` | Playwright 학습 흐름·키보드·모바일 테스트 |
| `npm run check:lines` | TS·TSX·CSS 파일 500줄 미만 검사 |
| `npm run verify` | 위 전체를 순서대로 실행 |

## 개인정보와 데이터 경계

- 학생 응답은 현재 탭 메모리에만 존재합니다. localStorage, sessionStorage, IndexedDB, 쿠키를 사용하지 않습니다.
- 서버 전송, 로그인, 외부 AI 호출, 분석, 광고가 전혀 없습니다. 새로고침하면 응답이 사라집니다.
- 학생 이름, 생년월일, 학급 사건 등 개인 정보를 입력받지 않습니다.

## 문서

- `docs/content-review.md` — 미션·용어·오개념 방지 검수 기록
- `docs/image-rights-ledger.md` — 생성·제작 이미지 권리 장부
- `docs/plans/` — 구현 계획 문서 사본
- `docs/qa/acceptance-checklist.md` — 완료 기준 점검 기록
