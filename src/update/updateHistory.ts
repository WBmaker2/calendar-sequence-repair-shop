export interface UpdateHistoryEntry {
  readonly date: string;
  readonly title: string;
  readonly description?: string;
}

export const UPDATE_HISTORY: readonly UpdateHistoryEntry[] = [
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
