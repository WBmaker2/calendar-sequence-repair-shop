import type { MissionId } from "../../domain/types";

export const MISSION_HEADINGS: Record<MissionId, string> = {
  "calendar-gap-01": "빈 칸 예측하기",
  "calendar-week-02": "같은 월요일 찾기",
  "calendar-yesterday-03": "어제·오늘·내일 연결",
  "calendar-after-seven-04": "일주일 뒤 찾기",
  "calendar-order-05": "행사 날짜 순서 배열",
  "calendar-month-06": "다음 달로 이어 주기",
};

export const MISSION_INSTRUCTIONS: Record<MissionId, string> = {
  "calendar-gap-01": "9월 첫 주에서 빠진 칸을 날짜와 요일 근거로 복원해요.",
  "calendar-week-02": "같은 요일은 7일 차이로 이어져요. 월요일 두 개를 찾아요.",
  "calendar-yesterday-03": "9월 14일 월요일을 기준으로 어제와 내일을 연결해요.",
  "calendar-after-seven-04": "일주일 뒤에는 같은 요일이 돌아와요.",
  "calendar-order-05": "달력에서 앞쪽 칸일수록 날짜가 빨라요.",
  "calendar-month-06": "한 달이 끝나면 다음 달 1일로 이어져요.",
};
