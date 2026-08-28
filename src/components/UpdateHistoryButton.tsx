import { useState } from "react";
import ModalDialog from "./ModalDialog";
import { UPDATE_HISTORY } from "../update/updateHistory";

export default function UpdateHistoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="update-history-button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        업데이트 내역
      </button>
      <ModalDialog open={open} title="업데이트 내역" onClose={() => setOpen(false)}>
        <p className="update-history-intro">
          이 앱이 바뀐 기록이에요. 최신 날짜가 가장 위에 있어요.
        </p>
        <ol className="update-history-list">
          {UPDATE_HISTORY.map((entry) => (
            <li key={`${entry.date}-${entry.title}`}>
              <p className="update-history-entry-title">
                <strong>{entry.date}</strong> — {entry.title}
              </p>
              {entry.description ? <p className="update-history-entry-body">{entry.description}</p> : null}
            </li>
          ))}
        </ol>
      </ModalDialog>
    </>
  );
}
