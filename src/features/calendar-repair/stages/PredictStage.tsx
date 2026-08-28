import { useState } from "react";
import ActionButton from "../../../components/ActionButton";
import { isValidDateKey } from "../../../domain/calendarMath";
import type { CalendarAnswer, CalendarMission, DateKey } from "../../../domain/types";
import CalendarGrid from "../CalendarGrid";
import { buildMissionGrid, weekdayFromKo } from "../calendarCells";

interface PredictStageProps {
  readonly mission: CalendarMission;
  readonly onSubmit: (answer: CalendarAnswer) => void;
}

const WEEKDAY_CHOICES = ["수요일", "목요일", "금요일"] as const;

export default function PredictStage({ mission, onSubmit }: PredictStageProps) {
  const [day, setDay] = useState<number | null>(null);
  const [weekdayChoice, setWeekdayChoice] = useState<string | null>(null);

  const hiddenDate = mission.hiddenDates[0];
  const grid = buildMissionGrid(mission);
  const dayChoices = [...mission.visibleDates, ...mission.hiddenDates]
    .map((date) => Number(date.slice(8, 10)))
    .sort((a, b) => a - b);

  const canSubmit = day !== null && weekdayChoice !== null && hiddenDate !== undefined;

  const handleSubmit = () => {
    if (day === null || weekdayChoice === null || hiddenDate === undefined) return;
    const date = `${hiddenDate.slice(0, 8)}${String(day).padStart(2, "0")}`;
    if (!isValidDateKey(date)) return;
    const answer: CalendarAnswer = {
      selectedDates: [date as DateKey],
      relation: "next-day",
      weekday: weekdayFromKo(weekdayChoice),
    };
    onSubmit(answer);
  };

  return (
    <div className="predict-stage">
      <CalendarGrid
        cells={grid.entries}
        maxRow={grid.maxRow}
        selectable={false}
        selectedDates={[]}
        ariaLabel="2026년 9월 첫 주 연습 달력"
      />
      <p className="stage-lead">비어 있는 칸의 날짜와 요일을 먼저 예상해 봐요.</p>

      <div role="group" aria-label="빈 칸의 날짜 고르기" className="choice-group">
        <p className="choice-question">빈 칸의 날짜는 며칠일까요?</p>
        <div className="choice-buttons">
          {dayChoices.map((choice) => (
            <button
              key={choice}
              type="button"
              className="choice-button"
              aria-pressed={day === choice}
              onClick={() => setDay(choice)}
            >
              {choice}일
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label="빈 칸의 요일 고르기" className="choice-group">
        <p className="choice-question">빈 칸의 요일은 무슨 요일일까요?</p>
        <div className="choice-buttons">
          {WEEKDAY_CHOICES.map((choice) => (
            <button
              key={choice}
              type="button"
              className="choice-button"
              aria-pressed={weekdayChoice === choice}
              onClick={() => setWeekdayChoice(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>

      {day !== null && weekdayChoice !== null && hiddenDate !== undefined ? (
        <p className="stage-preview">
          예상: {Number(hiddenDate.slice(0, 4))}년 {Number(hiddenDate.slice(5, 7))}월 {day}일{" "}
          {weekdayChoice}
        </p>
      ) : null}

      <ActionButton variant="primary" disabled={!canSubmit} onClick={handleSubmit}>
        예상 완료하기
      </ActionButton>
    </div>
  );
}
