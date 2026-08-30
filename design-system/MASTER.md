# 달력 순서 복원소 디자인 시스템

- 작성일: 2026-08-30 (KST)
- 설계 근거: `$ui-ux-pro-max`의 `elementary calendar learning app playful educational` 검색 결과와 프로젝트의 기존 학습·개인정보 계약
- 원본 검색 산출물: `design-system/calendar-sequence-repair-shop/MASTER.md`
- 적용 대상: Vite + React 정적 학습 앱의 전체 학습자 흐름

## 제품 중심 방향

### 한 문장

달력 자체가 주인공인 밝은 종이 작업대에서, 초등 1~2학년 학습자가 날짜와 요일의 근거를 찾아 한 칸씩 복원한다.

### 시각 세계

검색 결과의 `Claymorphism`을 그대로 장식화하지 않고 **절제된 종이 작업대(Restrained Claymorphism)**로 적용한다.

- 달력 숫자와 선택 상태가 화면의 시각적 중심이다.
- 표면은 흰 종이, 잉크, 한 겹의 부드러운 그림자로 구분한다.
- 둥근 모서리와 2~3px 선은 어린이용 조작감을 주되 모든 요소를 필처럼 만들지 않는다.
- 한 화면에는 primary CTA를 하나만 둔다.
- 쇼케이스·소셜 프루프·장식 카드 그리드는 사용하지 않는다. 이 앱은 설명을 읽고 활동을 수행하는 작업형 학습 흐름이다.
- 라이트 모드만 제공한다. `prefers-color-scheme: dark`로 테마를 바꾸지 않는다.

## 색상 토큰

모든 기능 색상은 텍스트·기호·테두리와 함께 사용한다. 색만으로 정답, 오답, 선택을 전달하지 않는다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-background` | `#F2F5FB` | 앱 전체 배경 |
| `--color-surface` | `#FFFFFF` | 작업대·모달·주요 표면 |
| `--color-surface-muted` | `#E8EDF7` | 보조 설명·진행 표시 |
| `--color-ink` | `#172033` | 본문·큰 숫자 |
| `--color-ink-muted` | `#4B5A70` | 보조 설명 |
| `--color-primary` | `#4F46E5` | 선택·링크·보조 강조 |
| `--color-primary-deep` | `#3730A3` | primary hover·강조 텍스트 |
| `--color-on-primary` | `#FFFFFF` | primary 위 텍스트 |
| `--color-cta` | `#EA580C` | 화면의 유일한 핵심 행동 |
| `--color-on-cta` | `#0F172A` | CTA 위 텍스트 |
| `--color-success` | `#0F766E` | 정답·완료 표면 |
| `--color-danger` | `#B42318` | 오답 안내·오류 |
| `--color-warning` | `#A16207` | 재확인·주의 |
| `--color-focus` | `#1D4ED8` | `:focus-visible` 링 |
| `--color-border` | `#CBD5E1` | 기본 선 |
| `--color-calendar-anchor` | `#FFF0C2` | 기준 날짜 |
| `--color-calendar-missing` | `#FFF6D8` | 복원할 빈 칸 |

본문과 보조 설명은 밝은 표면 위 4.5:1 이상을 유지한다. CTA는 어두운 `--color-on-cta`를 사용하고, 정답·오답은 반드시 문장이나 기호를 함께 렌더링한다.

## 서체와 숫자

외부 폰트 URL을 추가하지 않는다. 정적·무서버·오프라인 친화 계약을 지키기 위해 운영체제에 있는 한국어 글꼴을 우선 사용한다.

```css
--font-heading: "Arial Rounded MT Bold", "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif;
--font-body: "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", system-ui, sans-serif;
```

- 제목: 600~800, 짧고 문장형인 한국어 제목
- 본문: 16px 이상, line-height 1.6
- 버튼: 600~800, 문장형 동사
- 날짜·숫자: `font-variant-numeric: tabular-nums`
- 긴 설명은 데스크톱 65~75자, 모바일 35~60자 안에서 자연스럽게 줄바꿈한다.
- `Baloo 2`, `Comic Neue` 등 검색 결과의 외부 Google Fonts는 제안으로만 기록하고 사용하지 않는다.

## 간격·크기·레이어

- 간격 단위: 4px를 최소 단위로 하고 주요 간격은 8/16/24/32/48px을 사용한다.
- 콘텐츠 최대 폭: 1088px 내외. 넓은 화면에서도 본문 문장이 늘어나지 않는다.
- 터치 목표: 모든 버튼과 선택 칸은 최소 44px, 인접 조작 사이 8px 이상.
- 반경: 작업대 24px, 버튼 14px, 달력 칸 12px, 작은 배지 8px.
- 그림자: 기본은 `0 3px 0 rgba(23, 32, 51, 0.12)`, 모달만 한 단계 깊게 사용한다.
- 레이어: 본문 0, 진행/헤더 10, 모달 40. 임의의 `9999`를 사용하지 않는다.

## 화면 패턴

### 앱 프레임

- 헤더에는 앱 이름과 보조 도구를 두되, 학습 콘텐츠보다 시각적 무게를 낮춘다.
- `skip to content` 링크를 제공한다.
- 단계가 바뀌면 main 제목에 초점을 이동하고 `scroll-padding-top`을 고려한다.
- 진행 표시는 현재 단계, 완료 단계, 남은 단계를 텍스트와 기호로 함께 알려 준다.

### 입구

- 첫 viewport는 “무엇을 복원하는지 → 어떻게 시작하는지” 순서다.
- 장식 SVG는 짧은 소개 옆에 배치하되 정보 자산으로 취급하지 않는다.
- 6개 미션 목록과 개인정보 경계는 보조 영역으로 정리한다.

### 학습 작업대

- 상단: `미션 n / 6`, 한 문장 질문, 필요한 근거.
- 중앙: HTML로 만든 달력 또는 관계 선택. 달력 숫자와 요일은 가장 큰 정보다.
- 하단: 현재 선택 수/예상 문장과 primary CTA.
- 설명이 긴 단계에서도 CTA가 설명 아래 묻히지 않도록 작업대 내부 순서를 유지한다.

### 피드백·결과

- 정답: 근거 문장 + 다음 행동.
- 첫 오답: 정답 공개 없이 다시 볼 근거 + 수정 행동.
- 두 번째 결과: 수정 결과 기록 + 다음 행동.
- 응답 후 피드백 제목 또는 다음 CTA로 초점을 옮기고, 새 상태가 보이도록 스크롤한다.
- 결과 화면은 점수·등급 대신 최초 판단·사용한 근거·수정 결과를 읽기 순서대로 보여 준다.

## 컴포넌트 상태

공통 버튼, 달력 칸, 선택지, 행사 카드, 모달은 기본·hover·active·focus-visible·disabled·선택·오류/안내 상태를 정의한다.

- primary: `--color-cta` + `--color-on-cta`, 한 화면에 하나
- secondary: surface + border, primary보다 조용하게
- ghost: 배경 없음, 뒤로 가기 같은 보조 이동
- 선택: 배경 변화 + 3px 선 + `aria-pressed` + “선택됨” 텍스트/기호
- disabled: 낮은 대비가 아니라 충분히 구별되는 표면과 `disabled` semantics
- 모달: 제목 id/`aria-labelledby`, 열릴 때 첫 제어로 이동, Tab/Shift+Tab 내부 순환, Escape/닫기/호출자 복귀

## 모션

- 검색 결과의 Subtle motion만 채택한다. GSAP와 새 애니메이션 의존성을 추가하지 않는다.
- `gi-pulse`는 학생이 반드시 눌러야 하는 현재 단계의 핵심 CTA에만 사용한다.
- hover/active는 150~250ms의 색·그림자·transform 변화로 즉시 반응한다.
- layout property(`top`, `left`, `width`, `height`)를 애니메이션하지 않는다.
- `prefers-reduced-motion: reduce`와 앱의 애니메이션 줄이기 설정에서는 맥박·전환을 제거하고 고정 외곽선과 `필수` 배지로 대체한다.
- 활동에 필요한 내용은 애니메이션이 끝나기 전에도 DOM에서 읽고 조작할 수 있어야 한다.

## 반응형·접근성 기준

- 기준 viewport: 320×568, 375×812, 768×1024, 1280×800.
- 320px에서는 7열 달력을 읽기 목록으로 바꾸고, 그 외에는 가로 넘침이 없어야 한다.
- 200% 글자 확대에서 본문과 CTA가 잘리지 않고 세로로 재배치된다.
- 키보드 Tab 순서는 시각 순서와 같고, 달력은 화살표/Enter/Space를 지원한다.
- focus ring은 2~4px 이상이며 배경과 충분한 대비를 가진다.
- 이미지 없이도 시작·활동·피드백·결과를 완주할 수 있다.
- VoiceOver 수동 검증은 프로젝트 범위에서 제외한다. 자동 axe와 키보드/시각 검증은 유지한다.

## 금지 사항

- 외부 Google Fonts, 외부 이미지 핫링크, 런타임 AI/분석/광고/저장소
- 실제 달력 정보가 들어간 생성 이미지, 생성된 숫자·요일·로고·문자
- 모든 요소에 같은 카드·필을 적용하는 장식적 Claymorphism
- 이모지를 구조적 아이콘으로 사용
- 다크 모드, 학생용 TTS·음성 안내·녹음
- 색만으로 선택·정답·오답을 전달
