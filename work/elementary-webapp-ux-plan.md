# 달력 순서 복원소 학습자 UX 점검·개선 계획

- 작성일: 2026-08-31 (KST)
- 대상: `/Volumes/ External Drive 256G/Dev2/codex/calendar-sequence-repair-shop`
- 실행 모드: `full`
- 기준선: 2026-08-30 리디자인 결과와 2026-08-31 공개 배포본 브라우저 관찰
- 상태: **구현·검증 완료; 커밋 전**

## 1. 보존할 프로젝트 규칙

- Vite + React 19 + TypeScript + npm(`package-lock.json`) 스택을 유지한다.
- `src/domain/calendarMath.ts`, `src/app/sessionReducer.ts`, 검수된 `MISSIONS`의 날짜 판정·상태 전이·수정 기회를 변경하지 않는다.
- 학생 이름·개인정보·로그인·서버·저장소·분석·외부 요청을 추가하지 않는다.
- 2026년 9월 고정 미션 6개, 점수·속도·등급·순위 대신 근거와 수정 결과를 보여 주는 계약을 유지한다.
- 라이트 모드, HTML 달력, 키보드·터치 조작, reduced motion, 인쇄 결과, `업데이트 내역` 진입점을 유지한다.
- VoiceOver·TTS·내레이션·녹음은 이번 범위에 포함하지 않는다.
- 모든 TS·TSX·CSS 파일은 500줄 미만으로 유지하며 기존 사용자 변경은 덮어쓰지 않는다.

## 2. 실행 역량과 기존 문서

- Stage 0: `work/elementary-webapp-ux-bootstrap.md` — `ready`.
- 브라우저: Codex In-app Browser를 기준선·재검증에 사용한다.
- 사용 가능한 전문 라우팅: `design-system`, `impeccable`, `redesign-existing-projects`.
- `ui-ux-pro-max`: 파일시스템에는 있으나 이번 런타임 스냅샷에는 직접 로드되지 않아, 이미 확정된 `design-system/MASTER.md`와 현재 제품 계약을 권위 있는 설계 기준으로 사용한다.
- 기존 계획: `work/education-webapp-redesign-plan.md`를 재사용하고 중복 리디자인은 하지 않는다.
- 설계 기준: `design-system/MASTER.md`의 종이 작업대, 단일 핵심 행동, 320px 목록 전환, reduced motion, 라이트 모드 규칙.

## 3. 기준선 관찰

대상: [공개 달력 순서 복원소](https://wbmaker2.github.io/calendar-sequence-repair-shop/)

| 상태 | 뷰포트 | 관찰 가능한 결과 | 판정 |
|---|---:|---|---|
| 입구 최초 진입 | 375×812 | `scrollY=43`, 앱 제목에 포커스, 상단 `app-eyebrow`가 viewport 위로 `top=-11px` 이동 | P2 시각 가독성 |
| 시작 후 요일 띠 | 375×812 | 앱 제목에 포커스가 남고 `main`은 `top=631px`, 요일 단계 제목은 `top=663px` | P1 핵심 활동 발견성 |
| 미션 2 진입 | 375×812 | 단계 전환 후 `scrollY=23`, 첫 달력 칸 `top=819px` | P1 핵심 활동 발견성 |
| 첫 오답 피드백 | 375×812 | 피드백 제목은 포커스되고 화면에 나타남; `다시 고치기` 후 focus가 새 입력으로 복귀하지 않음 | P2 키보드 회복 |
| 정답 피드백 | 375×812 | 제목은 보이지만 피드백 패널 하단과 다음 행동이 viewport 아래로 이어짐 | P2 다음 행동 발견성 |
| 입구 최초 진입 | 320×800 | `scrollY=23`, 상단 eyebrow `top=-11px`, 시작 버튼 `bottom=797px`로 접힘 경계에 위치 | P2 모바일 첫 행동 |
| 가로 넘침 | 320/375px | `scrollWidth <= clientWidth` | 현재 통과 |

브라우저 기준선은 DOM snapshot, bounding box, active element, 화면 캡처로 관찰했다. 소스 코드만으로 브라우저 통과를 선언하지 않는다.

## 4. 승인된 개선 범위

### EDU-UX-001 — 단계 전환 포커스를 현재 학습 영역으로 이동

- 원인: `App.tsx`가 단계가 바뀔 때 고정 헤더의 `h1`을 포커스하고 `scrollIntoView({ block: "start" })`한다.
- 변경: 첫 진입에서는 자동 스크롤하지 않고, 실제 단계 전환 때 `main#main-content`를 포커스·스크롤 대상으로 삼는다.
- 효과: 헤더 제목·eyebrow가 잘리지 않고, 모바일에서 현재 단계 제목과 첫 행동이 바로 보인다.
- 보존: 앱 브랜드 `h1`, skip link, main landmark, 단계 전환 계약.

### EDU-UX-002 — 오답 재시도 뒤 첫 입력으로 포커스 복귀

- 원인: `다시 고치기`가 단계 DOM을 다시 만들지만 키보드 포커스를 새 조작 요소로 옮기지 않는다.
- 변경: 재시도 nonce가 바뀐 뒤 작업대 안의 첫 활성 버튼으로 포커스·근접 스크롤한다.
- 효과: 키보드 학습자가 새 답을 바로 고를 수 있고, 마우스·터치 흐름은 유지된다.

### EDU-UX-003 — 피드백 전체와 다음 행동을 읽을 수 있게 스크롤

- 원인: 피드백 제목을 `nearest`로만 보여 주어 긴 모바일 피드백의 다음 CTA가 접힐 수 있다.
- 변경: 피드백 제목을 `start` 기준으로 이동하고 `scroll-margin-top`을 둔다.
- 효과: 정답 근거와 다음 행동을 같은 화면 흐름에서 확인한다.

### EDU-UX-004 — 좁은 입구에서 첫 행동을 접히지 않게 조정

- 원인: 세로 모바일 입구에서 장식 SVG와 영웅 영역 간격이 320/375px 화면의 시작 CTA를 아래로 민다.
- 변경: 40rem 이하에서 영웅 세로 간격을 줄이고, 23.75rem 이하에서 장식 SVG를 한 단계 축소한다.
- 효과: 장식은 보존하면서 목적·시작 CTA의 첫 viewport 발견성을 높인다.

### EDU-LANG-001 — 결과 화면의 모형 한계를 아동 행동 문장으로 변환

- 원인: `실제 세계 전체를 보장하지 않아요`는 초1–2에게 추상적이고 다음 행동이 없다.
- 변경: `이 기록은 2026년 9월 연습 달력으로 만든 교육 모형이에요. 다른 달력의 날짜는 직접 확인해 보세요.`로 바꾼다.
- 보존: 교육 모형이라는 경계, 고정된 날짜 범위, 실제 달력 확인이라는 오개념 방지 행동.

## 5. 시뮬레이션·시각자료 판정

- 시뮬레이션: `not-needed`. 이 앱의 목표는 시간에 따라 변하는 모델이 아니라 검증된 달력 칸·요일 관계를 보고 선택하는 것이다. 현재 HTML/CSS 달력과 선택 상태가 예측→선택→근거 확인 루프를 충분히 제공한다. Canvas/WebGL, pause/step, seed/time을 추가하지 않는다.
- 시각자료: `verified-asset-preserve`와 `no-image-needed`의 결합. `friendly-paper-calendar.svg`는 장식으로 충분하고 실제 숫자·요일은 HTML에 있다. 새 이미지 생성이나 외부 자산을 추가하지 않는다.

## 6. 검증 계획

### 정적·단위 검증

```text
npm run lint
npm run typecheck
npm run test:run
npm run test:a11y
npm run check:lines
npm run build
node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src/app/App.tsx src/features/calendar-repair/CalendarWorkbench.tsx src/features/calendar-repair/FeedbackPanel.tsx src/features/report/LearningReport.tsx src/styles/app.css src/features/calendar-repair/workbench.css
```

### 동일 브라우저 시나리오

1. 375×812에서 최초 진입 시 `scrollY=0`, eyebrow가 잘리지 않는지 확인한다.
2. 시작 → 요일 7개 → 확인 뒤 `main` 또는 현재 단계가 포커스되고 요일 단계 제목/첫 조작이 viewport에 나타나는지 확인한다.
3. 미션 1에서 자연스러운 오답 → 피드백 확인 → `다시 고치기` 뒤 첫 날짜 버튼에 포커스가 복귀하는지 확인한다.
4. 같은 미션의 정답 제출 뒤 피드백 제목·근거·다음 버튼이 375px에서 읽히는지 확인한다.
5. 미션 6까지 같은 흐름으로 완료하고 결과 화면의 takeaway와 다시 시작/인쇄 행동을 확인한다.
6. 320×800, 375×812, 1280×900에서 가로 넘침, 핵심 CTA 가림, 콘솔 오류, 깨진 자산을 확인한다.
7. 브라우저의 실제 키보드 Tab/Enter/Space/화살표 흐름과 수동 애니메이션 줄이기를 확인한다. VoiceOver는 제외한다.

## 7. 완료 조건

- P0가 없고 EDU-UX-001을 포함한 해결되지 않은 P1이 없다.
- 언어 감사 장부와 시뮬레이션 결정 장부가 실제 상태·증거·검증 상태를 기록한다.
- 같은 시작 상태·같은 viewport·같은 행동 순서로 수정 전후를 비교한다.
- 정적 검사와 브라우저 증거를 각각 독립적으로 남긴다.
- `업데이트 내역`에 2026-08-31 개선 내역을 추가한다.
- 이미지 생성은 실행하지 않았다고 기록한다.
- 초기 점검 계획에서는 커밋·푸시·배포를 별도 승인 단계로 분리했다. 이후 사용자 명시 요청에 따라 커밋·푸시·배포를 완료했다.

## 8. 구현·검증 결과

- EDU-UX-001~004와 EDU-LANG-001을 계획대로 구현했다. 날짜 계산·상태 전이·미션 콘텐츠 계약은 변경하지 않았다.
- 1280×900, 375×812, 320×800 로컬 브라우저에서 진입·단계 전환·오답 복구·정답 피드백·월 경계 오류·완료 기록을 재검증했다.
- 단계 전환 뒤 `main#main-content`가 focus되고 현재 미션 제목과 첫 조작이 보인다. `다시 고치기` 뒤 첫 날짜 버튼으로 focus가 돌아온다.
- `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run test:a11y`, `npm run check:lines`, `npm run build`와 Impeccable detector가 모두 통과했다.
- strict `npm run test:e2e`와 독립적인 200% 확대 시나리오는 이번 패스에서 실행하지 않았다. 따라서 최종 게이트는 `conditional`로 기록한다.
