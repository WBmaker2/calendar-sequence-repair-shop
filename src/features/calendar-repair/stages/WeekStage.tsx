import { useState } from "react";
import ActionButton from "../../../components/ActionButton";
import { weekdayOf } from "../../../domain/calendarMath";
import type { CalendarAnswer, CalendarMission, DateKey } from "../../../domain/types";
import CalendarGrid from "../CalendarGrid";
import { buildMissionGrid, shortDateLabel } from "../calendarCells";

interface WeekStageProps {
  readonly mission: CalendarMission;
  readonly onSubmit: (answer: CalendarAnswer) => void;
}

const EVENT_DISPLAY_ORDER = ["체육 행사", "도서관 행사", "화단 행사"] as const;

const EVENTS: readonly { readonly label: string; readonly date: DateKey }[] = [
  { label: "도서관 행사", date: "2026-09-05" },
  { label: "화단 행사", date: "2026-09-12" },
  { label: "체육 행사", date: "2026-09-21" },
];

export default function WeekStage({ mission, onSubmit }: WeekStageProps) {
  if (mission.id === "calendar-after-seven-04") {
    return <AfterSevenStage mission={mission} onSubmit={onSubmit} />;
  }
  return <EventOrderStage onSubmit={onSubmit} />;
}

function AfterSevenStage({ mission, onSubmit }: WeekStageProps) {
  const [selected, setSelected] = useState<readonly DateKey[]>([]);
  const grid = buildMissionGrid(mission);

  const toggle = (date: DateKey) => {
    setSelected((current) => (current.includes(date) ? [] : [date]));
  };

  const canSubmit = selected.length === 1;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const answer: CalendarAnswer = {
      selectedDates: [selected[0]],
      relation: "seven-days-after",
      weekday: weekdayOf(selected[0]),
    };
    onSubmit(answer);
  };

  return (
    <div className="week-stage">
      <CalendarGrid
        cells={grid.entries}
        maxRow={grid.maxRow}
        selectable
        selectedDates={selected}
        onToggle={toggle}
        anchorDate={mission.anchorDate}
        ariaLabel="2026년 9월 둘째 주 연습 달력"
      />
      <p className="stage-lead">
        기준 칸({shortDateLabel(mission.anchorDate)})보다 일주일 뒤인 칸을 찾아 눌러요.
      </p>
      <ActionButton variant="primary" pulse disabled={!canSubmit} onClick={handleSubmit}>
        관계 완성
      </ActionButton>
    </div>
  );
}

function EventOrderStage({ onSubmit }: { readonly onSubmit: (answer: CalendarAnswer) => void }) {
  const [order, setOrder] = useState<readonly DateKey[]>([]);

  const append = (date: DateKey) => {
    setOrder((current) => (current.includes(date) ? current : [...current, date]));
  };

  const displayCards = EVENT_DISPLAY_ORDER.map(
    (label) => EVENTS.find((event) => event.label === label),
  ).filter((event): event is { readonly label: string; readonly date: DateKey } => event !== undefined);

  const canSubmit = order.length === EVENTS.length;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const answer: CalendarAnswer = {
      selectedDates: [...order],
      relation: "chronological-order",
    };
    onSubmit(answer);
  };

  return (
    <div className="event-order-stage">
      <p className="stage-lead">
        도서관·화단·체육 행사를 날짜가 가장 빠른 순서부터 차례대로 눌러요.
      </p>
      <div className="event-cards" role="group" aria-label="행사 날짜 순서 배열">
        {displayCards.map((event) => {
          const orderIndex = order.indexOf(event.date);
          return (
            <button
              key={event.date}
              type="button"
              className={orderIndex >= 0 ? "event-card is-chosen" : "event-card"}
              aria-label={`${event.label} ${shortDateLabel(event.date)}`}
              aria-disabled={orderIndex >= 0}
              disabled={orderIndex >= 0}
              onClick={() => append(event.date)}
            >
              <span className="event-card-label">{event.label}</span>
              <span className="event-card-date">{shortDateLabel(event.date)}</span>
              {orderIndex >= 0 ? (
                <span className="cell-badge" aria-hidden="true">
                  {orderIndex + 1}번째
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {order.length > 0 ? (
        <ol className="event-order-list" aria-label="고른 순서">
          {order.map((date) => {
            const event = EVENTS.find((candidate) => candidate.date === date);
            return (
              <li key={date}>
                {event ? `${event.label} ${shortDateLabel(date)}` : shortDateLabel(date)}
              </li>
            );
          })}
        </ol>
      ) : null}

      <div className="stage-actions">
        <ActionButton variant="secondary" disabled={order.length === 0} onClick={() => setOrder([])}>
          순서 지우기
        </ActionButton>
        <ActionButton variant="primary" pulse disabled={!canSubmit} onClick={handleSubmit}>
          관계 완성
        </ActionButton>
      </div>
    </div>
  );
}
