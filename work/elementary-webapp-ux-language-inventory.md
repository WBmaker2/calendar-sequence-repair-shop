# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/calendar-sequence-repair-shop/src`
- Files scanned: `39`
- Candidates: `664`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| accessibility/AccessibilityToolbar.tsx:4:13 | text | 보통 | learner-text-candidate | — |
| accessibility/AccessibilityToolbar.tsx:5:13 | text | 크게 | learner-text-candidate | — |
| accessibility/AccessibilityToolbar.tsx:6:13 | text | 아주 크게 | learner-text-candidate | — |
| accessibility/AccessibilityToolbar.tsx:22:17 | text | { document.documentElement.classList.remove("reduce-motion"); }; }, [reduceMotion]); return ( | learner-text-candidate | long-or-dense |
| accessibility/AccessibilityToolbar.tsx:28:69 | aria-label | 화면 도구 | aria-label | — |
| accessibility/AccessibilityToolbar.tsx:29:39 | text | 글자 크기 | learner-text-candidate | — |
| accessibility/AccessibilityToolbar.tsx:46:8 | text | 애니메이션 줄이기 | button-or-action | repeated-text |
| app/App.test.tsx:7:20 | text | 테스트용 렌더링 오류 | feedback-or-error | — |
| app/App.test.tsx:10:11 | text | App 셸 | learner-text-candidate | — |
| app/App.test.tsx:11:7 | text | 앱 제목과 입구를 렌더링한다 | learner-text-candidate | — |
| app/App.test.tsx:13:30 | text | heading | heading | repeated-text |
| app/App.test.tsx:13:59 | text | 달력 순서 복원소 | heading | repeated-text |
| app/App.test.tsx:14:46 | text | 활동으로 건너뛰기 | learner-text-candidate | repeated-text |
| app/App.test.tsx:19:30 | text | button | button-or-action | repeated-text |
| app/App.test.tsx:19:48 | text | 달력 복원 시작하기 | button-or-action | repeated-text |
| app/App.test.tsx:22:7 | text | 시작하면 큰 제목으로 초점이 옮겨지고 요일 띠 단계가 된다 | learner-text-candidate | — |
| app/App.test.tsx:25:40 | text | button | button-or-action | repeated-text |
| app/App.test.tsx:25:58 | text | 달력 복원 시작하기 | button-or-action | repeated-text |
| app/App.test.tsx:27:32 | text | heading | heading | repeated-text |
| app/App.test.tsx:27:61 | text | 달력 순서 복원소 | heading | repeated-text |
| app/App.test.tsx:29:30 | text | heading | heading | repeated-text |
| app/App.test.tsx:29:49 | text | 요일 띠 확인 | heading | repeated-text |
| app/App.test.tsx:32:7 | text | 업데이트 내역 대화상자는 닫으면 초점을 호출 버튼으로 돌려 준다 | learner-text-candidate | — |
| app/App.test.tsx:35:42 | text | button | button-or-action | repeated-text |
| app/App.test.tsx:35:60 | text | 업데이트 내역 | button-or-action | repeated-text |
| app/App.test.tsx:37:56 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| app/App.test.tsx:44:52 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| app/App.test.tsx:49:7 | text | 애니메이션 줄이기 토글이 문서 클래스를 바꾼다 | learner-text-candidate | — |
| app/App.test.tsx:52:38 | text | button | button-or-action | repeated-text |
| app/App.test.tsx:52:56 | text | 애니메이션 줄이기 | button-or-action | repeated-text |
| app/App.test.tsx:62:11 | text | ErrorBoundary | feedback-or-error | — |
| app/App.test.tsx:63:7 | text | 렌더링 오류 시 어린이용 안내만 보여 주고 다시 시작을 제공한다 | feedback-or-error, instruction | — |
| app/App.test.tsx:66:45 | text | error | feedback-or-error | — |
| app/App.test.tsx:66:77 | text | undefined); render( | feedback-or-error | technical-or-internal |
| app/App.test.tsx:73:30 | text | 활동을 다시 불러오지 못했어요. | learner-text-candidate | repeated-text, shaming-tone |
| app/App.test.tsx:75:40 | text | button | button-or-action | repeated-text |
| app/App.test.tsx:75:58 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| app/App.tsx:36:44 | text | function | heading | repeated-text |
| app/App.tsx:37:40 | text | start | heading | — |
| app/App.tsx:37:59 | text | auto | heading | repeated-text |
| app/App.tsx:50:67 | text | ; }; return ( | feedback-or-error | — |
| app/App.tsx:54:55 | text | RESTART_CONFIRMED | feedback-or-error | repeated-text |
| app/App.tsx:56:55 | text | 활동으로 건너뛰기 | learner-text-candidate | repeated-text |
| app/App.tsx:61:40 | text | 2026년 9월 · 탐구형 달력 학습 | learner-text-candidate | — |
| app/App.tsx:62:74 | text | 달력 순서 복원소 | heading | repeated-text |
| app/App.tsx:79:14 | text | 2026년 9월 실제 달력으로 연습해요 · 응답은 저장·전송되지 않아요 | learner-text-candidate | — |
| app/ErrorBoundary.tsx:2:44 | text | react | feedback-or-error | repeated-text |
| app/ErrorBoundary.tsx:7:28 | text | void; } interface ErrorBoundaryState { readonly hasError: boolean; } /** * 학생에게는 기술 정보 없이 어린이용 안내만 보여 준다. * 오류 기록은 콘솔 외 어디에도 저장·전송하지 않는다. */ export default class ErrorBoundary extends Component | feedback-or-error, instruction | long-or-dense, technical-or-internal |
| app/ErrorBoundary.tsx:29:32 | text | { this.setState({ hasError: false }); this.props.onRestart(); }; render(): ReactNode { if (this.state.hasError) { return ( | feedback-or-error | long-or-dense, technical-or-internal |
| app/ErrorBoundary.tsx:38:15 | text | 활동을 다시 불러오지 못했어요. | heading | repeated-text, shaming-tone |
| app/ErrorBoundary.tsx:39:14 | text | 달력 복원 활동을 처음부터 다시 시작할 수 있어요. | learner-text-candidate | — |
| app/ErrorBoundary.tsx:40:34 | text | primary | learner-text-candidate | repeated-text |
| app/ErrorBoundary.tsx:40:72 | text | 처음부터 다시 하기 | learner-text-candidate | repeated-text |
| app/sessionReducer.test.ts:45:11 | text | 초기 상태 | learner-text-candidate | — |
| app/sessionReducer.test.ts:46:7 | text | 입구에서 시작하고 6개 미션 기록이 비어 있다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:59:7 | text | 알 수 없는 action은 상태를 바꾸지 않는다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:66:11 | text | 단계 전이 잠금 | learner-text-candidate | — |
| app/sessionReducer.test.ts:67:7 | text | 입구에서만 시작할 수 있다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:74:7 | text | 요일 띠 확인은 요일 띠 단계에서만 통과한다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:83:7 | text | 필수 응답 없이는 다음 단계로 가지 않는다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:89:11 | text | 응답 제출 잠금 | learner-text-candidate | abstract-or-formal |
| app/sessionReducer.test.ts:90:7 | text | 범위를 벗어난 missionIndex 제출은 무시한다 | learner-text-candidate | abstract-or-formal |
| app/sessionReducer.test.ts:109:7 | text | 현재 미션이 아닌 제출은 무시한다 | learner-text-candidate | abstract-or-formal |
| app/sessionReducer.test.ts:120:7 | text | 이전 revision 응답은 상태를 바꾸지 않는다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:146:11 | text | 정답·수정 흐름 | feedback-or-error | — |
| app/sessionReducer.test.ts:147:7 | text | 첫 제출이 정답이면 완료되고 다음 미션으로 진행한다 | feedback-or-error | abstract-or-formal |
| app/sessionReducer.test.ts:165:7 | text | 오답 뒤 한 번의 수정 기회를 주고 수정 결과를 기록한다 | feedback-or-error | — |
| app/sessionReducer.test.ts:188:7 | text | 수정 기회를 모두 쓰면 결과를 기록하고 진행을 허용한다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:216:11 | text | 전체 학습 흐름 | learner-text-candidate | — |
| app/sessionReducer.test.ts:217:7 | text | 여섯 미션을 마치면 기록 단계에 도착한다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:244:7 | text | 기록 단계에서는 응답과 뒤로 가기가 잠긴다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:257:11 | text | 뒤로 가기와 다시 시작 | learner-text-candidate | — |
| app/sessionReducer.test.ts:258:7 | text | 뒤로 가도 응답을 보존한다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:271:7 | text | 뒤로 가면 완료하지 못한 단계의 마지막 미션으로 돌아간다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:292:7 | text | 다시 시작하면 초기 상태를 새 객체로 만든다 | learner-text-candidate | — |
| app/sessionReducer.test.ts:302:11 | text | 불변성 | learner-text-candidate | — |
| app/sessionReducer.test.ts:303:7 | text | 이전 상태를 변경하지 않는다 | learner-text-candidate | — |
| app/sessionReducer.ts:71:39 | text | ({ missionId: mission.id, responses: [], firstEvaluation: null, finalEvaluation: null, completed: false, })), weekdayStripConfirmed: false, finished: false, }; } function expectedRevision(record: MissionRecord): 0 \| 1 \| null { if (record.completed) return null; if (record.responses.length === 0) return 0; const first = record.responses[0]; if (record.responses.length === 1 && first && !first.evaluation.accepted) return 1; return null; } export function correctAnswer(missionIndex: number): CalendarAnswer { const mission = MISSIONS[missionIndex]; const canonical = mission?.expectedAnswers[0]; if (!mission \|\| !canonical) { throw new Error(`승인된 정답이 없는 미션입니다: ${String(mission?.id ?? missionIndex)}`); } return canonical; } /** 테스트와 수정-기회 시연용 오답 예시. 판정은 항상 evaluateCalendarRepair가 수행한다. */ export function wrongAnswer(missionIndex: number): CalendarAnswer { const id = MISSIONS[missionIndex]?.id; switch (id) { case "calendar-gap-01": return { selectedDates: ["2026-09-04"], relation: "next-day", weekday: "Friday" }; case "calendar-week-02": return { selectedDates: ["2026-09-07", "2026-09-09"], relation: "seven-days-after", weekday: "Monday", }; case "calendar-yesterday-03": return { selectedDates: ["2026-09-12", "2026-09-16"], relation: "previous-day" }; case "calendar-after-seven-04": return { selectedDates: ["2026-09-14"], relation: "seven-days-after", weekday: "Tuesday" }; case "calendar-order-05": return { selectedDates: ["2026-09-12", "2026-09-05", "2026-09-21"], relation: "chronological-order", }; case "calendar-month-06": return { selectedDates: ["2026-09-30"], relation: "month-boundary", weekday: "Wednesday" }; default: throw new Error(`오답 예시가 정의되지 않은 미션입니다: ${String(id)}`); } } export function sessionReducer(state: SessionState, action: SessionAction): SessionState { switch (action.type) { case "START_SESSION": { if (state.step !== "INTRO") return state; return { ...state, step: "WEEKDAY_STRIP" }; } case "CONFIRM_WEEKDAY_STRIP": { if (state.step !== "WEEKDAY_STRIP") return state; return { ...state, step: "PREDICT", missionIndex: 0, weekdayStripConfirmed: true }; } case "SUBMIT_RESPONSE": { if (!MISSION_STEP_VALUES.has(state.step)) return state; const { missionIndex, revision, answer } = action; if (missionIndex !== state.missionIndex) return state; if (missionIndex | button-or-action, feedback-or-error | abstract-or-formal, long-or-dense, technical-or-internal |
| app/sessionReducer.ts:95:22 | text | 승인된 정답이 없는 미션입니다: ${String(mission?.id ?? missionIndex)} | feedback-or-error | long-or-dense, technical-or-internal |
| app/sessionReducer.ts:124:24 | text | 오답 예시가 정의되지 않은 미션입니다: ${String(id)} | feedback-or-error | technical-or-internal |
| assets/assetManifest.test.tsx:11:11 | text | 생성 자산 권리 장부 1:1 대응 | learner-text-candidate | — |
| assets/assetManifest.test.tsx:12:7 | text | 권리 장부 문서가 존재한다 | learner-text-candidate | — |
| assets/assetManifest.test.tsx:16:7 | text | generated 디렉터리의 모든 자산이 장부에 기록되어 있다 | learner-text-candidate | — |
| assets/assetManifest.test.tsx:25:7 | text | 장부에 적힌 모든 자산이 실제로 존재한다 | learner-text-candidate | — |
| assets/assetManifest.test.tsx:37:11 | text | 장식 자산 내용 한계 | learner-text-candidate | — |
| assets/assetManifest.test.tsx:38:7 | text | 입구 일러스트에 글자·숫자가 없고 장식으로만 제공된다 | learner-text-candidate | — |
| assets/assetManifest.test.tsx:43:24 | text | /g, " ") .replace(/xmlns[^ ]*/g, " "); expect(visibleContent).not.toMatch(/[0-9]/); expect(visibleContent).not.toMatch(/[가-힣]/); expect(visibleContent).not.toMatch(/[A-Za-z]{2,}/); render( | learner-text-candidate | long-or-dense |
| components/ActionButton.tsx:1:55 | text | react | learner-text-candidate | repeated-text |
| components/ActionButton.tsx:3:76 | text | { readonly variant?: "primary" \| "secondary" \| "ghost"; readonly pulse?: boolean; readonly children: ReactNode; } export default function ActionButton({ variant = "primary", pulse = false, className, children, ...buttonProps }: ActionButtonProps) { const classes = [ "action-button", `action-button--${variant}`, pulse ? "gi-pulse" : "", className ?? "", ] .filter(Boolean) .join(" "); return ( | button-or-action | long-or-dense, technical-or-internal |
| components/ActionButton.tsx:17:6 | text | action-button | button-or-action | — |
| components/ActionButton.tsx:18:6 | text | action-button--${variant} | button-or-action | missing-term-explanation, technical-or-internal |
| components/ModalDialog.test.tsx:6:7 | text | 열린 대화상자 안에서 Tab 초점이 순환한다 | learner-text-candidate | — |
| components/ModalDialog.test.tsx:6:45 | text | { const user = userEvent.setup(); render( | learner-text-candidate | — |
| components/ModalDialog.test.tsx:10:32 | title | 키보드 확인 | title | — |
| components/ModalDialog.test.tsx:11:31 | text | 첫 번째 선택 | button-or-action | repeated-text |
| components/ModalDialog.test.tsx:12:31 | text | 두 번째 선택 | button-or-action | repeated-text |
| components/ModalDialog.test.tsx:16:43 | text | button | button-or-action | repeated-text |
| components/ModalDialog.test.tsx:16:61 | text | 닫기 | button-or-action | repeated-text |
| components/ModalDialog.test.tsx:17:43 | text | button | button-or-action | repeated-text |
| components/ModalDialog.test.tsx:17:61 | text | 첫 번째 선택 | button-or-action | repeated-text |
| components/ModalDialog.test.tsx:18:44 | text | button | button-or-action | repeated-text |
| components/ModalDialog.test.tsx:18:62 | text | 두 번째 선택 | button-or-action | repeated-text |
| components/ModalDialog.tsx:7:26 | text | void; readonly children: ReactNode; } export default function ModalDialog({ open, title, onClose, children }: ModalDialogProps) { const closeButtonRef = useRef | learner-text-candidate | long-or-dense, technical-or-internal |
| components/ModalDialog.tsx:12:51 | text | (null); const modalPanelRef = useRef | learner-text-candidate | technical-or-internal |
| components/ModalDialog.tsx:35:12 | text | a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]) | button-or-action, input | long-or-dense |
| components/ModalDialog.tsx:84:12 | text | 닫기 | button-or-action | repeated-text |
| components/ProgressSteps.tsx:2:4 | text | 요일 띠 확인 | learner-text-candidate | repeated-text |
| components/ProgressSteps.tsx:3:4 | text | 빈 칸 예측 | learner-text-candidate | — |
| components/ProgressSteps.tsx:4:4 | text | 달력 칸 선택 | learner-text-candidate | — |
| components/ProgressSteps.tsx:5:4 | text | 관계 카드 | learner-text-candidate | — |
| components/ProgressSteps.tsx:6:4 | text | 일주일 관계 | learner-text-candidate | — |
| components/ProgressSteps.tsx:7:4 | text | 월 경계 | learner-text-candidate | — |
| components/ProgressSteps.tsx:8:4 | text | 달력 기록 | learner-text-candidate | — |
| components/ProgressSteps.tsx:17:49 | aria-label | 학습 진도 | aria-label | — |
| components/ProgressSteps.tsx:19:42 | text | { const stateClass = index === currentIndex ? "is-current" : index | learner-text-candidate | long-or-dense, technical-or-internal |
| components/ProgressSteps.tsx:23:92 | text | step | learner-text-candidate | — |
| components/ProgressSteps.tsx:24:67 | text | {index | learner-text-candidate | — |
| components/UpdateHistoryButton.tsx:15:8 | text | 업데이트 내역 | button-or-action | repeated-text |
| components/UpdateHistoryButton.tsx:18:39 | title | 업데이트 내역 | title | repeated-text |
| components/UpdateHistoryButton.tsx:19:45 | text | 이 앱이 바뀐 기록이에요. 최신 날짜가 가장 위에 있어요. | learner-text-candidate | — |
| components/UpdateHistoryButton.tsx:24:23 | text | ${entry.date}-${entry.title} | learner-text-candidate | — |
| components/UpdateHistoryButton.tsx:26:46 | text | — {entry.title} | learner-text-candidate | — |
| content/missions.test.ts:23:11 | text | 고정 미션 데이터 | learner-text-candidate | — |
| content/missions.test.ts:24:7 | text | 정확히 6개 미션을 계획된 순서로 제공한다 | learner-text-candidate | — |
| content/missions.test.ts:31:7 | text | 모든 미션 ID가 유일하고 검수 메타데이터를 가진다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| content/missions.test.ts:43:7 | text | 모든 DateKey가 실제 달력에 존재하고 visible·hidden이 겹치지 않는다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| content/missions.test.ts:57:7 | text | 숨긴 칸은 곧 복원해야 할 정답 날짜다 | feedback-or-error | — |
| content/missions.test.ts:64:11 | text | 미션 정답과 실제 UTC 달력의 일치 | feedback-or-error | technical-or-internal |
| content/missions.test.ts:65:7 | text | 빠진 날짜 미션은 9월 3일 목요일이다 | learner-text-candidate | — |
| content/missions.test.ts:72:7 | text | 같은 월요일 미션은 9월 7일과 14일, 차이 7일이다 | learner-text-candidate | — |
| content/missions.test.ts:80:7 | text | 어제·내일 미션은 13일 일요일과 15일 화요일이다 | learner-text-candidate | — |
| content/missions.test.ts:87:7 | text | 일주일 뒤 미션은 9월 15일 화요일이다 | learner-text-candidate | — |
| content/missions.test.ts:94:7 | text | 순서 배열 미션은 5일→12일→21일이다 | learner-text-candidate | — |
| content/missions.test.ts:101:7 | text | 월 경계 미션은 2026년 10월 1일 목요일이다 | learner-text-candidate | — |
| content/missions.test.ts:106:50 | text | 2026년 10월 1일 목요일 | learner-text-candidate | repeated-text |
| content/missions.test.ts:109:7 | text | 여섯 미션 모두 승인된 정답으로 판정을 통과한다 | feedback-or-error | — |
| content/missions.test.ts:112:39 | text | 정답이 없는 미션: ${mission.id} | feedback-or-error | technical-or-internal |
| content/missions.test.ts:119:11 | text | 콘텐츠 검수기 통합 | learner-text-candidate | — |
| content/missions.test.ts:120:7 | text | 실제 미션 데이터는 검수기를 통과한다 | learner-text-candidate | — |
| content/missions.ts:17:8 | text | 2026년 9월 실제 그레고리력 fixture. 9월 1일은 화요일이고 3일은 목요일이다. docs/content-review.md 검수. | learner-text-candidate | long-or-dense |
| content/missions.ts:20:8 | text | 앞뒤 칸의 날짜와 요일 근거 없이 빈 칸을 임의로 채우지 않도록 안내한다. | instruction | — |
| content/missions.ts:42:8 | text | 2026년 9월 7일과 14일은 실제로 모두 월요일이고 7일 차이가 난다. docs/content-review.md 검수. | learner-text-candidate | long-or-dense |
| content/missions.ts:45:8 | text | 같은 요일의 날짜는 7일 차이로 이어진다는 근거를 확인하게 하고, 아무 날짜나 같은 요일로 보지 않게 한다. | learner-text-candidate | long-or-dense |
| content/missions.ts:57:8 | text | 2026년 9월 14일은 월요일이고 13일은 일요일, 15일은 화요일이다. docs/content-review.md 검수. | learner-text-candidate | long-or-dense |
| content/missions.ts:60:8 | text | 어제와 내일을 요일 감으로 정하지 않고 달력 칸 위치 근거로 연결하게 한다. | learner-text-candidate | — |
| content/missions.ts:71:8 | text | 2026년 9월 8일은 화요일이고 7일 뒤인 15일도 화요일이다. docs/content-review.md 검수. | learner-text-candidate | long-or-dense |
| content/missions.ts:74:8 | text | 일주일 뒤를 5일이나 10일 뒤와 혼동하지 않게 7일 뒤 같은 요일 근거를 제시한다. | learner-text-candidate | — |
| content/missions.ts:88:8 | text | 가상 행사(도서관 9월 5일 토, 화단 9월 12일 토, 체육 9월 21일 월)의 실제 날짜 순서. docs/content-review.md 검수. | learner-text-candidate | long-or-dense |
| content/missions.ts:91:8 | text | 요일만 보고 순서를 판단하지 않게 날짜 숫자가 커지는 근거를 제시한다. | learner-text-candidate | — |
| content/missions.ts:102:8 | text | 2026년 9월 30일은 수요일이고 다음 날은 10월 1일 목요일이다. docs/content-review.md 검수. | learner-text-candidate | long-or-dense |
| content/missions.ts:105:8 | text | 9월은 30일까지임을 확인하게 하고 9월 31일이 존재한다는 오개념을 막는다. | learner-text-candidate | — |
| content/missions.ts:114:22 | text | 검수된 미션 목록에 없는 ID입니다: ${id} | feedback-or-error | technical-or-internal |
| content/validateContent.test.ts:14:7 | text | 검수된 6개 미션에서는 문제가 없다 | learner-text-candidate | — |
| content/validateContent.test.ts:18:7 | text | 미션 수가 6개가 아니면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:22:7 | text | 미션 ID가 중복되거나 계획과 다르면 실패한다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| content/validateContent.test.ts:27:7 | text | 달력에 없는 날짜가 있으면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:39:7 | text | visibleDates와 hiddenDates가 겹치면 실패한다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| content/validateContent.test.ts:48:7 | text | 검수 상태가 approved가 아니면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:57:7 | text | sourceNote나 misconceptionGuard가 비면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:66:7 | text | 기대 정답의 요일이 실제 달력과 다르면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:80:7 | text | 다음 날 관계인데 날짜가 실제 계산과 다르면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:94:7 | text | 순서 배열 정답이 날짜 빠른 순서가 아니면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:111:7 | text | 기대 정답이 하나도 없으면 실패한다 | feedback-or-error | — |
| content/validateContent.test.ts:116:7 | text | assertContentValid는 문제 목록을 모아 던진다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| content/validateContent.ts:39:19 | text | ${mission.id}: 달력에 없는 날짜입니다 (${String(date)}). | learner-text-candidate | technical-or-internal |
| content/validateContent.ts:51:17 | text | ${mission.id}: 승인된 기대 정답이 최소 1개 있어야 합니다. | feedback-or-error | technical-or-internal |
| content/validateContent.ts:60:19 | text | ${mission.id}: 알 수 없는 관계입니다 (${expected.relation}). | learner-text-candidate | long-or-dense, technical-or-internal |
| content/validateContent.ts:71:19 | text | ${mission.id}: 기대 정답에 날짜 선택이 없습니다. | feedback-or-error | technical-or-internal |
| content/validateContent.ts:83:21 | text | ${mission.id}: 정답 날짜 ${date}의 실제 요일이 승인된 요일(${expected.weekday})과 다릅니다. | feedback-or-error | long-or-dense, technical-or-internal |
| content/validateContent.ts:94:21 | text | ${mission.id}: 7일 관계 정답 ${date}은 기준 날짜와 같은 요일이어야 합니다. | feedback-or-error | technical-or-internal |
| content/validateContent.ts:111:23 | text | ${mission.id}: 다음 날 정답 ${date}의 하루 전 칸이 미션 달력에 없습니다. | feedback-or-error | technical-or-internal |
| content/validateContent.ts:126:21 | text | ${mission.id}: 어제·내일 정답은 기준 날짜의 실제 전날과 다음 날이어야 합니다. | feedback-or-error | technical-or-internal |
| content/validateContent.ts:138:25 | text | ${mission.id}: 월 경계 정답 ${date}은 기준 날짜의 다음 날이어야 합니다. | feedback-or-error | technical-or-internal |
| content/validateContent.ts:152:23 | text | ${mission.id}: 순서 배열 정답은 날짜가 빠른 순서대로 늘어야 합니다 (${earlier} → ${later}). | feedback-or-error | long-or-dense, technical-or-internal |
| content/validateContent.ts:168:17 | text | 미션은 정확히 6개여야 합니다 (현재 ${missions.length}개). | learner-text-candidate | — |
| content/validateContent.ts:173:45 | text | (ids); if (uniqueIds.size !== ids.length) { issues.push({ code: "mission-id", message: "미션 ID가 중복됩니다.", }); } const plannedIds = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| content/validateContent.ts:177:17 | text | 미션 ID가 중복됩니다. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| content/validateContent.ts:180:37 | text | (MISSION_IDS); for (const id of ids) { if (!plannedIds.has(id)) { issues.push({ code: "mission-id", message: `계획에 없는 미션 ID입니다: ${id}`, }); } } for (const mission of missions) { issues.push(...collectDateIssues(mission)); const visible = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| content/validateContent.ts:185:19 | text | 계획에 없는 미션 ID입니다: ${id} | learner-text-candidate | technical-or-internal |
| content/validateContent.ts:193:36 | text | (mission.visibleDates); for (const hidden of mission.hiddenDates) { if (visible.has(hidden)) { issues.push({ code: "visible-hidden-overlap", message: `${mission.id}: 날짜 ${hidden}이 보이는 칸과 숨긴 칸에 동시에 있습니다.`, }); } } if (!visible.has(mission.anchorDate) && !mission.hiddenDates.includes(mission.anchorDate)) { issues.push({ code: "anchor-universe", message: `${mission.id}: 기준 날짜 ${mission.anchorDate}가 미션 달력에 없습니다.`, }); } issues.push(...collectAnswerIssues(mission)); if (mission.reviewStatus !== "approved") { issues.push({ code: "review-status", message: `${mission.id}: 검수 상태가 approved가 아닙니다 (${mission.reviewStatus}).`, }); } for (const [field, value] of [ ["sourceNote", mission.sourceNote], ["misconceptionGuard", mission.misconceptionGuard], ] as const) { if (value.length | learner-text-candidate | long-or-dense, technical-or-internal |
| content/validateContent.ts:198:21 | text | ${mission.id}: 날짜 ${hidden}이 보이는 칸과 숨긴 칸에 동시에 있습니다. | learner-text-candidate | technical-or-internal |
| content/validateContent.ts:205:19 | text | ${mission.id}: 기준 날짜 ${mission.anchorDate}가 미션 달력에 없습니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| content/validateContent.ts:214:19 | text | ${mission.id}: 검수 상태가 approved가 아닙니다 (${mission.reviewStatus}). | learner-text-candidate | long-or-dense, technical-or-internal |
| content/validateContent.ts:224:21 | text | ${mission.id}: ${field}가 비어 있거나 한국어 검수 문장이 아닙니다. | learner-text-candidate | technical-or-internal |
| content/validateContent.ts:239:22 | text | 검수되지 않은 미션 콘텐츠입니다: ${details} | feedback-or-error | — |
| domain/calendarMath.test.ts:23:18 | text | 2026년 9월 실제 달력 fixture (docs/content-review.md) | learner-text-candidate | — |
| domain/calendarMath.test.ts:25:26 | text | 앞뒤 칸 근거 없이 빈 칸을 임의로 채우지 않도록 안내한다. | instruction | — |
| domain/calendarMath.test.ts:31:7 | text | zero-padded 실제 달력 날짜를 허용한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:39:7 | text | 잘못된 날짜 6건을 거부한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:50:7 | text | 2026년 9~10월 고정 요일 fixture와 일치한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:67:11 | text | nextDate와 previousDate | learner-text-candidate | — |
| domain/calendarMath.test.ts:68:7 | text | 어제·내일 8건을 월·연도 경계까지 정확히 계산한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:79:7 | text | 연말 경계와 평년 2월 끝을 처리한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:86:7 | text | 존재하지 않는 9월 31일 입력을 거부한다 | input | abstract-or-formal |
| domain/calendarMath.test.ts:93:7 | text | 일주일 뒤 6건을 같은 요일로 계산한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:108:7 | text | 음수 이동도 지원한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:115:7 | text | 같은 월요일 사이는 7이다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:123:7 | text | 한국어 화면 표기로 바꾼다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:124:50 | text | 2026년 9월 3일 목요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.test.ts:125:50 | text | 2026년 9월 30일 수요일 | learner-text-candidate | — |
| domain/calendarMath.test.ts:126:50 | text | 2026년 10월 1일 목요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.test.ts:130:11 | text | 시간대 독립성 | learner-text-candidate | — |
| domain/calendarMath.test.ts:133:7 | text | 서버 시간대를 바꿔도 결과가 변하지 않는다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:156:7 | text | 빠진 날짜 정답을 받아들이고 근거를 한국어로 반환한다 | feedback-or-error | — |
| domain/calendarMath.test.ts:174:7 | text | 오답에는 정답을 공개하지 않는 힌트 근거를 준다 | feedback-or-error, hint | — |
| domain/calendarMath.test.ts:184:39 | text | 9월 3일 | learner-text-candidate | repeated-text |
| domain/calendarMath.test.ts:188:7 | text | 요일이 다르면 거부한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:198:7 | text | 잘못된 날짜·빈 선택·모르는 관계·범위 밖 날짜를 거부한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:229:7 | text | 어제·내일 쌍 답을 복수 해법으로 받아들이고 부분 답은 거부한다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:259:7 | text | 순서 배열 답은 순서까지 정확해야 받아들인다 | learner-text-candidate | — |
| domain/calendarMath.test.ts:285:7 | text | 일주일 뒤와 월 경계 정답을 받아들인다 | feedback-or-error | — |
| domain/calendarMath.test.ts:318:58 | text | 10월 1일 | learner-text-candidate | repeated-text |
| domain/calendarMath.test.ts:322:11 | text | 순수성 | learner-text-candidate | — |
| domain/calendarMath.test.ts:323:7 | text | 입력을 변경하지 않고 readonly 배열을 받는다 | input | abstract-or-formal |
| domain/calendarMath.ts:20:48 | text | = { Sunday: "일요일", Monday: "월요일", Tuesday: "화요일", Wednesday: "수요일", Thursday: "목요일", Friday: "금요일", Saturday: "토요일", }; const RELATIONS: readonly string[] = [ "previous-day", "next-day", "seven-days-after", "chronological-order", "month-boundary", ]; const DATE_KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/; const MS_PER_DAY = 86_400_000; export function isLeapYear(year: number): boolean { return (year % 4 === 0 && year % 100 !== 0) \|\| year % 400 === 0; } export function daysInMonth(year: number, month: number): number { const lengths = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; if (!Number.isInteger(year) \|\| !Number.isInteger(month) \|\| month | learner-text-candidate | long-or-dense, technical-or-internal |
| domain/calendarMath.ts:21:12 | text | 일요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:22:12 | text | 월요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:23:13 | text | 화요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:24:15 | text | 수요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:25:14 | text | 목요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:26:12 | text | 금요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:27:14 | text | 토요일 | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:47:82 | text | 12) { throw new RangeError(`잘못된 달입니다: ${year}-${month}`); } return lengths[month - 1]; } export function isValidDateKey(value: string): value is DateKey { const match = DATE_KEY_PATTERN.exec(value); if (!match) return false; const year = Number(match[1]); const month = Number(match[2]); const day = Number(match[3]); if (month | feedback-or-error | long-or-dense, technical-or-internal |
| domain/calendarMath.ts:48:27 | text | 잘못된 달입니다: ${year}-${month} | feedback-or-error | — |
| domain/calendarMath.ts:66:27 | text | 달력에 없는 날짜입니다: ${String(key)} | feedback-or-error | — |
| domain/calendarMath.ts:112:11 | text | ${year}년 ${month}월 ${day}일 ${WEEKDAY_NAMES_KO[weekdayOf(key)]} | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:126:43 | text | date === sortedRight[index]); } function answersEquivalent(answer: CalendarAnswer, expected: CalendarAnswer): boolean { if (answer.relation !== expected.relation) return false; if ((answer.weekday ?? null) !== (expected.weekday ?? null)) return false; return sameDates( answer.selectedDates, expected.selectedDates, answer.relation === "chronological-order", ); } function acceptanceEvidence(mission: CalendarMission, answer: CalendarAnswer): string[] { const anchorText = formatKoreanDate(mission.anchorDate); switch (answer.relation) { case "next-day": { const lines: string[] = []; for (const date of answer.selectedDates) { lines.push( `${formatKoreanDate(previousDate(date))}의 다음 날은 ${formatKoreanDate(date)}이에요.`, ); } lines.push("달력에서 날짜가 하루에 하나씩 커지는 규칙을 확인했어요."); return lines; } case "previous-day": { const lines: string[] = []; for (const date of answer.selectedDates) { if (epochDay(date) | learner-text-candidate | long-or-dense, technical-or-internal |
| domain/calendarMath.ts:146:12 | text | ${formatKoreanDate(previousDate(date))}의 다음 날은 ${formatKoreanDate(date)}이에요. | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:149:19 | text | 달력에서 날짜가 하루에 하나씩 커지는 규칙을 확인했어요. | learner-text-candidate | — |
| domain/calendarMath.ts:156:23 | text | 오늘 ${anchorText}의 어제는 ${formatKoreanDate(date)}이에요. | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:158:23 | text | 오늘 ${anchorText}의 내일은 ${formatKoreanDate(date)}이에요. | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:161:19 | text | 달력 칸에서 하루 전과 하루 뒤를 나란히 확인했어요. | learner-text-candidate | — |
| domain/calendarMath.ts:169:12 | text | ${formatKoreanDate(first)}과 ${formatKoreanDate(last)}은 7일 차이예요. | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:170:12 | text | 7일 차이가 나면 같은 요일이에요. | learner-text-candidate | — |
| domain/calendarMath.ts:174:10 | text | ${anchorText}에서 7일 뒤는 ${formatKoreanDate(answer.selectedDates[0])}이에요. | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:175:10 | text | 7일 뒤에는 같은 요일이 다시 돌아와요. | learner-text-candidate | — |
| domain/calendarMath.ts:181:10 | text | 날짜가 빠른 순서대로 ${sequence}예요. | learner-text-candidate | — |
| domain/calendarMath.ts:182:10 | text | 달력에서 앞쪽 칸일수록 날짜가 빠르다는 근거로 배열했어요. | learner-text-candidate | — |
| domain/calendarMath.ts:187:10 | text | ${anchorText}의 다음 날은 새로운 달인 ${formatKoreanDate(answer.selectedDates[0])}이에요. | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:188:10 | text | 한 달이 끝나면 다음 달 1일로 이어져요. | learner-text-candidate | repeated-text |
| domain/calendarMath.ts:199:16 | text | ${anchorText}의 하루 전과 하루 뒤를 달력 칸에서 다시 찾아 보세요. | learner-text-candidate | — |
| domain/calendarMath.ts:201:16 | text | ${anchorText}의 다음 날을 달력에서 다시 세어 보세요. | learner-text-candidate | — |
| domain/calendarMath.ts:203:16 | text | ${anchorText}보다 7일 뒤, 같은 요일 칸을 다시 찾아 보세요. | learner-text-candidate | — |
| domain/calendarMath.ts:205:16 | text | 가장 빠른 날짜부터 차례대로 다시 눌러 보세요. | learner-text-candidate | — |
| domain/calendarMath.ts:207:16 | text | ${anchorText}이 그 달의 마지막 날이라면 다음 날은 어느 달의 며칠일까요? 다시 찾아 보세요. | learner-text-candidate | long-or-dense |
| domain/calendarMath.ts:209:16 | text | 달력 칸을 다시 한 번 살펴 보세요. | learner-text-candidate | — |
| domain/calendarMath.ts:222:34 | text | 0 && answer.selectedDates.every(isValidDateKey); const relationValid = RELATIONS.includes(answer.relation); if (!datesValid \|\| !relationValid) { return { accepted: false, expectedRelation, evidenceDates: [mission.anchorDate], evidenceKeys: ["선택한 날짜를 다시 한 번 확인해 주세요."], }; } const universe = new Set | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| domain/calendarMath.ts:229:23 | text | 선택한 날짜를 다시 한 번 확인해 주세요. | learner-text-candidate | multiple-actions |
| features/calendar-repair/CalendarGrid.tsx:8:13 | text | 일 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:8:24 | text | 일요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:9:13 | text | 월 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:9:24 | text | 월요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:10:13 | text | 화 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:10:24 | text | 화요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:11:13 | text | 수 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:11:24 | text | 수요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:12:13 | text | 목 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:12:24 | text | 목요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:13:13 | text | 금 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:13:24 | text | 금요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:14:13 | text | 토 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:14:24 | text | 토요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:22:41 | text | void; readonly anchorDate?: DateKey; readonly ariaLabel: string; } function cellPlacement(row: number, column: number): CSSProperties { return { "--cell-col": column + 1, "--cell-row": row + 2 } as CSSProperties; } export default function CalendarGrid({ cells, maxRow, selectable, selectedDates, onToggle, anchorDate, ariaLabel, }: CalendarGridProps) { const handleKeyDown = (event: KeyboardEvent | learner-text-candidate | long-or-dense, technical-or-internal |
| features/calendar-repair/CalendarGrid.tsx:61:19 | text | !entry.hidden && entry.row === row && entry.column === column, ); if (target) { event.preventDefault(); const button = event.currentTarget.querySelector | button-or-action | long-or-dense, technical-or-internal |
| features/calendar-repair/CalendarGrid.tsx:65:76 | text | ( `[data-cell-date="${target.cell.date}"]`, ); button?.focus(); return; } } }; return ( | button-or-action | long-or-dense |
| features/calendar-repair/CalendarGrid.tsx:128:69 | text | 10월 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:131:58 | text | 기준 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:141:40 | text | calendar-cell-button is-selected | button-or-action | — |
| features/calendar-repair/CalendarGrid.tsx:141:77 | text | calendar-cell-button | button-or-action | — |
| features/calendar-repair/CalendarGrid.tsx:147:67 | text | 10월 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarGrid.tsx:147:77 | text | : null} | learner-text-candidate | technical-or-internal |
| features/calendar-repair/CalendarGrid.tsx:151:65 | text | {WEEKDAY_KO[cell.weekday]} | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:153:22 | text | {isSelected ? ( | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:155:65 | text | ✓ 선택됨 | learner-text-candidate | — |
| features/calendar-repair/CalendarGrid.tsx:157:24 | text | ) : null} | button-or-action | repeated-text, technical-or-internal |
| features/calendar-repair/CalendarWorkbench.test.tsx:40:11 | text | 요일 띠 단계 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:41:7 | text | 일요일부터 토요일까지 순서대로 눌러야 확인할 수 있다 | learner-text-candidate | multiple-actions |
| features/calendar-repair/CalendarWorkbench.test.tsx:44:26 | text | 일요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:44:33 | text | 월요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:44:40 | text | 화요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:44:47 | text | 수요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:44:54 | text | 목요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:44:61 | text | 금요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:44:68 | text | 토요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:45:42 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:47:39 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:47:57 | text | 요일 띠 확인했어요 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:50:30 | text | heading | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:50:49 | text | 빈 칸 예측하기 | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:53:7 | text | 순서가 틀리면 안내하고 진행되지 않는다 | instruction | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:56:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:56:58 | text | 월요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:58:30 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:58:48 | text | 요일 띠 확인했어요 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:62:11 | text | 빈 칸 예측 단계 (calendar-gap-01) | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:63:7 | text | 숨긴 날짜는 달력에 렌더링되지 않는다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:66:27 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:66:45 | text | 2026년 9월 3일 목요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:71:7 | text | 날짜와 요일을 예상해 제출하면 근거와 함께 통과한다 | learner-text-candidate | abstract-or-formal |
| features/calendar-repair/CalendarWorkbench.test.tsx:74:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:74:58 | text | 3일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:75:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:75:58 | text | 목요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:76:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:76:58 | text | 예상 완료하기 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:78:30 | text | heading | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:78:49 | text | 좋아요! 달력 근거를 찾았어요. | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:79:30 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:79:48 | text | 다음으로 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:80:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:80:58 | text | 다음으로 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:81:30 | text | heading | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:81:49 | text | 같은 월요일 찾기 | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:84:7 | text | 오답에는 정답을 공개하지 않고 한 번의 수정 기회를 준다 | feedback-or-error | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:87:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:87:58 | text | 4일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:88:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:88:58 | text | 금요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:89:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:89:58 | text | 예상 완료하기 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:90:40 | text | status | feedback-or-error | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:92:45 | text | 9월 3일 | feedback-or-error | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:93:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:93:58 | text | 다시 고치기 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:95:30 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:95:48 | text | 4일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:95:73 | text | aria-pressed | button-or-action | missing-term-explanation, technical-or-internal |
| features/calendar-repair/CalendarWorkbench.test.tsx:95:89 | text | false | button-or-action | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:96:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:96:58 | text | 3일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:97:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:97:58 | text | 목요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:98:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:98:58 | text | 예상 완료하기 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:103:11 | text | 달력 칸 선택 단계 (calendar-week-02) | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:104:7 | text | 두 개의 월요일을 선택해 확인한다 | learner-text-candidate | multiple-actions |
| features/calendar-repair/CalendarWorkbench.test.tsx:107:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:107:58 | text | 2026년 9월 7일 월요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:108:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:108:58 | text | 2026년 9월 14일 월요일 | button-or-action | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:109:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:109:58 | text | 달력 칸 확인 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:114:7 | text | 두 개 미만이면 확인할 수 없다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:117:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:117:58 | text | 2026년 9월 7일 월요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:118:30 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:118:48 | text | 달력 칸 확인 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:121:7 | text | 화살표로 칸을 이동하고 Enter로 선택한다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:124:41 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:124:59 | text | 2026년 9월 7일 월요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:127:30 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:127:48 | text | 2026년 9월 8일 화요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:129:30 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:129:48 | text | 2026년 9월 8일 화요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:136:11 | text | 관계 카드 단계 (calendar-yesterday-03) | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:137:7 | text | 어제와 내일 카드를 연결해 완성한다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:140:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:140:58 | text | 어제: 9월 13일 일요일 | button-or-action | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:141:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:141:58 | text | 내일: 9월 15일 화요일 | button-or-action | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:142:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:142:58 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:147:11 | text | 일주일 관계 단계 (calendar-after-seven-04 · calendar-order-05) | learner-text-candidate | long-or-dense |
| features/calendar-repair/CalendarWorkbench.test.tsx:148:7 | text | 일주일 뒤 칸을 찾는다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:151:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:151:58 | text | 2026년 9월 15일 화요일 | button-or-action | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:152:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:152:58 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:154:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:154:58 | text | 다음으로 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:155:30 | text | heading | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:155:49 | text | 행사 날짜 순서 배열 | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:158:7 | text | 행사 카드를 빠른 날짜 순서로 눌러 배열한다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:161:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:161:58 | text | 도서관 행사 9월 5일 토요일 | button-or-action | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:162:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:162:58 | text | 화단 행사 9월 12일 토요일 | button-or-action | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:163:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:163:58 | text | 체육 행사 9월 21일 월요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:164:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:164:58 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:166:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:166:58 | text | 다음으로 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:167:30 | text | heading | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:167:49 | text | 다음 달로 이어 주기 | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:170:7 | text | 잘못 누른 순서는 지우고 다시 배열할 수 있다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:173:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:173:58 | text | 체육 행사 9월 21일 월요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:174:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:174:58 | text | 순서 지우기 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:175:30 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:175:48 | text | 체육 행사 9월 21일 월요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:179:11 | text | 월 경계 단계 (calendar-month-06) | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:180:7 | text | 없는 날짜 9월 31일은 제출할 수 없고 안내를 보여 준다 | instruction | abstract-or-formal |
| features/calendar-repair/CalendarWorkbench.test.tsx:183:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:183:58 | text | 9월 31일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:184:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:184:58 | text | 목요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:185:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:185:58 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:190:7 | text | 10월 1일 목요일로 월 경계를 수리한다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:193:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:193:58 | text | 10월 1일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:194:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:194:58 | text | 목요일 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:195:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:195:58 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:201:11 | text | 수정 기회 소진 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:202:7 | text | 두 번 모두 틀리면 근거 날짜를 공개하고 진행할 수 있다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:220:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:220:58 | text | 다음으로 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:221:30 | text | heading | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:221:49 | text | 같은 월요일 찾기 | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:225:11 | text | 뒤로 가기 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:226:7 | text | 뒤로 가기 버튼으로 직전 단계로 돌아간다 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.test.tsx:229:40 | text | button | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:229:58 | text | 뒤로 가기 | button-or-action | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:230:30 | text | heading | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.test.tsx:230:49 | text | 빈 칸 예측하기 | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.tsx:29:18 | text | { setRepairing(false); }, [responseCount]); if (state.step === "WEEKDAY_STRIP") { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| features/calendar-repair/CalendarWorkbench.tsx:35:50 | aria-label | 요일 띠 확인 단계 | aria-label | — |
| features/calendar-repair/CalendarWorkbench.tsx:37:50 | text | 준비 단계 · 1 / 7 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.tsx:38:45 | text | 요일 띠 확인 | heading | repeated-text |
| features/calendar-repair/CalendarWorkbench.tsx:39:48 | text | 달력을 읽기 전에 요일이 돌아오는 순서를 살펴봐요. | instruction | — |
| features/calendar-repair/CalendarWorkbench.tsx:56:38 | text | 달력 기록 보기 | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.tsx:56:51 | text | 다음으로 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.tsx:79:75 | text | ; default: return null; } }; return ( | heading, button-or-action | technical-or-internal |
| features/calendar-repair/CalendarWorkbench.tsx:86:49 | text | ${MISSION_HEADINGS[mission.id]} 단계 | heading | missing-term-explanation, technical-or-internal |
| features/calendar-repair/CalendarWorkbench.tsx:88:48 | text | 미션 {missionIndex + 1} / {MISSIONS.length} | learner-text-candidate | technical-or-internal |
| features/calendar-repair/CalendarWorkbench.tsx:91:43 | text | {MISSION_HEADINGS[mission.id]} | heading | missing-term-explanation, technical-or-internal |
| features/calendar-repair/CalendarWorkbench.tsx:100:13 | text | {evaluation !== null && !repairing ? ( | feedback-or-error | technical-or-internal |
| features/calendar-repair/CalendarWorkbench.tsx:116:32 | text | ghost | learner-text-candidate | — |
| features/calendar-repair/CalendarWorkbench.tsx:116:72 | text | BACK | learner-text-candidate | technical-or-internal |
| features/calendar-repair/CalendarWorkbench.tsx:116:82 | text | 뒤로 가기 | learner-text-candidate | repeated-text |
| features/calendar-repair/CalendarWorkbench.tsx:119:47 | text | 새로고침하면 응답이 사라져요. | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.test.tsx:12:7 | text | 학습 목표·예상 시간·저장 안내·새로고침 안내를 보여 준다 | instruction | — |
| features/calendar-repair/EntranceScreen.test.tsx:14:30 | text | heading | heading | repeated-text |
| features/calendar-repair/EntranceScreen.test.tsx:14:49 | text | 빠진 날짜를 찾아 달력을 복원해요! | heading | repeated-text |
| features/calendar-repair/EntranceScreen.test.tsx:22:7 | text | 오늘의 미션 6개를 목록으로 보여 준다 | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.test.tsx:24:59 | text | 오늘의 미션 6개 | learner-text-candidate | repeated-text |
| features/calendar-repair/EntranceScreen.test.tsx:30:7 | text | 시작 버튼이 첫 화면 영역 안에 있다 | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.test.tsx:35:46 | text | button | button-or-action | repeated-text |
| features/calendar-repair/EntranceScreen.test.tsx:35:64 | text | 달력 복원 시작하기 | button-or-action | repeated-text |
| features/calendar-repair/EntranceScreen.test.tsx:39:7 | text | Enter와 Space로 시작할 수 있다 | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.test.tsx:42:43 | text | button | button-or-action | repeated-text |
| features/calendar-repair/EntranceScreen.test.tsx:42:61 | text | 달력 복원 시작하기 | button-or-action | repeated-text |
| features/calendar-repair/EntranceScreen.tsx:5:26 | text | void; } export default function EntranceScreen({ onStart }: EntranceScreenProps) { return ( | heading | long-or-dense, technical-or-internal |
| features/calendar-repair/EntranceScreen.tsx:10:52 | text | entrance-heading | heading | — |
| features/calendar-repair/EntranceScreen.tsx:21:42 | text | 오늘의 탐구 미션 | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:22:37 | text | 빠진 날짜를 찾아 달력을 복원해요! | heading | repeated-text |
| features/calendar-repair/EntranceScreen.tsx:23:40 | text | 2026년 9월 연습 달력에서 빠진 날짜와 요일을 찾고, 어제·오늘·내일과 일주일 뒤, 달이 바뀌는 날까지 이어서 복원해요. | learner-text-candidate | long-or-dense |
| features/calendar-repair/EntranceScreen.tsx:27:40 | text | 예상 시간: | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:28:28 | text | 10~15분 | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:30:34 | text | primary | learner-text-candidate | repeated-text |
| features/calendar-repair/EntranceScreen.tsx:30:61 | text | 달력 복원 시작하기 | learner-text-candidate | repeated-text |
| features/calendar-repair/EntranceScreen.tsx:33:40 | text | 새로고침하면 지금까지의 응답이 사라져요. | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:39:36 | text | 오늘의 미션 6개 | heading | repeated-text |
| features/calendar-repair/EntranceScreen.tsx:40:57 | text | mission-heading | heading | — |
| features/calendar-repair/EntranceScreen.tsx:41:17 | text | 빠진 날짜와 요일 찾기 (9월 1일~5일) | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:42:17 | text | 같은 월요일 찾기 (9월 7일과 14일) | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:43:17 | text | 어제·오늘·내일 연결 (9월 14일 월요일) | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:44:17 | text | 일주일 뒤 찾기 (9월 8일 화요일) | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:45:17 | text | 행사 날짜 순서 배열 (도서관·화단·체육) | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:46:17 | text | 다음 달로 이어 주기 (9월 30일 다음) | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:51:35 | text | 안전하게 즐기는 방법 | heading | — |
| features/calendar-repair/EntranceScreen.tsx:52:56 | text | safety-heading | heading | — |
| features/calendar-repair/EntranceScreen.tsx:53:17 | text | 이름이나 개인 정보를 묻지 않아요. | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:54:17 | text | 응답은 이 화면 안에만 있고 저장하거나 보내지 않아요. | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:55:17 | text | 2026년 9월 실제 달력의 날짜와 요일을 사용해요. | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:56:17 | text | 점수나 순위 대신 근거와 수정 결과를 보여 줘요. | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:60:45 | text | 화면 위쪽의 | learner-text-candidate | — |
| features/calendar-repair/EntranceScreen.tsx:61:26 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| features/calendar-repair/EntranceScreen.tsx:61:42 | text | 버튼에서 앱의 바뀐 점을 볼 수 있어요. | learner-text-candidate | — |
| features/calendar-repair/FeedbackPanel.tsx:10:25 | text | void; readonly nextLabel: string; } export default function FeedbackPanel({ evaluation, canRepair, onRetry, onNext, nextLabel, }: FeedbackPanelProps) { const titleRef = useRef | heading, feedback-or-error | long-or-dense, technical-or-internal |
| features/calendar-repair/FeedbackPanel.tsx:23:18 | text | { const title = titleRef.current; if (!title) return; title.focus(); if (typeof title.scrollIntoView === "function") { title.scrollIntoView({ block: "nearest", behavior: "auto" }); } }, [evaluation]); if (evaluation.accepted) { return ( | heading, feedback-or-error | long-or-dense |
| features/calendar-repair/FeedbackPanel.tsx:27:42 | text | function | learner-text-candidate | repeated-text |
| features/calendar-repair/FeedbackPanel.tsx:28:38 | text | nearest | learner-text-candidate | — |
| features/calendar-repair/FeedbackPanel.tsx:28:59 | text | auto | learner-text-candidate | repeated-text |
| features/calendar-repair/FeedbackPanel.tsx:35:69 | text | 좋아요! 달력 근거를 찾았어요. | heading, feedback-or-error | repeated-text |
| features/calendar-repair/FeedbackPanel.tsx:43:32 | text | primary | learner-text-candidate | repeated-text |
| features/calendar-repair/FeedbackPanel.tsx:46:13 | text | ); } if (canRepair) { return ( | feedback-or-error | — |
| features/calendar-repair/FeedbackPanel.tsx:53:69 | text | 근거를 다시 확인해 볼까요? | heading, feedback-or-error | — |
| features/calendar-repair/FeedbackPanel.tsx:61:32 | text | secondary | learner-text-candidate | repeated-text |
| features/calendar-repair/FeedbackPanel.tsx:61:61 | text | 다시 고치기 | learner-text-candidate | repeated-text |
| features/calendar-repair/FeedbackPanel.tsx:64:13 | text | ); } return ( | feedback-or-error | — |
| features/calendar-repair/FeedbackPanel.tsx:70:67 | text | 수정 결과를 기록했어요. | heading, feedback-or-error | — |
| features/calendar-repair/FeedbackPanel.tsx:78:43 | text | 근거가 되는 날짜 | feedback-or-error | repeated-text |
| features/calendar-repair/FeedbackPanel.tsx:84:30 | text | primary | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:15:12 | text | 일요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:16:12 | text | 월요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:17:13 | text | 화요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:18:15 | text | 수요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:19:14 | text | 목요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:20:12 | text | 금요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:21:14 | text | 토요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/calendarCells.ts:25:48 | text | WEEKDAY_KO[weekday] === ko); if (!found) { throw new Error(`알 수 없는 요일 표기입니다: ${ko}`); } return found; } export function weekdayIndexOf(date: DateKey): number { return WEEKDAY_ORDER.indexOf(weekdayOf(date)); } /** "9월 5일 토요일" 형태의 짧은 화면 표기 (연도는 문맥으로 생략). */ export function shortDateLabel(date: DateKey): string { const month = Number(date.slice(5, 7)); const day = Number(date.slice(8, 10)); return `${month}월 ${day}일 ${weekdayNameKo(date)}`; } export function cellLabel(cell: CalendarCell): string { return formatKoreanDate(cell.date); } export interface PositionedCalendarCell { readonly cell: CalendarCell; readonly hidden: boolean; readonly row: number; readonly column: number; } export interface MissionGrid { readonly entries: readonly PositionedCalendarCell[]; readonly maxRow: number; } /** * 미션의 visible·hidden 날짜를 실제 요일 열 위치에 배치한다. * hidden 날짜는 빈 칸(복원 대상)으로 렌더링되고 절대 숫자를 노출하지 않는다. */ export function buildMissionGrid(mission: CalendarMission): MissionGrid { const hiddenSet = new Set | feedback-or-error | long-or-dense, technical-or-internal |
| features/calendar-repair/calendarCells.ts:27:22 | text | 알 수 없는 요일 표기입니다: ${ko} | feedback-or-error | — |
| features/calendar-repair/calendarCells.ts:36:6 | text | 9월 5일 토요일 | learner-text-candidate | — |
| features/calendar-repair/calendarCells.ts:40:11 | text | ${month}월 ${day}일 ${weekdayNameKo(date)} | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:3:57 | text | = { "calendar-gap-01": "빈 칸 예측하기", "calendar-week-02": "같은 월요일 찾기", "calendar-yesterday-03": "어제·오늘·내일 연결", "calendar-after-seven-04": "일주일 뒤 찾기", "calendar-order-05": "행사 날짜 순서 배열", "calendar-month-06": "다음 달로 이어 주기", }; export const MISSION_INSTRUCTIONS: Record | heading, instruction | long-or-dense |
| features/calendar-repair/missionNames.ts:4:23 | text | 빈 칸 예측하기 | learner-text-candidate | repeated-text |
| features/calendar-repair/missionNames.ts:5:24 | text | 같은 월요일 찾기 | learner-text-candidate | repeated-text |
| features/calendar-repair/missionNames.ts:6:29 | text | 어제·오늘·내일 연결 | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:7:31 | text | 일주일 뒤 찾기 | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:8:25 | text | 행사 날짜 순서 배열 | learner-text-candidate | repeated-text |
| features/calendar-repair/missionNames.ts:9:25 | text | 다음 달로 이어 주기 | learner-text-candidate | repeated-text |
| features/calendar-repair/missionNames.ts:13:23 | text | 9월 첫 주에서 빠진 칸을 날짜와 요일 근거로 복원해요. | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:14:24 | text | 같은 요일은 7일 차이로 이어져요. 월요일 두 개를 찾아요. | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:15:29 | text | 9월 14일 월요일을 기준으로 어제와 내일을 연결해요. | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:16:31 | text | 일주일 뒤에는 같은 요일이 돌아와요. | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:17:25 | text | 달력에서 앞쪽 칸일수록 날짜가 빨라요. | learner-text-candidate | — |
| features/calendar-repair/missionNames.ts:18:25 | text | 한 달이 끝나면 다음 달 1일로 이어져요. | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:10:49 | text | void; } const DATE_CHOICES = ["9월 31일", "10월 1일", "10월 2일"] as const; const WEEKDAY_CHOICES = ["수요일", "목요일", "금요일"] as const; const DATE_KEY_BY_CHOICE: Partial | button-or-action | long-or-dense, technical-or-internal |
| features/calendar-repair/stages/BoundaryStage.tsx:13:24 | text | 9월 31일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:13:34 | text | 10월 1일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:13:44 | text | 10월 2일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:14:27 | text | 수요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:14:34 | text | 목요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:14:41 | text | 금요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:16:82 | text | = { "10월 1일": "2026-10-01", "10월 2일": "2026-10-02", }; type DateChoice = (typeof DATE_CHOICES)[number]; type WeekdayChoice = (typeof WEEKDAY_CHOICES)[number]; export default function BoundaryStage({ mission, onSubmit }: BoundaryStageProps) { const [dateChoice, setDateChoice] = useState | button-or-action | long-or-dense, technical-or-internal |
| features/calendar-repair/stages/BoundaryStage.tsx:17:4 | text | 10월 1일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:18:4 | text | 10월 2일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:37:29 | text | { if (dateChoice === null \|\| weekdayChoice === null) return; const date = DATE_KEY_BY_CHOICE[dateChoice]; if (date === undefined \|\| !isValidDateKey(date)) { setNotice("9월 31일은 달력에 없는 날짜예요. 9월은 30일까지예요. 다시 골라 봐요."); return; } const answer: CalendarAnswer = { selectedDates: [date], relation: "month-boundary", weekday: weekdayFromKo(weekdayChoice), }; onSubmit(answer); }; return ( | button-or-action | long-or-dense, technical-or-internal |
| features/calendar-repair/stages/BoundaryStage.tsx:41:18 | text | 9월 31일은 달력에 없는 날짜예요. 9월은 30일까지예요. 다시 골라 봐요. | learner-text-candidate | — |
| features/calendar-repair/stages/BoundaryStage.tsx:60:20 | text | 2026년 9월 마지막 주와 10월 첫 주 연습 달력 | learner-text-candidate | — |
| features/calendar-repair/stages/BoundaryStage.tsx:62:33 | text | 9월 30일의 다음 날을 찾아 새로운 달과 이어 주어요. | learner-text-candidate | — |
| features/calendar-repair/stages/BoundaryStage.tsx:64:37 | aria-label | 다음 날짜 고르기 | aria-label | — |
| features/calendar-repair/stages/BoundaryStage.tsx:65:40 | text | 9월 30일 다음 날은 언제일까요? | learner-text-candidate | — |
| features/calendar-repair/stages/BoundaryStage.tsx:81:37 | aria-label | 다음 날 요일 고르기 | aria-label | — |
| features/calendar-repair/stages/BoundaryStage.tsx:82:40 | text | 그날은 무슨 요일일까요? | learner-text-candidate | — |
| features/calendar-repair/stages/BoundaryStage.tsx:96:13 | text | {notice ? ( | hint | — |
| features/calendar-repair/stages/BoundaryStage.tsx:101:13 | text | ) : null} | button-or-action | repeated-text, technical-or-internal |
| features/calendar-repair/stages/BoundaryStage.tsx:104:30 | text | primary | button-or-action | repeated-text |
| features/calendar-repair/stages/BoundaryStage.tsx:104:90 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/stages/PredictStage.tsx:10:49 | text | void; } const WEEKDAY_CHOICES = ["수요일", "목요일", "금요일"] as const; export default function PredictStage({ mission, onSubmit }: PredictStageProps) { const [day, setDay] = useState | button-or-action | long-or-dense, technical-or-internal |
| features/calendar-repair/stages/PredictStage.tsx:13:27 | text | 수요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/PredictStage.tsx:13:34 | text | 목요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/PredictStage.tsx:13:41 | text | 금요일 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/PredictStage.tsx:46:20 | text | 2026년 9월 첫 주 연습 달력 | learner-text-candidate | — |
| features/calendar-repair/stages/PredictStage.tsx:48:33 | text | 비어 있는 칸의 날짜와 요일을 먼저 예상해 봐요. | learner-text-candidate | — |
| features/calendar-repair/stages/PredictStage.tsx:50:37 | aria-label | 빈 칸의 날짜 고르기 | aria-label | — |
| features/calendar-repair/stages/PredictStage.tsx:51:40 | text | 빈 칸의 날짜는 며칠일까요? | learner-text-candidate | — |
| features/calendar-repair/stages/PredictStage.tsx:60:14 | text | {choice}일 | button-or-action | — |
| features/calendar-repair/stages/PredictStage.tsx:67:37 | aria-label | 빈 칸의 요일 고르기 | aria-label | — |
| features/calendar-repair/stages/PredictStage.tsx:68:40 | text | 빈 칸의 요일은 무슨 요일일까요? | learner-text-candidate | — |
| features/calendar-repair/stages/PredictStage.tsx:85:38 | text | 예상: {Number(hiddenDate.slice(0, 4))}년 {Number(hiddenDate.slice(5, 7))}월 {day}일{" "} {weekdayChoice} | learner-text-candidate | long-or-dense, technical-or-internal |
| features/calendar-repair/stages/PredictStage.tsx:88:13 | text | ) : null} | button-or-action | repeated-text, technical-or-internal |
| features/calendar-repair/stages/PredictStage.tsx:91:30 | text | primary | button-or-action | repeated-text |
| features/calendar-repair/stages/PredictStage.tsx:91:90 | text | 예상 완료하기 | button-or-action | repeated-text |
| features/calendar-repair/stages/RelateStage.tsx:31:51 | text | 오늘 기준: ${formatKoreanDate(mission.anchorDate)} | learner-text-candidate | — |
| features/calendar-repair/stages/RelateStage.tsx:32:47 | text | 오늘 | learner-text-candidate | — |
| features/calendar-repair/stages/RelateStage.tsx:33:46 | text | {shortDateLabel(mission.anchorDate)} | learner-text-candidate | — |
| features/calendar-repair/stages/RelateStage.tsx:36:37 | aria-label | 어제 고르기 | aria-label | — |
| features/calendar-repair/stages/RelateStage.tsx:37:40 | text | 어제는 언제일까요? | learner-text-candidate | — |
| features/calendar-repair/stages/RelateStage.tsx:45:28 | text | 어제: ${shortDateLabel(choice)} | learner-text-candidate | — |
| features/calendar-repair/stages/RelateStage.tsx:47:14 | text | {shortDateLabel(choice)} | button-or-action | repeated-text |
| features/calendar-repair/stages/RelateStage.tsx:54:37 | aria-label | 내일 고르기 | aria-label | — |
| features/calendar-repair/stages/RelateStage.tsx:55:40 | text | 내일은 언제일까요? | learner-text-candidate | — |
| features/calendar-repair/stages/RelateStage.tsx:63:28 | text | 내일: ${shortDateLabel(choice)} | learner-text-candidate | — |
| features/calendar-repair/stages/RelateStage.tsx:65:14 | text | {shortDateLabel(choice)} | button-or-action | repeated-text |
| features/calendar-repair/stages/RelateStage.tsx:73:38 | text | 어제 {shortDateLabel(yesterday)} · 오늘 {shortDateLabel(mission.anchorDate)} · 내일{" "} {shortDateLabel(tomorrow)} | learner-text-candidate | long-or-dense |
| features/calendar-repair/stages/RelateStage.tsx:76:13 | text | ) : null} | button-or-action | repeated-text, technical-or-internal |
| features/calendar-repair/stages/RelateStage.tsx:79:30 | text | primary | button-or-action | repeated-text |
| features/calendar-repair/stages/RelateStage.tsx:79:90 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/stages/SelectStage.tsx:52:20 | text | 2026년 9월 첫째 주와 둘째 주 연습 달력 | learner-text-candidate | — |
| features/calendar-repair/stages/SelectStage.tsx:54:33 | text | 보이는 칸 중에서 월요일 두 개를 찾아 눌러요. {REQUIRED_PICKS}개 중 {selected.length}개를 골랐어요. | learner-text-candidate | long-or-dense, multiple-actions |
| features/calendar-repair/stages/SelectStage.tsx:58:30 | text | primary | button-or-action | repeated-text |
| features/calendar-repair/stages/SelectStage.tsx:58:90 | text | 달력 칸 확인 | button-or-action | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:10:49 | text | void; } const EVENT_DISPLAY_ORDER = ["체육 행사", "도서관 행사", "화단 행사"] as const; const EVENTS: readonly { readonly label: string; readonly date: DateKey }[] = [ { label: "도서관 행사", date: "2026-09-05" }, { label: "화단 행사", date: "2026-09-12" }, { label: "체육 행사", date: "2026-09-21" }, ]; export default function WeekStage({ mission, onSubmit }: WeekStageProps) { if (mission.id === "calendar-after-seven-04") { return | button-or-action | long-or-dense, technical-or-internal |
| features/calendar-repair/stages/WeekStage.tsx:13:31 | text | 체육 행사 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:13:40 | text | 도서관 행사 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:13:50 | text | 화단 행사 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:16:13 | text | 도서관 행사 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:17:13 | text | 화단 행사 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:18:13 | text | 체육 행사 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:57:20 | text | 2026년 9월 둘째 주 연습 달력 | learner-text-candidate | — |
| features/calendar-repair/stages/WeekStage.tsx:59:33 | text | 기준 칸({shortDateLabel(mission.anchorDate)})보다 일주일 뒤인 칸을 찾아 눌러요. | learner-text-candidate | long-or-dense, multiple-actions |
| features/calendar-repair/stages/WeekStage.tsx:62:30 | text | primary | button-or-action | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:62:90 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:93:33 | text | 도서관·화단·체육 행사를 날짜가 가장 빠른 순서부터 차례대로 눌러요. | learner-text-candidate | — |
| features/calendar-repair/stages/WeekStage.tsx:96:61 | aria-label | 행사 날짜 순서 배열 | aria-label | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:97:37 | text | { const orderIndex = order.indexOf(event.date); return ( | button-or-action | long-or-dense |
| features/calendar-repair/stages/WeekStage.tsx:104:28 | text | ${event.label} ${shortDateLabel(event.date)} | learner-text-candidate | — |
| features/calendar-repair/stages/WeekStage.tsx:110:49 | text | {shortDateLabel(event.date)} | learner-text-candidate | — |
| features/calendar-repair/stages/WeekStage.tsx:112:65 | text | {orderIndex + 1}번째 | learner-text-candidate | — |
| features/calendar-repair/stages/WeekStage.tsx:114:24 | text | ) : null} | button-or-action | repeated-text, technical-or-internal |
| features/calendar-repair/stages/WeekStage.tsx:122:54 | aria-label | 고른 순서 | aria-label | — |
| features/calendar-repair/stages/WeekStage.tsx:126:30 | text | {event ? `${event.label} ${shortDateLabel(date)}` : shortDateLabel(date)} | learner-text-candidate | long-or-dense |
| features/calendar-repair/stages/WeekStage.tsx:127:27 | text | ${event.label} ${shortDateLabel(date)} | learner-text-candidate | — |
| features/calendar-repair/stages/WeekStage.tsx:135:32 | text | secondary | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:135:102 | text | 순서 지우기 | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:138:32 | text | primary | button-or-action | repeated-text |
| features/calendar-repair/stages/WeekStage.tsx:138:92 | text | 관계 완성 | button-or-action | repeated-text |
| features/calendar-repair/stages/WeekdayStripStage.tsx:14:41 | text | { if (index === progress) { setProgress(index + 1); setShowHint(false); return; } setShowHint(true); }; return ( | hint | long-or-dense |
| features/calendar-repair/stages/WeekdayStripStage.tsx:25:33 | text | 요일은 일요일부터 토요일까지 순서대로 돌아와요. 차례대로 눌러 확인해요. | learner-text-candidate | multiple-actions |
| features/calendar-repair/stages/WeekdayStripStage.tsx:28:71 | aria-label | 요일 띠 순서 확인 | aria-label | — |
| features/calendar-repair/stages/WeekdayStripStage.tsx:33:44 | text | weekday-strip-button is-lit | button-or-action | — |
| features/calendar-repair/stages/WeekdayStripStage.tsx:33:76 | text | weekday-strip-button | button-or-action | — |
| features/calendar-repair/stages/WeekdayStripStage.tsx:36:12 | text | {WEEKDAY_KO[weekday]} | button-or-action | — |
| features/calendar-repair/stages/WeekdayStripStage.tsx:40:13 | text | {showHint ? ( | hint | — |
| features/calendar-repair/stages/WeekdayStripStage.tsx:42:49 | text | 일요일부터 차례대로 눌러 주세요. | hint | — |
| features/calendar-repair/stages/WeekdayStripStage.tsx:44:13 | text | ) : null} | learner-text-candidate | repeated-text, technical-or-internal |
| features/calendar-repair/stages/WeekdayStripStage.tsx:46:30 | text | primary | learner-text-candidate | repeated-text |
| features/calendar-repair/stages/WeekdayStripStage.tsx:46:82 | text | 요일 띠 확인했어요 | learner-text-candidate | repeated-text |
| features/report/LearningReport.test.tsx:49:7 | text | 여섯 미션의 최초 판단·근거·수정 결과를 보여 준다 | learner-text-candidate | — |
| features/report/LearningReport.test.tsx:51:55 | text | 미션별 달력 기록 | learner-text-candidate | repeated-text |
| features/report/LearningReport.test.tsx:59:7 | text | 점수·등급·순위를 만들지 않는다 | learner-text-candidate | — |
| features/report/LearningReport.test.tsx:66:7 | text | 새로고침 안내와 교육 모형 한계를 함께 보여 준다 | instruction | — |
| features/report/LearningReport.test.tsx:72:7 | text | 인쇄 버튼은 인쇄 대화상자만 호출한다 | learner-text-candidate | — |
| features/report/LearningReport.test.tsx:76:40 | text | button | button-or-action | repeated-text |
| features/report/LearningReport.test.tsx:76:58 | text | 결과 인쇄 | button-or-action | repeated-text |
| features/report/LearningReport.test.tsx:81:7 | text | 다시 하기는 확인 대화상자 뒤 세션을 비운다 | learner-text-candidate | — |
| features/report/LearningReport.test.tsx:85:40 | text | button | button-or-action | repeated-text |
| features/report/LearningReport.test.tsx:85:58 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| features/report/LearningReport.test.tsx:86:56 | text | 처음부터 다시 할까요? | learner-text-candidate | repeated-text |
| features/report/LearningReport.test.tsx:88:48 | text | button | button-or-action | repeated-text |
| features/report/LearningReport.test.tsx:88:66 | text | 네, 처음부터 할게요 | button-or-action | repeated-text |
| features/report/LearningReport.test.tsx:92:7 | text | 인쇄 CSS는 A4 세로·검정 텍스트·버튼 숨김을 보장한다 | learner-text-candidate | — |
| features/report/LearningReport.tsx:18:23 | text | 진행하지 않았어요 | learner-text-candidate | — |
| features/report/LearningReport.tsx:19:28 | text | 첫 시도에서 통과 | learner-text-candidate | — |
| features/report/LearningReport.tsx:19:42 | text | 다시 확인했어요 | learner-text-candidate | — |
| features/report/LearningReport.tsx:25:48 | text | 한 번에 복원 | learner-text-candidate | — |
| features/report/LearningReport.tsx:25:60 | text | 한 번 확인 후 기록 | learner-text-candidate | multiple-actions |
| features/report/LearningReport.tsx:27:46 | text | 다시 고쳐서 통과 | learner-text-candidate | — |
| features/report/LearningReport.tsx:27:60 | text | 다시 고쳤지만 근거 확인 필요 | learner-text-candidate | — |
| features/report/LearningReport.tsx:33:28 | text | { window.print(); }; return ( | heading | — |
| features/report/LearningReport.tsx:38:50 | text | report-heading | heading | — |
| features/report/LearningReport.tsx:40:33 | text | 오늘 복원한 달력 기록 | heading | — |
| features/report/LearningReport.tsx:41:36 | text | 새로고침하면 이 기록이 모두 사라져요. 지켜 보고 싶으면 인쇄해요. | learner-text-candidate | — |
| features/report/LearningReport.tsx:44:50 | aria-label | 미션별 달력 기록 | aria-label | repeated-text |
| features/report/LearningReport.tsx:50:19 | text | 미션 {index + 1} · {MISSION_HEADINGS[mission.id as MissionId]} | heading | long-or-dense, missing-term-explanation, technical-or-internal |
| features/report/LearningReport.tsx:55:23 | text | 최초 판단 | learner-text-candidate | — |
| features/report/LearningReport.tsx:56:23 | text | {firstJudgmentLabel(record)} | learner-text-candidate | — |
| features/report/LearningReport.tsx:59:23 | text | 사용한 근거 | learner-text-candidate | — |
| features/report/LearningReport.tsx:73:23 | text | 수정 결과 | learner-text-candidate | — |
| features/report/LearningReport.tsx:74:23 | text | {repairResultLabel(record)} | learner-text-candidate | — |
| features/report/LearningReport.tsx:78:25 | text | 근거가 되는 날짜 | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:95:32 | text | primary | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:95:63 | text | 결과 인쇄 | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:98:32 | text | secondary | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:98:80 | text | 처음부터 다시 하기 | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:103:35 | text | 이 앱은 2026년 9월 연습 달력을 다루는 교육 모형이며 실제 세계 전체를 보장하지 않아요. | learner-text-candidate | — |
| features/report/LearningReport.tsx:107:46 | title | 처음부터 다시 할까요? | title | repeated-text |
| features/report/LearningReport.tsx:108:12 | text | 지금까지의 응답과 근거 기록이 모두 사라져요. | learner-text-candidate | — |
| features/report/LearningReport.tsx:110:34 | text | primary | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:110:76 | text | RESTART_CONFIRMED | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:110:99 | text | 네, 처음부터 할게요 | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:113:34 | text | secondary | learner-text-candidate | repeated-text |
| features/report/LearningReport.tsx:113:83 | text | 계속 기록 볼게요 | learner-text-candidate | — |
| main.tsx:7:20 | text | 루트 요소(#root)를 찾지 못했습니다. | feedback-or-error | shaming-tone |
| styles/motion.test.ts:22:11 | text | 모션 CSS와 축소 모션 대체 | learner-text-candidate | — |
| styles/motion.test.ts:23:7 | text | gi-pulse 맥박을 정의한다 | learner-text-candidate | — |
| styles/motion.test.ts:28:7 | text | prefers-reduced-motion에서 맥박을 제거하고 고정 외곽선과 필수 배지로 대체한다 | learner-text-candidate | long-or-dense |
| styles/motion.test.ts:32:32 | text | 필수 | learner-text-candidate | — |
| styles/motion.test.ts:36:7 | text | 수동 축소 모드(.reduce-motion)도 같은 대체를 제공한다 | learner-text-candidate | — |
| styles/motion.test.ts:41:11 | text | gi-pulse는 단계의 필수 완료 행동에 사용된다 | learner-text-candidate | — |
| styles/motion.test.ts:42:7 | text | 각 학습 단계의 완료 버튼에 pulse를 켠다 | learner-text-candidate | — |
| styles/motion.test.ts:55:7 | text | 나머지 화면은 pulse를 쓰지 않는다 | learner-text-candidate | — |
| update/updateHistory.ts:10:13 | text | 달력 작업대 전체 리디자인 | learner-text-candidate | — |
| update/updateHistory.ts:12:8 | text | 달력 학습 흐름이 한눈에 보이도록 작업대 구조와 색·간격·포커스 이동을 정리하고, 작은 화면에서도 핵심 행동을 먼저 만날 수 있게 개선했어요. | learner-text-candidate | long-or-dense |
| update/updateHistory.ts:16:13 | text | 학습 앱 구현 완료 (로컬 검증 통과) | learner-text-candidate | abstract-or-formal |
| update/updateHistory.ts:18:8 | text | 미션 6개 학습 흐름, 결과 기록·인쇄, 접근성·개인정보 경계 테스트와 E2E가 모두 통과했어요. 공개 배포는 별도 승인 후 진행돼요. | learner-text-candidate | long-or-dense |
| update/updateHistory.ts:22:13 | text | 구현 계획 확정 | learner-text-candidate | — |
| update/updateHistory.ts:24:8 | text | 달력 순서 복원소의 학습 목표, 미션 6개, 접근성·개인정보 경계를 담은 구현 계획이 확정되었어요. | learner-text-candidate | — |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`
