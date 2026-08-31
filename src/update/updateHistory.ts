export interface UpdateHistoryEntry {
  readonly date: string;
  readonly title: string;
  readonly description?: string;
}

export const UPDATE_HISTORY: readonly UpdateHistoryEntry[] = [
  {
    date: "2026-08-31",
    title: "모바일 학습 흐름 점검",
    description:
      "단계가 바뀌면 현재 활동으로 바로 이동하고, 오답 뒤에는 새 답을 바로 고를 수 있도록 포커스와 화면 위치를 다듬었어요.",
  },
  {
    date: "2026-08-30",
    title: "달력 작업대 전체 리디자인",
    description:
      "달력 학습 흐름이 한눈에 보이도록 작업대 구조와 색·간격·포커스 이동을 정리하고, 작은 화면에서도 핵심 행동을 먼저 만날 수 있게 개선했어요.",
  },
  {
    date: "2026-08-28",
    title: "학습 앱 구현 완료 (로컬 검증 통과)",
    description:
      "미션 6개 학습 흐름, 결과 기록·인쇄, 접근성·개인정보 경계 테스트와 E2E가 모두 통과했어요. 공개 배포는 별도 승인 후 진행돼요.",
  },
  {
    date: "2026-08-28",
    title: "구현 계획 확정",
    description:
      "달력 순서 복원소의 학습 목표, 미션 6개, 접근성·개인정보 경계를 담은 구현 계획이 확정되었어요.",
  },
];
