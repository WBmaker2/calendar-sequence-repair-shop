# 달력 순서 복원소 학습자 UX 감사 장부

- 감사일: 2026-08-31 (KST)
- 모드: `full`
- 대상: [공개 배포본](https://wbmaker2.github.io/calendar-sequence-repair-shop/)
- 기준: `severity-rules.md`, `acceptance-gate.md`, `student-personas.md`, `child-language-rubric.md`, `child-ux-rubric.md`
- 브라우저: Codex In-app Browser
- 제한: 실제 아동 사용자 연구가 아니라 시뮬레이션 휴리스틱과 관찰 가능한 브라우저 증거다. VoiceOver는 범위에서 제외한다.

## 감사 건강 점수 — 기준선

| 영역 | 점수 | 근거 |
|---|---:|---|
| 학습 목표·과제 명료성 | 12/15 | 입구 목표와 미션 목적은 분명하지만 모바일 단계 전환 후 현재 과제가 바로 보이지 않는다. |
| 언어적 가독성·인지부하 | 16/20 | 핵심 지시·오답 회복은 구체적이나 결과 화면의 `실제 세계 전체를 보장`이 추상적이다. |
| 화면 구조·행동 위계 | 8/12 | 달력과 CTA 위계는 좋지만 헤더 포커스가 현재 단계보다 앞선다. |
| 피드백·오류 회복 | 10/13 | 첫 오답은 정답을 숨기고 근거를 주지만 재시도 뒤 키보드 포커스가 끊긴다. |
| 시각적 가독성 | 7/10 | 라이트 모드·큰 글자·대비는 안정적이나 320/375px 상단 클리핑과 CTA 접힘이 있다. |
| 키보드·의미·기본 접근성 | 8/10 | skip link·focus-visible·aria-pressed·모달 경계는 있으나 재시도 포커스 회귀가 있다. |
| 반응형 학습 흐름 | 7/10 | 가로 넘침은 없고 320px 목록 전환도 있으나 모바일 세로 위계가 과도하게 길어진다. |
| 런타임 안정성 | 5/5 | 공개 URL 제목·HTML·로컬 자산이 로드되고 관찰 중 콘솔 치명 오류는 없었다. |
| 맥락적 시각자료·자산 안전 | 5/5 | 기존 장식 SVG는 숫자·요일을 대신하지 않고 실제 학습 정보는 HTML에 있다. |
| 합계 | **78/100** | **conditional — P1 해결과 동일 시나리오 재검증 필요** |

100점 게이트의 세부 영역은 구현 후 독립 증거로 다시 갱신한다. 기준선 점수는 브라우저·소스·자동 검사에서 확인된 범위만 반영했다.

## 감사 건강 점수 — 최종

| 영역 | 점수 | 최종 근거 |
|---|---:|---|
| 학습 목표·과제 명료성 | 14/15 | 단계 전환 뒤 현재 미션 제목과 첫 조작이 모바일 viewport에 나타난다. |
| 언어적 가독성·인지부하 | 18/20 | 결과 한계 문장을 행동 중심으로 바꿨고, 핵심 지시·피드백은 유지했다. 미션 2·4의 긴 지시는 후속 후보로 남겼다. |
| 화면 구조·행동 위계 | 11/12 | `main#main-content`가 단계 전환의 초점·스크롤 기준이 되고 핵심 CTA가 이어진다. |
| 피드백·오류 회복 | 13/13 | 오답 피드백, 재시도 focus 복귀, 정답 다음 CTA, 9월 31일 오류를 브라우저에서 확인했다. |
| 시각적 가독성 | 9/10 | 320/375px 입구의 상단 문구·시작 CTA가 완전히 보이고 라이트 모드를 유지한다. |
| 키보드·의미·기본 접근성 | 9/10 | 화살표로 달력 칸 이동을 확인했고 단위·a11y 검사가 통과했다. VoiceOver는 제외했다. |
| 반응형 학습 흐름 | 9/10 | 320×800, 375×812, 1280×900에서 가로 넘침이 없고 핵심 단계가 보인다. 독립 200% 확대는 미실행이다. |
| 런타임 안정성 | 5/5 | 전체 학습 경로·완료 보고서·콘솔 경고 없음·깨진 이미지 없음. |
| 맥락적 시각자료·자산 안전 | 5/5 | 기존 SVG는 장식으로만 사용하고 달력 정보는 HTML로 유지했다. |
| 합계 | **93/100** | **conditional — P0/P1 미해결 없음; strict E2E·독립 200% 확대 미실행** |

최종 점수는 구현 후 동일 시나리오에서 확인한 개선을 반영한 휴리스틱 점수다. 실제 아동·교사 사용성 연구의 대체값은 아니다.

## P1–P3 이슈

### EDU-UX-001

- Severity: `P1`
- Title: 단계 전환 포커스가 현재 학습 활동을 가린다
- Path/state: 입구 → 시작 → 요일 띠 / 미션 2 진입
- Persona/viewport: 초1–2 민서 / 375×812
- Observed action/result: 시작과 요일 띠 확인 뒤 `activeElement`는 `달력 순서 복원소`; `main`은 `top=631px`, 단계 제목은 `top=663px`, 첫 미션 달력 칸은 `top=819px`.
- Evidence: 2026-08-31 In-app Browser DOM snapshot + `getBoundingClientRect()`.
- Learner impact: 지금 무엇을 해야 하는지와 첫 조작이 첫 화면에 나타나지 않아 모바일 핵심 학습 경로의 발견성이 떨어진다.
- Root-cause hypothesis: `src/app/App.tsx:29-39`가 고정 헤더 h1을 단계 전환 포커스·스크롤 대상으로 사용한다.
- Proposed change: 첫 진입은 자동 이동하지 않고 실제 단계 전환 시 `main#main-content`를 포커스·스크롤 대상으로 사용한다.
- Verification: 동일한 375×812 시작 → 요일 7개 → 확인 시 현재 단계 제목·첫 조작이 viewport에 보이고 main이 focus된다.
- Status: `fixed`

### EDU-UX-002

- Severity: `P2`
- Title: `다시 고치기` 뒤 새 입력으로 키보드 포커스가 복귀하지 않는다
- Path/state: 미션 1 오답 → 피드백 → 재시도
- Persona/viewport: 키보드 사용자 민서 / 375×812
- Observed action/result: `다시 고치기` 클릭 뒤 `document.activeElement`가 body로 돌아가고 첫 날짜 선택 버튼은 화면에 있지만 focus되지 않는다.
- Evidence: 2026-08-31 In-app Browser state check, `scrollY=1024`, 첫 choice `top=185px`.
- Learner impact: 키보드 학습자가 다시 Tab을 여러 번 눌러 새 입력을 찾아야 한다.
- Root-cause hypothesis: `src/features/calendar-repair/CalendarWorkbench.tsx:18-20, 106-110`의 key remount에 후속 focus가 없다.
- Proposed change: retry nonce 변경 후 작업대 내 첫 활성 버튼으로 focus와 근접 스크롤을 이동한다.
- Verification: 동일 오답 후 `다시 고치기`에서 `1일` 버튼이 focus되고 바로 새 답을 선택할 수 있어야 한다.
- Status: `fixed`

### EDU-UX-003

- Severity: `P2`
- Title: 모바일 정답 피드백의 다음 행동이 패널 아래로 이어진다
- Path/state: 미션 1 정답 제출 / 375×812
- Persona/viewport: 초1–2 민서 / 375×812
- Observed action/result: 피드백 제목은 `top=621px`에 focus되지만 accepted 패널 `bottom=876px`로 viewport(812px)를 넘어가며 다음 버튼이 같은 화면에 완전히 들어오지 않는다.
- Evidence: 2026-08-31 In-app Browser state check, accepted feedback snapshot.
- Learner impact: 근거를 읽은 뒤 다음 미션으로 가는 행동을 다시 찾아 스크롤해야 한다.
- Root-cause hypothesis: `src/features/calendar-repair/FeedbackPanel.tsx:23-30`이 `block: "nearest"`만 사용한다.
- Proposed change: 제목을 `block: "start"`로 이동하고 작은 상단 여백을 둔다.
- Verification: 정답·오답 피드백 모두 제목·근거·다음/재시도 행동이 375px viewport에 함께 나타나는지 확인한다.
- Status: `fixed`

### EDU-UX-004

- Severity: `P2`
- Title: 320/375px 입구의 상단 문구와 시작 CTA가 접힘 경계에 놓인다
- Path/state: 입구 최초 진입
- Persona/viewport: 초1–2 민서 / 320×800, 375×812
- Observed action/result: 기존 focus effect 때문에 `scrollY=23–43`, eyebrow `top=-11px`; 320px에서는 시작 버튼 `bottom=797px`로 하단 경계에 닿는다.
- Evidence: 2026-08-31 In-app Browser state check + screenshot.
- Learner impact: 앱 이름과 시작 행동이 첫 화면에서 안정적으로 읽히지 않는다.
- Root-cause hypothesis: 헤더 자동 스크롤과 모바일 영웅 영역의 세로 밀도 조합.
- Proposed change: focus 대상 수정과 함께 40rem 이하 간격, 23.75rem 이하 장식 크기를 조정한다.
- Verification: 최초 진입 `scrollY=0`, eyebrow 전체 노출, 320/375px 시작 버튼 완전 노출.
- Status: `fixed`

### EDU-LANG-001

- Severity: `P2`
- Title: 결과 화면의 모형 한계 문장이 추상적이다
- Path/state: `/report` 완료
- Persona: 초1–2 민서, 초3–4 준호
- Surface: `limit`
- Source/evidence: `src/features/report/LearningReport.tsx:103-104`, 런타임 결과 화면
- Before/after: `이 앱은 2026년 9월 연습 달력을 다루는 교육 모형이며 실제 세계 전체를 보장하지 않아요.` → `이 기록은 2026년 9월 연습 달력으로 만든 교육 모형이에요. 다른 달력의 날짜는 직접 확인해 보세요.`
- Difficulty signals: `abstract-or-formal`, `missing-recovery`
- Learning intent preserved: `yes`
- Curriculum accuracy: `confirmed` against `docs/content-review.md` scope
- Comprehension probe: 용어 설명 + 전이 행동 — “이 기록은 연습용 달력으로 만든 것이고, 다른 달력은 직접 확인한다”로 재진술하도록 확인한다.
- Verification: 동일 완료 경로의 결과 상태에서 변환 문구가 실제로 표시되는지 확인한다.
- Status: `fixed`

## 긍정적 발견

- 실제 날짜·요일·선택 상태는 HTML DOM과 `aria-pressed`로 제공되어 생성 이미지가 학습 근거를 대신하지 않는다.
- 첫 오답은 정답을 즉시 공개하지 않고 달력에서 다시 세어 보라는 회복 단서를 준다.
- `skip-link`, `focus-visible`, 모달 `aria-labelledby`/Tab 경계, 320px 달력 목록 전환, reduced motion 대체가 이미 있다.
- 점수·순위 대신 최초 판단·근거·수정 결과를 기록해 학습 설명과 교사 안내에 적합하다.
- 기준선 320/375px에서 `scrollWidth <= clientWidth`로 가로 넘침은 관찰되지 않았다.

## 전문 라우팅과 자산 판정

- `design-system`: 기존 `design-system/MASTER.md` 토큰·컴포넌트·반응형 기준을 재사용한다.
- `impeccable audit`: 코드 수준 품질과 detector를 최종 정적 검증에 사용한다.
- `redesign-existing-projects`: 기존 스택·상태·콘텐츠를 보존하는 표적 개선 원칙을 적용한다.
- `ui-ux-pro-max`: 이번 런타임 직접 로드는 불가하여 기존에 승인된 시스템 문서를 사용한다.
- 시뮬레이션: `not-needed`; 전문 Canvas/WebGL 라우팅은 호출하지 않는다.
- 이미지: 새 생성/핫링크/폰트 추가 없음; `friendly-paper-calendar.svg` 보존.

## 최종 게이트

- P0: 없음.
- P1: EDU-UX-001 해결. 단계 전환 뒤 active element는 `main#main-content`이며 375×812에서 현재 미션 제목·첫 조작이 보인다.
- 동일 시나리오: 입구 → 요일 띠 → 미션 1 오답/재시도/정답 → 미션 2 → 미션 6 월 경계 오류/정답 → 결과 기록을 로컬 브라우저에서 완료했다.
- 정적 검사: lint, typecheck, 108개 단위 테스트, 5개 a11y 테스트, 줄 수 검사, production build, Impeccable detector 모두 통과했다.
- 브라우저 추가 확인: 1280×900, 375×812, 320×800, reduced motion, 업데이트 내역 모달, 콘솔 경고·깨진 이미지 없음.
- 미실행: strict `npm run test:e2e`, 독립 200% 확대 시나리오, VoiceOver 검증.
