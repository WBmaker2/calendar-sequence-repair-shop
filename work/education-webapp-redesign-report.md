# 달력 순서 복원소 전체 리디자인 실행 보고서

- 보고일: 2026-08-30 (KST)
- 대상: `/Volumes/ External Drive 256G/Dev2/codex/calendar-sequence-repair-shop`
- 결과: **구현·커밋·푸시·GitHub Pages 배포 완료; 브라우저 시각 검증은 환경 제한으로 보류**

이 문서의 앞부분은 `$ui-ux-pro-max`가 아직 런타임에 없던 초기 보류 상태를 보존한 기록이다. 사용자가 Skill 문서와 경로를 제공한 뒤 아래 후속 실행에서 설계·코드 구현을 재개했다.

## 완료한 사전 작업

- 현재 브랜치와 변경 상태 확인: `main`, `d819783`, 시작 시 dirty change 없음
- Vite/React/TypeScript/npm 스택, 앱 진입점, 고정 미션, 상태 전이, 자산, 테스트·E2E 경로 조사
- 프로젝트 규칙 후보 문서 확인: 프로젝트 경로에 `AGENTS.md`, `EDUCATION_DESIGN.md`, `design-system/MASTER.md` 없음; 기존 README·계획·콘텐츠 검수·QA 문서를 제품 계약으로 기록
- `work/education-webapp-redesign-plan.md` 작성
- `work/education-webapp-redesign-audit.md` 작성
- `work/education-webapp-redesign-assets.md` 작성
- 이 보고서 작성

## Skill 실행 상태

| Skill | 상태 | 근거 |
|---|---|---|
| `$education-webapp-redesign` | available / loaded | `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/SKILL.md` |
| `$impeccable` | available / loaded | `/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md`; context와 detector 실행 |
| `$ui-ux-pro-max` | available via user-provided skill | `/Users/kimhongnyeon/.agents/skills/ui-ux-pro-max/SKILL.md`를 실제로 읽고 CLI 검색 실행 |
| `$redesign-existing-projects` | available / loaded / not run | `/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md`; 구현 게이트 보류 |
| `$imagegen` | available / loaded / not run | `/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md`; 자산 생성 게이트 보류 |
| asset safety reference | available / loaded | `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/references/asset-safety.md` |

초기에는 `$ui-ux-pro-max`가 없어 구현을 보류했으나, 사용자가 정확한 Skill 문서와 경로를 제공한 뒤 실제 문서를 읽고 CLI 검색을 실행했다. 검색 결과를 프로젝트의 오프라인·교육용 계약에 맞게 조정해 `design-system/MASTER.md`를 작성했다.

## 초기 검증 결과

- `npm run lint`: 통과
- `npm run typecheck`: 통과
- `npm run test:run`: 통과, 12개 파일·107개 테스트
- `npm run test:a11y`: 통과, 5개 테스트
- `npm run check:lines`: 통과, TS·TSX·CSS 500줄 이상 없음
- `node /Users/kimhongnyeon/.codex/skills/impeccable/scripts/detect.mjs --json src`: `[]`, detector findings 0건
- `npm run test:e2e`: 브라우저 서버 준비 30초 timeout으로 보류. 후속 진단에서 4173 포트가 다른 프로젝트의 Vite 프로세스에 점유된 것을 확인했으며, 해당 사용자 프로세스는 종료하지 않았다.
- `npm run build`: 이번 보류 실행에서는 다시 실행하지 않음. 기존 QA 문서의 과거 통과 기록은 현재 실행 증거로 재사용하지 않음.
- VoiceOver: 프로젝트 규칙과 요청 범위상 제외

## 발견된 초기 우선순위

1. `App.tsx`에 skip link와 main 대상 id가 없다.
2. `ModalDialog.tsx`가 이전 초점 복귀는 처리하지만 Tab focus trap은 없다.
3. 같은 단계에서 응답한 뒤 `FeedbackPanel`로 초점·스크롤을 옮기는 계약이 없다.
4. 공통 카드 표면이 반복되고 `app.css`가 490줄, `workbench.css`가 403줄이라 전체 리디자인 전에 시스템 분리가 필요하다.

세부 근거와 수용 기준은 `work/education-webapp-redesign-audit.md`와 `work/education-webapp-redesign-plan.md`에 있다.

## 초기 보류 당시 아직 하지 않은 작업

- `$ui-ux-pro-max` 기반 디자인 시스템 수립 및 `design-system/MASTER.md` 작성
- React/CSS 리디자인 구현
- 이미지 생성·편집·교체
- 최종 `$impeccable` 검수
- fresh build와 브라우저 학습자 흐름/레이아웃 캡처
- 커밋, 푸시, 배포, HVC 등록

## 후속 실행 — 2026-08-30

사용자가 `$ui-ux-pro-max` Skill 문서와 경로를 제공하여 이전 보류 게이트를 해소했다. 문서를 실제로 읽고 다음 검색을 실행했다.

- `--design-system`: `elementary calendar learning app playful educational`
- `--domain typography`: `Korean elementary education readable sans`
- `--domain color`: `classroom learning light warm palette`
- `--domain ux`: `keyboard focus modal skip link focus management`
- `--stack react`: `React CSS accessible responsive state`

검색 결과를 프로젝트 계약에 맞게 조정한 디자인 시스템을 `design-system/MASTER.md`에 작성했고, 원본 검색 산출물은 `design-system/calendar-sequence-repair-shop/MASTER.md`로 보존했다. 이제 `$redesign-existing-projects` 구현 단계로 진행한다.

## 다음 단계

## 구현 및 최종 로컬 검증

- 디자인 시스템: `design-system/MASTER.md`에 프로젝트용 토큰·패턴·금지 경계를 작성하고 원본 검색 결과는 `design-system/calendar-sequence-repair-shop/MASTER.md`에 보존했다.
- 접근성 마감: `src/app/App.tsx` skip link, `src/components/ModalDialog.tsx` focus trap, `src/features/calendar-repair/FeedbackPanel.tsx` 결과 제목 초점을 구현했다.
- 시각 리디자인: 입구를 일러스트·학습 목표·시작 CTA의 2열 작업 소개로, 미션을 달력 중심 작업대로, 결과를 기록 표면으로 재구성했다. CSS는 500줄 제한을 지키기 위해 `components.css`와 `surfaces.css`로 분리했다.
- 자산: 기존 `friendly-paper-calendar.svg`를 장식 역할로 유지했으며 새 이미지 생성은 필요하지 않아 호출하지 않았다.
- `npm run lint`: 통과
- `npm run typecheck`: 통과
- `npm run test:run`: 통과, 13개 파일·108개 테스트
- `npm run test:a11y`: 통과, 5개 테스트
- `npm run check:lines`: 통과, 모든 TS·TSX·CSS 파일 500줄 미만
- `npm run build`: 통과, Vite production bundle 생성
- Impeccable detector: 최종 실행 결과 `[]`
- 브라우저: 별도 4188 포트의 Playwright CLI를 세 차례 시도했으나 npm 캐시 및 Playwright 데몬 캐시의 `EPERM` 권한 오류로 실행하지 못했다. 기존 4173·4174·4175 포트의 다른 프로세스는 종료하지 않았다.
- E2E: 기존 설정은 4173 공용 포트 충돌로 이전부터 준비 timeout 상태이며, 실제 브라우저 실행 증거로 보고하지 않는다.
- 커밋·푸시·GitHub Pages 배포: 2026-08-30 사용자 요청으로 완료했다. HVC 등록은 별도 실행하지 않았다.

다음 출시 전 게이트는 권한이 정리된 브라우저 세션에서 `page.goto('./')` 기반 실제 학습자 경로, 320/375/768/1280px, 200% 확대, 콘솔·가로 넘침·reduced motion을 확인하는 것이다. VoiceOver는 프로젝트 규칙에 따라 제외한다.

## 공개 배포 기록 — 2026-08-30

- 커밋: `7f5bfd2 feat: redesign calendar learning workbench`
- 커밋: `24130c7 docs: record redesign plan and validation`
- 원격: `main`에 푸시 완료 (`origin/main`과 동기화)
- CI: [GitHub Actions 실행 33293756860](https://github.com/WBmaker2/calendar-sequence-repair-shop/actions/runs/33293756860) 성공
- Pages: [GitHub Pages 배포 실행 33293756843](https://github.com/WBmaker2/calendar-sequence-repair-shop/actions/runs/33293756843) 성공
- 공개 앱: [달력 순서 복원소](https://wbmaker2.github.io/calendar-sequence-repair-shop/)
- 공개 확인: 앱 HTML HTTP 200, 제목 `달력 순서 복원소`, 참조 CSS/JS 자산 각각 HTTP 200
- Pages 배포 경고: GitHub Actions가 Node.js 20 대상 액션을 Node.js 24로 강제 실행한다는 알림만 있었고, 빌드·배포 결과에는 영향이 없었다.

이 기록을 포함한 문서 커밋도 같은 `main` 배포 흐름으로 CI와 Pages를 다시 확인한다.
