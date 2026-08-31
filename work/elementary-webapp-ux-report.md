# 달력 순서 복원소 교육용 UX 점검·개선 최종 보고서

- 점검일: 2026-08-31 (KST)
- 실행 모드: `full`
- 대상: `/Volumes/ External Drive 256G/Dev2/codex/calendar-sequence-repair-shop`
- 학습자 관점: 초등 1–2학년 민서, 초등 3–4학년 준호 가드레일
- 최종 상태: **조건부 완료 — 소스 개선·검증·커밋·푸시·GitHub Pages 배포 완료**

## 결론

모바일 학습 흐름에서 가장 큰 문제였던 단계 전환 초점·스크롤 위치를 `main#main-content` 기준으로 고쳤습니다. 오답 후에는 첫 입력으로 초점이 돌아오고, 피드백 제목을 기준으로 전체 피드백과 다음 행동이 함께 보이도록 조정했습니다. 320px 입구의 상단 문구와 시작 버튼도 온전히 보입니다.

기준선 휴리스틱 점수는 78/100이었고, 최종 점수는 93/100입니다. strict E2E와 독립적인 200% 확대 시나리오는 실행하지 않았으므로 릴리스 게이트는 `conditional`로 남겼습니다. 이후 사용자 요청으로 커밋 `51fc403`을 `main`에 푸시했고 GitHub Pages 배포도 성공했습니다.

## 적용한 개선

- `src/app/App.tsx`: 첫 진입 자동 스크롤을 없애고 실제 단계 전환 때 현재 `main`으로 focus·스크롤 이동.
- `src/features/calendar-repair/CalendarWorkbench.tsx`: `다시 고치기` 뒤 작업대 첫 활성 버튼으로 focus·근접 스크롤.
- `src/features/calendar-repair/FeedbackPanel.tsx`, `workbench.css`: 피드백 제목을 `start` 기준으로 보여 주고 상단 여백 확보.
- `src/styles/app.css`: 320/375px 입구에서 영웅 영역 간격과 장식 크기를 조정.
- `src/features/report/LearningReport.tsx`: 추상적인 결과 한계 문장을 “다른 달력의 날짜는 직접 확인해 보세요”라는 행동 문장으로 개선.
- `src/update/updateHistory.ts`: 2026-08-31 모바일 학습 흐름 점검 내역 추가.
- 관련 단위 테스트: 단계 전환 focus, 재시도 focus, 결과 문구 회귀 테스트 보강.

날짜 계산, reducer 상태 전이, 미션 콘텐츠, 개인정보 없는 로컬 처리, 라이트 모드, HTML 달력, 키보드 조작 계약은 보존했습니다.

## 브라우저 증거

Codex In-app Browser에서 로컬 개발 서버 `http://127.0.0.1:4188/`를 기준으로 확인했습니다.

| 시나리오 | 결과 |
|---|---|
| 1280×900 입구 | 제목·장식·목표·시작 CTA가 안정적으로 보임; `scrollY=0` |
| 320×800 입구 | eyebrow `top=12`, 시작 CTA `top=730.19`–`bottom=786.19`; 가로 넘침 없음 |
| 시작 → 요일 띠 → 미션 1 | `activeElement=main#main-content`; 현재 제목과 달력·첫 선택지가 viewport에 보임 |
| 미션 1 오답 → 다시 고치기 | 피드백 제목·재시도 CTA가 보이고, 재시도 뒤 첫 `1일` 버튼에 focus 복귀 |
| 미션 1 정답 | 근거와 `다음으로` CTA가 함께 보임 |
| 전체 경로 → 월 경계 | `9월 31일` 오류 문구와 `10월 1일 목요일` 정답, 결과 기록까지 공개본에서 완료 |
| 키보드 | 달력 칸 focus 후 `ArrowRight`로 다음 날짜 칸 이동 확인; Enter/Space 회귀는 단위·E2E 소스 계약으로 보강 |
| reduced motion | `reduce-motion=true`, 핵심 `.gi-pulse`의 computed animation이 `none` |
| 업데이트 내역 | 대화상자 열림, 최신 2026-08-31 내역 표시, 닫기 후 대화상자 제거 |
| 런타임 상태 | 콘솔 error/warn 없음, 깨진 이미지 없음, 모든 확인 viewport에서 `scrollWidth <= clientWidth` |

공개 검증은 [GitHub Pages 배포본](https://wbmaker2.github.io/calendar-sequence-repair-shop/)에서 375px viewport로 수행했다. 오답 후 첫 `1일` 버튼 focus 복귀, 전체 6개 미션 완료, 결과 제목·모형 한계 문장 표시, 콘솔 경고 없음과 깨진 이미지 0건을 확인했다.

## 정적 검증

- `npm run lint` 통과
- `npm run typecheck` 통과
- `npm run test:run` 통과 — 13개 파일, 108개 테스트
- `npm run test:a11y` 통과 — 5개 테스트
- `npm run check:lines` 통과 — TS/TSX/CSS 모두 500줄 미만
- `npm run build` 통과 — production Vite build 완료
- Impeccable detector 결과: `[]`

## 학습자 언어·시뮬레이션·자산 판정

- 실제 화면 문구만 별도 장부에서 triage했다. 결과 화면의 모형 한계 문장은 개선 완료했다.
- 미션 2의 “월요일 두 개”, 미션 4의 “일주일 뒤” 지시는 현재 의미가 정확해 유지했으며 후속 아동 재진술 테스트 후보로 남겼다.
- 별도 Canvas/WebGL 시뮬레이션은 학습 목표에 필요하지 않다. DOM 달력과 선택 상태가 예측→조작→근거 확인을 충분히 제공한다.
- 기존 `friendly-paper-calendar.svg`는 장식으로 보존했다. 사실·날짜·요일을 대체하는 새 이미지는 필요하지 않아 이미지 생성은 실행하지 않았다.
- VoiceOver·TTS·내레이션·녹음과 해당 검증은 요청 범위에서 제외했다.

## 남은 확인과 다음 단계

- strict `npm run test:e2e`: 이번 패스에서는 실행하지 않음.
- 독립적인 200% 확대 브라우저 시나리오: 이번 패스에서는 실행하지 않음.
- 실제 아동·교사 수업 관찰: 별도 수동 HVC가 필요함.
- 커밋: `51fc403 fix: improve learner flow and mobile UX`
- [CI 실행 33369454935](https://github.com/WBmaker2/calendar-sequence-repair-shop/actions/runs/33369454935): 성공
- [Pages 실행 33369454906](https://github.com/WBmaker2/calendar-sequence-repair-shop/actions/runs/33369454906): build/deploy 성공

## 확인 링크

- [로컬 개선본 HVC](http://127.0.0.1:4188/)
- [최종 공개 배포본](https://wbmaker2.github.io/calendar-sequence-repair-shop/)
- [상세 실행 계획](./elementary-webapp-ux-plan.md)
- [상세 감사 장부](./elementary-webapp-ux-audit.md)
- [학습자 언어 감사](./elementary-webapp-ux-language-audit.md)
- [시뮬레이션 결정](./elementary-webapp-ux-simulation-decision.md)
