import { useState } from "react";
import ActionButton from "../../../components/ActionButton";
import { isValidDateKey } from "../../../domain/calendarMath";
import type { CalendarAnswer, CalendarMission, DateKey } from "../../../domain/types";
import CalendarGrid from "../CalendarGrid";
import { buildMissionGrid, weekdayFromKo } from "../calendarCells";

interface BoundaryStageProps {
  readonly mission: CalendarMission;
  readonly onSubmit: (answer: CalendarAnswer) => void;
}

const DATE_CHOICES = ["9월 31일", "10월 1일", "10월 2일"] as const;
const WEEKDAY_CHOICES = ["수요일", "목요일", "금요일"] as const;

const DATE_KEY_BY_CHOICE: Partial<Record<(typeof DATE_CHOICES)[number], DateKey>> = {
  "10월 1일": "2026-10-01",
  "10월 2일": "2026-10-02",
};

type DateChoice = (typeof DATE_CHOICES)[number];
type WeekdayChoice = (typeof WEEKDAY_CHOICES)[number];

export default function BoundaryStage({ mission, onSubmit }: BoundaryStageProps) {
  const [dateChoice, setDateChoice] = useState<DateChoice | null>(null);
  const [weekdayChoice, setWeekdayChoice] = useState<WeekdayChoice | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const grid = buildMissionGrid(mission);
  const canSubmit = dateChoice !== null && weekdayChoice !== null;

  const handlePickDate = (choice: DateChoice) => {
    setDateChoice(choice);
    setNotice(null);
  };

  const handleSubmit = () => {
    if (dateChoice === null || weekdayChoice === null) return;
    const date = DATE_KEY_BY_CHOICE[dateChoice];
    if (date === undefined || !isValidDateKey(date)) {
      setNotice("9월 31일은 달력에 없는 날짜예요. 9월은 30일까지예요. 다시 골라 봐요.");
      return;
    }
    const answer: CalendarAnswer = {
      selectedDates: [date],
      relation: "month-boundary",
      weekday: weekdayFromKo(weekdayChoice),
    };
    onSubmit(answer);
  };

  return (
    <div className="boundary-stage">
      <CalendarGrid
        cells={grid.entries}
        maxRow={grid.maxRow}
        selectable={false}
        selectedDates={[]}
        anchorDate={mission.anchorDate}
        ariaLabel="2026년 9월 마지막 주와 10월 첫 주 연습 달력"
      />
      <p className="stage-lead">9월 30일의 다음 날을 찾아 새로운 달과 이어 주어요.</p>

      <div role="group" aria-label="다음 날짜 고르기" className="choice-group">
        <p className="choice-question">9월 30일 다음 날은 언제일까요?</p>
        <div className="choice-buttons">
          {DATE_CHOICES.map((choice) => (
            <button
              key={choice}
              type="button"
              className="choice-button"
              aria-pressed={dateChoice === choice}
              onClick={() => handlePickDate(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>

      <div role="group" aria-label="다음 날 요일 고르기" className="choice-group">
        <p className="choice-question">그날은 무슨 요일일까요?</p>
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

      {notice ? (
        <p className="stage-hint" role="alert">
          {notice}
        </p>
      ) : null}

      <ActionButton variant="primary" pulse disabled={!canSubmit} onClick={handleSubmit}>
        관계 완성
      </ActionButton>
    </div>
  );
}
