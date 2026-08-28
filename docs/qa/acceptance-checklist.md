# 수용 점검표 — 달력 순서 복원소

점검일: 2026-08-28 · 근거: `npm run verify` 전체 실행 결과 (lint → typecheck → 단위·컴포넌트 → a11y → 줄 수 → build → E2E)

## 1. 자동 검증 결과

| 검증 명령 | 기대 | 결과 |
|---|---|---|
| `npm run lint` | 오류 0건 | 통과 |
| `npm run typecheck` | 오류 0건 | 통과 |
| `npm run test:run` | 단위·컴포넌트 실패 0건 | 통과 (12개 파일, 107개 테스트) |
| `npm run test:a11y` | serious/critical 위반 0건 | 통과 (입구·요일 띠·예측·선택·대화상자 5단계 axe 검사) |
| `npm run check:lines` | TS·TSX·CSS 500줄 이상 0개 | 통과 |
| `npm run build` | dist 생성, base `/calendar-sequence-repair-shop/` | 통과 (해시 자산 포함) |
| `npm run test:e2e` | 시나리오 전부 통과 | 통과 (10개: 학습 흐름 4 + 키보드 2 + 모바일·모션 4) |
| `git diff --check` | 출력 없음 | 통과 |

## 2. 앱별 완료 기준 (계획 §14)

- [x] 2026-09-01은 화요일, 2026-09-30은 수요일, 2026-10-01은 목요일로 일치 — `src/domain/calendarMath.test.ts` 요일 fixture 13건
- [x] UTC 기반 계산으로 실행 시간대가 달라도 결과 불변 — UTC/America/New_York/Pacific/Kiritimati 3시간대 실행 테스트
- [x] 9월 31일 등 존재하지 않는 날짜 거부 — `isValidDateKey`와 월 경계 미션의 "9월 31일은 제출 불가" 안내 (컴포넌트·E2E 검증)
- [x] 어제·오늘·내일과 일주일 뒤를 서로 다른 관계(previous-day/next-day/seven-days-after)로 기록
- [x] 개인 생일·학교 행사·이름 입력·저장 없음 — 런타임 경계 테스트(저장소 쓰기 차단, 네트워크 호출 0건) + 소스 수준 금지 API 스캔

## 3. E2E 시나리오 (계획 §12 Task 8)

- [x] 9월 3일 목요일 빈칸 복원 (숨긴 날짜 미렌더링 확인 포함)
- [x] 9월 14일의 어제(13일 일요일)·내일(15일 화요일) 연결
- [x] 9월 8일에서 일주일 뒤 9월 15일 찾기
- [x] 9월 30일 다음을 10월 1일 목요일로 완성 후 기록 화면 도착
- [x] 키보드 화살표로 달력 칸 이동, Enter/Space 선택, Shift+Tab 역행
- [x] 320px에서 7열이 읽기 목록으로 전환(열 머리글 숨김, 칸 안 요일 표시) + 가로 넘침 없음
- [x] 375px·200% 확대(640×400)에서 가로 넘침 없음
- [x] 축소 모션(reduced motion)에서 맥박 제거, 3px 고정 외곽선 + "필수" 배지로 대체
- [x] 개인 날짜 입력·저장·네트워크 요청 없음 (전체 학습 흐름 런타임 감시)

## 4. 명시적 제외와 사람 검수 경계 (계획 §15)

- VoiceOver 구현·검증은 수행하거나 완료로 보고하지 않았다 (계획상 제외).
- 자동화 통과가 다음 항목을 대체하지 않는다:
  - [ ] 저학년 교사/수학 교과 교사의 용어·월 경계 문구 승인 (`docs/content-review.md` §7)
  - [ ] 화면 문장 난이도와 7열 인지 부담의 실제 아동 확인
  - [ ] 실제 태블릿 기기 가독성 확인
- 장식 일러스트는 이미지 생성 모델 대신 직접 제작한 벡터 자산으로 대체했다 (`docs/image-rights-ledger.md` 차이 기록).

## 5. 출시 전 남은 단계 (별도 승인 필요)

1. 원격 저장소 생성·push (WBmaker2/calendar-sequence-repair-shop, main 브랜치)
2. GitHub Actions 성공 후 https://wbmaker2.github.io/calendar-sequence-repair-shop/ 공개 확인
3. HVC 관리자 등록과 정적 갤러리 동기화
4. 위 §4의 사람 검수 완료
