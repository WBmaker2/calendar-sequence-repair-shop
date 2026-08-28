import type { CSSProperties, KeyboardEvent } from "react";
import { formatKoreanDate } from "../../domain/calendarMath";
import type { DateKey } from "../../domain/types";
import { WEEKDAY_KO } from "./calendarCells";
import type { PositionedCalendarCell } from "./calendarCells";

const COLUMN_HEADERS = [
  { short: "일", full: "일요일" },
  { short: "월", full: "월요일" },
  { short: "화", full: "화요일" },
  { short: "수", full: "수요일" },
  { short: "목", full: "목요일" },
  { short: "금", full: "금요일" },
  { short: "토", full: "토요일" },
] as const;

interface CalendarGridProps {
  readonly cells: readonly PositionedCalendarCell[];
  readonly maxRow: number;
  readonly selectable: boolean;
  readonly selectedDates: readonly DateKey[];
  readonly onToggle?: (date: DateKey) => void;
  readonly anchorDate?: DateKey;
  readonly ariaLabel: string;
}

function cellPlacement(row: number, column: number): CSSProperties {
  return { "--cell-col": column + 1, "--cell-row": row + 2 } as CSSProperties;
}

export default function CalendarGrid({
  cells,
  maxRow,
  selectable,
  selectedDates,
  onToggle,
  anchorDate,
  ariaLabel,
}: CalendarGridProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, readonly [number, number]> = {
      ArrowRight: [0, 1],
      ArrowLeft: [0, -1],
      ArrowDown: [1, 0],
      ArrowUp: [-1, 0],
    };
    const move = moves[event.key];
    if (!move) return;
    const active = document.activeElement;
    if (!(active instanceof HTMLButtonElement)) return;
    const currentDate = active.dataset.cellDate;
    const current = cells.find((entry) => !entry.hidden && entry.cell.date === currentDate);
    if (!current) return;
    let row = current.row;
    let column = current.column;
    for (let step = 0; step < 56; step += 1) {
      row += move[0];
      column += move[1];
      if (row < 0 || row > maxRow || column < 0 || column > 6) return;
      const target = cells.find(
        (entry) => !entry.hidden && entry.row === row && entry.column === column,
      );
      if (target) {
        event.preventDefault();
        const button = event.currentTarget.querySelector<HTMLButtonElement>(
          `[data-cell-date="${target.cell.date}"]`,
        );
        button?.focus();
        return;
      }
    }
  };

  return (
    <div
      className="calendar-grid"
      role="grid"
      aria-label={ariaLabel}
      onKeyDown={selectable ? handleKeyDown : undefined}
    >
      <div role="row" className="calendar-header-row">
        {COLUMN_HEADERS.map((header, index) => (
          <div
            key={header.full}
            role="columnheader"
            className="calendar-head"
            style={cellPlacement(0, index)}
          >
            <span aria-hidden="true">{header.short}</span>
            <span className="visually-hidden">{header.full}</span>
          </div>
        ))}
      </div>

      {Array.from({ length: maxRow + 1 }, (_, rowIndex) => (
        <div key={rowIndex} role="row" className="calendar-row">
          {cells
            .filter((entry) => entry.row === rowIndex)
            .map((entry) => {
              const { cell, hidden, row, column } = entry;
              const isSelected = selectedDates.includes(cell.date);
              const isAnchor = anchorDate === cell.date;
              const placement = cellPlacement(row, column);

        if (hidden) {
          return (
            <div
              key={cell.date}
              className="calendar-cell is-missing"
              style={placement}
              aria-hidden="true"
            />
          );
        }

        if (!selectable || isAnchor) {
          return (
            <div
              key={cell.date}
              role="gridcell"
              className={[
                "calendar-cell",
                isAnchor ? "is-anchor" : "is-static",
              ].join(" ")}
              style={placement}
            >
              <div className="calendar-cell-face">
                {!cell.inCurrentMonth ? <span className="cell-chip">10월</span> : null}
                <span className="cell-day">{cell.day}</span>
                <span className="cell-weekday">{WEEKDAY_KO[cell.weekday]}</span>
                {isAnchor ? <span className="cell-badge">기준</span> : null}
              </div>
            </div>
          );
        }

        return (
          <div key={cell.date} role="gridcell" className="calendar-cell" style={placement}>
            <button
              type="button"
              className={isSelected ? "calendar-cell-button is-selected" : "calendar-cell-button"}
              data-cell-date={cell.date}
              aria-pressed={isSelected}
              aria-label={formatKoreanDate(cell.date)}
              onClick={() => onToggle?.(cell.date)}
            >
              {!cell.inCurrentMonth ? <span className="cell-chip">10월</span> : null}
              <span className="cell-day" aria-hidden="true">
                {cell.day}
              </span>
              <span className="cell-weekday" aria-hidden="true">
                {WEEKDAY_KO[cell.weekday]}
              </span>
              {isSelected ? (
                <span className="cell-badge" aria-hidden="true">
                  ✓ 선택됨
                </span>
              ) : null}
            </button>
          </div>
        );
            })}
        </div>
      ))}
    </div>
  );
}
