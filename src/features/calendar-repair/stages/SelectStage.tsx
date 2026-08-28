import { useState } from "react";
import ActionButton from "../../../components/ActionButton";
import { weekdayOf } from "../../../domain/calendarMath";
import type { CalendarAnswer, CalendarMission, DateKey } from "../../../domain/types";
import CalendarGrid from "../CalendarGrid";
import { buildMissionGrid } from "../calendarCells";

interface SelectStageProps {
  readonly mission: CalendarMission;
  readonly onSubmit: (answer: CalendarAnswer) => void;
}

const REQUIRED_PICKS = 2;

export default function SelectStage({ mission, onSubmit }: SelectStageProps) {
  const [selected, setSelected] = useState<readonly DateKey[]>([]);
  const grid = buildMissionGrid(mission);

  const toggle = (date: DateKey) => {
    setSelected((current) => {
      if (current.includes(date)) {
        return current.filter((candidate) => candidate !== date);
      }
      if (current.length >= REQUIRED_PICKS) {
        return current;
      }
      return [...current, date];
    });
  };

  const canSubmit = selected.length === REQUIRED_PICKS;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const ordered = [...selected].sort();
    const answer: CalendarAnswer = {
      selectedDates: ordered,
      relation: "seven-days-after",
      weekday: weekdayOf(ordered[0]),
    };
    onSubmit(answer);
  };

  return (
    <div className="select-stage">
      <CalendarGrid
        cells={grid.entries}
        maxRow={grid.maxRow}
        selectable
        selectedDates={selected}
        onToggle={toggle}
        ariaLabel="2026년 9월 첫째 주와 둘째 주 연습 달력"
      />
      <p className="stage-lead">
        보이는 칸 중에서 월요일 두 개를 찾아 눌러요. {REQUIRED_PICKS}개 중 {selected.length}개를
        골랐어요.
      </p>
      <ActionButton variant="primary" pulse disabled={!canSubmit} onClick={handleSubmit}>
        달력 칸 확인
      </ActionButton>
    </div>
  );
}
