export interface UpdateHistoryEntry {
  readonly date: string;
  readonly title: string;
  readonly description?: string;
}

export const UPDATE_HISTORY: readonly UpdateHistoryEntry[] = [
  {
    date: "2026-08-28",
    title: "구현 계획 확정",
    description:
      "달력 순서 복원소의 학습 목표, 미션 6개, 접근성·개인정보 경계를 담은 구현 계획이 확정되었어요.",
  },
];
