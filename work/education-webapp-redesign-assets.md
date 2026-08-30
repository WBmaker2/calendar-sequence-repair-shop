# 달력 순서 복원소 리디자인 자산 기록

- 기록일: 2026-08-30 (KST)
- 상태: **자산 감사 완료; 기존 장식 자산 유지**
- 이유: 디자인 시스템과 화면 구현 후에도 현재 SVG가 장식 역할을 충족하며, 사실성 있는 달력 정보를 이미지로 만들 필요가 없었다.
- 기준: `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/references/asset-safety.md`

## 현재 자산 목록

| 원본 경로 | 사용 화면·역할 | 판정 | 새 파일 | 접근성 | 상태 | 롤백 |
|---|---|---|---|---|---|---|
| `src/assets/generated/friendly-paper-calendar.svg` | `EntranceScreen.tsx` 입구의 종이 달력 장식 | 유지; 일반 장식/개념 자산 | 없음 | `alt=""`, `aria-hidden="true"`; 학습 정보 대체 수단 아님 | 참조·권리 기록 확인 | 새 자산이 생기면 이 import를 원래 SVG로 복원 |
| `public/favicon.svg` | 브라우저 탭의 식별 아이콘 | 자동 교체 금지; 브랜드/식별 자산 | 없음 | HTML favicon; 학생 흐름의 정보 자산 아님 | 유지 | 새 favicon이 사람 승인된 경우에만 교체 |

## 사용처 감사

- JSX/TSX import: `src/features/calendar-repair/EntranceScreen.tsx:2`에서 SVG 1개를 import한다.
- CSS `url()`, `srcset`, preload, 외부 이미지 URL은 현재 검색 결과에서 발견되지 않았다.
- 실제 달력 숫자·요일·격자는 `src/features/calendar-repair/CalendarGrid.tsx`의 HTML grid로 렌더링되므로 이미지로 대체하지 않는다.
- 현재 권리 장부 `docs/image-rights-ledger.md`는 SVG가 외부 소재 없이 프로젝트에서 직접 제작되었고 장식으로만 사용된다고 기록한다.

## 생성·교체 계획

1. `$ui-ux-pro-max` 가용 및 디자인 방향 승인 뒤, 장식 이미지가 학습 근거를 가리지 않는지 다시 판정한다.
2. 새 일반 장식이 필요할 때만 `$imagegen`을 `illustration-story` 또는 `stylized-concept` 등 실제 용도에 맞는 taxonomy로 호출한다.
3. 프롬프트에는 초등 1~2학년, 입구 장식 역할, 가로 비율, 숫자·요일·문자·로고·워터마크 금지를 명시한다.
4. 원본을 덮어쓰지 않고 의미가 드러나는 `-v2` 파일로 저장하며 import와 테스트 fixture를 함께 갱신한다.
5. 결과를 실제로 열어 문자·수치·로고·사실처럼 보이는 달력 정보가 없는지 확인하고, 생성 프롬프트·날짜·사용 위치·alt 결정을 장부에 추가한다.

## 현재 검토 상태

- 새 이미지: 없음
- 이미지 생성 호출: not run; 현재 장식 SVG 교체 필요성이 확인되지 않음
- 자동 교체 금지 자산: favicon 보존
- 사람 검토 필요 자산: 현재 없음; 새 후보가 사실·출처·브랜드 정보를 전달하면 사람 검토 대기로 분류
- 설계 시스템 확정: `design-system/MASTER.md`에 외부 폰트·실제 달력 정보가 들어간 생성 이미지 금지 규칙을 추가함

## 구현 후 판정 — 2026-08-30

- 입구 리디자인에서 기존 `friendly-paper-calendar.svg`를 새로 생성하지 않고, HTML 텍스트와 실제 달력 UI가 학습 정보를 계속 전달하도록 했다.
- 이미지 생성 모델 호출: 없음. 새 장식이 없어도 작업대의 시각 맥락과 학습 흐름이 완성되므로 불필요한 자산을 추가하지 않았다.
- 권리·접근성 경계: 기존 SVG import, `alt=""`, `aria-hidden="true"`, `docs/image-rights-ledger.md` 기록을 유지했다.
