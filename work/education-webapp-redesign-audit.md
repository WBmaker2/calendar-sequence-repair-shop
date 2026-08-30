⚠️ DEGRADED: single-context (spawn_agent tool unavailable; browser evidence blocked by shared preview port)

# 달력 순서 복원소 초기 UI/UX 감사

- 감사일: 2026-08-30 (KST)
- 대상: `src/app/App.tsx`와 전체 학습자 흐름
- 감사 유형: 초기 정적 감사 + 코드 근거 + Impeccable detector 기준 검토
- 제한: 초기 감사 당시에는 `$ui-ux-pro-max`가 런타임 목록에 없어 디자인 시스템 단계가 보류되었고, 브라우저 E2E는 공용 4173 포트 충돌로 완료하지 못했다. 이후 사용자가 Skill 문서를 제공하여 설계 단계는 재개했지만, 이 문서는 브라우저 캡처 이전의 초기 감사 기록이다.

## 감사 건강 점수

| 영역 | 점수 | 근거 |
|---|---:|---|
| 접근성 | 3/4 | 의미 있는 버튼/landmark, `aria-pressed`, 키보드 달력 이동, focus-visible, reduced motion이 있으나 건너뛰기 링크와 모달 focus trap이 없다. |
| 성능 | 4/4 | 로컬 정적 자산 1개, 외부 요청·저장 없음, 작은 React 구조이며 detector 자동 문제 0건이다. |
| 반응형 | 3/4 | 320px 목록 전환과 200% 확대 회귀 테스트가 있으나 이번 감사에서 새 브라우저 캡처를 확보하지 못했다. |
| 테마 | 3/4 | CSS 토큰과 라이트 모드 고정이 있으나 일부 색상·그림자가 직접 값으로 남고 공통 상태 토큰이 완전히 체계화되지 않았다. |
| 구현 무결성 | 3/4 | 달력 학습 계약과 상태/판정 경계가 제품 특화되어 있고 detector가 깨끗하지만 화면 시스템 문서가 없고 CSS가 500줄에 가깝다. |
| **합계** | **16/20** | **Good — 핵심 구조는 안정적이며 전체 시각 위계와 상호작용 마감이 필요하다.** |

## 구현 무결성 판정

**Pass (기능·콘텐츠 경계 기준), redesign readiness는 보완 필요.**

`src/content/missions.ts`, `src/domain/calendarMath.ts`, `src/app/sessionReducer.ts`가 고정 미션·UTC 날짜 계산·응답 수정 기회를 분리한다. `README.md`와 콘텐츠 검수 문서는 학생 개인정보·네트워크·저장소를 사용하지 않는 계약을 명시한다. `node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src` 결과는 `[]`로 자동 detector findings 0건이었다.

현재 화면은 제품 맥락에 맞는 달력/요일/근거 문구를 갖추었지만, 헤더 도구·진행 칩·단계 카드·피드백 카드가 비슷한 테두리와 표면을 반복해 핵심 조작의 시각적 무게가 분산된다. 따라서 기능 무결성은 통과하되, 전체 리디자인의 우선 목표는 “근거를 보고 한 가지 행동을 고르는 작업대”로 화면 위계를 재편하는 것이다.

## 잘 작동하는 점

1. `CalendarGrid`가 실제 숫자·요일을 HTML로 렌더링하고 장식 SVG에 학습 정답을 맡기지 않는다.
2. `aria-pressed`, 키보드 화살표 이동, Enter/Space 선택, 320px 목록 전환, 축소 모션 대체 등 교육 흐름에 필요한 기초 접근성 계약이 이미 테스트되어 있다.
3. 첫 오답에서 바로 정답을 노출하지 않고 `FeedbackPanel`이 근거 재확인과 한 번의 수정 기회를 제공한다. 결과 화면도 점수 대신 최초 판단·근거·수정 결과를 기록한다.

## 우선 이슈

### [P1] 반복 영역을 건너뛸 수 있는 시작점이 없음

- 위치: `src/app/App.tsx:51-66`
- 근거: `header`, 진행 표시, 도구가 먼저 나오지만 `main`에 `id`가 없고 skip link가 없다.
- 영향: 키보드 학습자가 매번 헤더 도구와 진행 표시를 지나야 하며, 실제 달력 활동으로 바로 이동하기 어렵다.
- 제안: `main`에 안정적인 id를 주고 첫 포커스 가능한 요소로 연결되는 “활동으로 건너뛰기” 링크를 추가한다. 모바일에서도 화면을 차지하지 않는 시각적 숨김/포커스 상태를 설계한다.
- 권장 명령: `$impeccable harden`, `$impeccable adapt`

### [P1] 모달이 초점을 가두지 않음

- 위치: `src/components/ModalDialog.tsx:15-33, 46-59`
- 근거: 열릴 때 닫기 버튼으로 초점을 옮기고 Escape/이전 초점 복귀는 처리하지만 Tab 순환을 제한하지 않는다.
- 영향: 업데이트 내역 또는 다시 하기 확인 중 Tab으로 배경의 학습 조작으로 이동할 수 있어 현재 의도와 다른 버튼을 누를 위험이 있다.
- 제안: 모달 내부 첫/마지막 포커스 가능한 요소의 Tab/Shift+Tab 순환, 제목의 `id`와 `aria-labelledby`, 닫힘 뒤 호출 버튼 복귀를 테스트한다.
- 권장 명령: `$impeccable harden`

### [P1] 응답 뒤 피드백으로의 초점·스크롤 계약이 없음

- 위치: `src/app/App.tsx:30-37`, `src/features/calendar-repair/CalendarWorkbench.tsx:89-107`
- 근거: 단계(`step`)가 바뀔 때만 제목에 초점을 이동한다. 같은 단계에서 답을 제출하면 피드백이 아래에 새로 렌더링되지만 피드백 제목/다음 CTA로 초점을 보내는 코드가 없다.
- 영향: 특히 긴 모바일 단계에서 학생이 정답 여부와 다음 행동을 놓치거나 다시 위로 이동해야 한다.
- 제안: 피드백 패널에 제목 ref와 `tabIndex={-1}`를 두고 응답 상태가 바뀔 때 focus/scroll을 이동한다. 오답 재시도에서는 새 입력의 첫 컨트롤로 복귀하고, 결과 상태에서는 다음 CTA가 보이도록 한다.
- 권장 명령: `$impeccable harden`, `$impeccable layout`

### [P2] 공통 표면 반복으로 핵심 행동의 위계가 약함

- 위치: `src/styles/app.css:31-150, 408-490`, `src/features/calendar-repair/workbench.css:30-68, 314-403`
- 근거: 입구, 작업대, 피드백, 결과 카드가 모두 선·둥근 모서리·밝은 표면을 반복한다. 헤더 도구와 진행 단계도 같은 무게를 갖는다.
- 영향: 저학년 학습자가 지금 해야 할 한 가지 행동보다 “여러 박스 중 무엇을 누르지?”를 먼저 해석하게 된다.
- 제안: 화면당 primary CTA 하나를 가장 강하게 만들고, 근거/보조 설명은 더 조용한 표면으로 낮춘다. 달력은 화면의 주인공으로 남기며 진행 표시는 짧은 상태 문장으로 단순화한다.
- 권장 명령: `$impeccable distill`, `$impeccable layout`

### [P2] 디자인 시스템 문서와 스타일 분할 여유가 부족함

- 위치: `design-system/MASTER.md` 없음, `src/styles/app.css` 490줄, `src/features/calendar-repair/workbench.css` 403줄
- 근거: 현재 `npm run check:lines`는 통과하지만 공통 앱 스타일과 결과/모달/단계 스타일이 한 파일에 밀집해 있다.
- 영향: 전체 리디자인 중 상태·간격·반경이 화면마다 다시 발명되거나 500줄 제한을 넘을 위험이 있다.
- 제안: `$ui-ux-pro-max` 승인 뒤 토큰과 컴포넌트 상태를 `design-system/MASTER.md`에 먼저 고정하고, CSS를 프레임/공통 컴포넌트/학습 단계/결과 단위로 나눈다.
- 권장 명령: `$impeccable extract`, `$impeccable document`

### [P3] 사용하지 않는 임시 스타일과 현재 이력 문구 정리

- 위치: `src/styles/app.css:318-334`의 `.step-placeholder`, `src/update/updateHistory.ts:5-19`
- 근거: 실제 `App`은 placeholder를 렌더링하지 않으며, 이력은 구현 완료 기록까지만 있다.
- 영향: 개발자에게 현재 화면 구조가 실제보다 덜 완성된 것처럼 보이고, 리디자인 완료 시 변경 이력이 누락될 수 있다.
- 제안: 리디자인에서 더 이상 사용하지 않는 임시 규칙을 제거하고, 실제 구현 날짜·개선 날짜·짧은 변경 내역을 최신 항목으로 추가한다.
- 권장 명령: `$impeccable polish`

## 사용자 유형별 위험 신호

### 처음 보는 학습자

- 입구의 긴 목표 문장, 예상 시간, 6개 미션 목록, 안전 안내가 동일한 카드 안에서 경쟁한다. 시작 CTA가 먼저 보이도록 문장을 짧게 묶고, “첫 단계에서 할 일”을 시각적으로 분리해야 한다.
- 단계 제출 후 피드백이 아래에 나타나도 자동 초점이 없어, 정답/수정/다음 행동을 놓칠 수 있다.

### 키보드로 사용하는 학습자

- 달력 칸 자체의 화살표/Enter/Space는 잘 설계되어 있지만, 전체 화면에는 skip link가 없고 업데이트 모달의 Tab 경계가 없다.
- 진행 표시가 현재 상태를 알려 주지만 조작 가능한 네비게이션은 아니므로, 포커스 순서에서 실제 활동보다 앞서 시선을 끌지 않게 조정할 필요가 있다.

### 교사가 옆에서 안내하는 경우

- 점수 대신 근거와 수정 결과를 보여 주는 계약은 설명에 유리하다.
- 다만 오답 피드백, 잠긴 단계, 결과 기록의 표현이 서로 다른 표면을 사용하므로 “왜 지금 이 버튼을 누르는지”를 한 문장으로 통일하면 안내 부담이 줄어든다.

## 보조 관찰

- 기본 body 서체와 큰 글자 설정은 어린이용 가독성에 유리하지만, 숫자와 날짜를 더 빠르게 비교할 수 있는 tabular numeral 또는 일관된 숫자 스타일을 토큰으로 결정할 수 있다.
- `ActionButton`의 primary/secondary/ghost 세 종류는 유용하므로 새 색을 늘리기보다 역할별 대비를 명확히 하는 편이 안전하다.
- `friendly-paper-calendar.svg`는 `alt=""`와 `aria-hidden="true"`인 장식 자산으로 접근성 경계를 지키고 있다. 이 자산을 실제 달력 정보처럼 확장하지 않는다.
- 자동 detector가 0건이어도 이는 시각적 완성도나 교사·아동 검토의 증거가 아니다.

## 자동·브라우저 증거

| 확인 | 결과 |
|---|---|
| `npm run lint` | 통과 (exit 0) |
| `npm run typecheck` | 통과 (exit 0) |
| `npm run test:run` | 통과, 12개 파일·107개 테스트 |
| `npm run test:a11y` | 통과, 5개 테스트 |
| `npm run check:lines` | 통과, 모든 TS·TSX·CSS 500줄 미만 |
| Impeccable detector | `node .../detect.mjs --json src` 결과 `[]`, findings 0건 |
| `npm run test:e2e` | 보류: `webServer`가 30초 내 준비되지 않음 |
| 재시도 진단 | 4173 포트에 다른 프로젝트의 Vite가 `127.0.0.1:4173`을 사용 중이며, 이 앱 설정은 같은 포트를 `reuseExistingServer`로 사용한다. 사용자 프로세스는 종료하지 않음. |
| 브라우저 시각 캡처/콘솔 | 미실행. 위 포트 충돌로 신뢰할 수 있는 학습자 브라우저 증거가 없음 |
| VoiceOver | 범위 제외 |

## 초기 감사 결론

기능·콘텐츠·개인정보 경계는 리디자인의 안전한 기반이다. 구현에서는 P1 세 가지(건너뛰기 링크, 모달 초점 경계, 응답 피드백 초점/스크롤)를 먼저 수용 기준으로 고정하고, 그 다음 반복 카드 표면을 줄여 달력 근거와 현재 CTA를 전면에 배치한다. 브라우저 캡처가 아직 없으므로 시각적 완료 판정은 보류한다.

## 설계 단계 후속 기록

사용자가 `$ui-ux-pro-max` Skill을 제공한 뒤, 디자인 시스템 검색 결과를 검토했다. 교육용 Claymorphism 방향은 채택하되 외부 Google Fonts와 GSAP는 오프라인 계약 때문에 제외하고, 달력 중심 단일 작업대 패턴과 로컬 한국어 폰트 스택으로 조정했다. 확정 규칙은 `design-system/MASTER.md`, 원본 검색 결과는 `design-system/calendar-sequence-repair-shop/MASTER.md`에 기록했다. 이제 초기 감사의 P1 항목을 구현 수용 기준으로 사용한다.

## 구현 후속 기록

- P1 건너뛰기 링크: `App.tsx`에 `활동으로 건너뛰기`와 `main#main-content`를 추가했다.
- P1 모달 초점: `ModalDialog.tsx`에 `aria-labelledby`와 Tab/Shift+Tab focus trap을 추가하고 회귀 테스트를 작성했다.
- P1 응답 피드백: `FeedbackPanel.tsx`가 정답·재시도·기록 제목에 `tabIndex={-1}` 초점을 이동하도록 구현했다.
- P2 표면 반복: 앱 프레임·공통 컴포넌트·결과 표면·워크벤치 스타일을 분리하고, 달력과 primary CTA의 대비를 높였다.
- P3 임시 스타일: 실제 사용하지 않는 placeholder 규칙을 제거하고 2026-08-30 업데이트 내역을 추가했다.
- 최종 detector는 `[]`였고, 정적 테스트·빌드는 통과했다. Playwright 브라우저 CLI는 세 차례 캐시 권한 오류로 실행하지 못해 화면 크기별 시각 판정은 보류한다.
