import React from "react";
import "./styles.css";
import { _formatDate } from "../../../utils/Formatting";
function AnnouncementsListCardModal({
  name,
  date,
  title,
  message,
  setOpen,
  open,
}) {
  return (
    <>
      {open && (
        <div id="myModal" class="announcements-modal">
          <div class="announcements-modal-content">
            <span
              onClick={() => {
                setOpen(false);
              }}
              class="close"
            >
              &times;
            </span>
            <h1>{title}</h1>
            <h6>{message}</h6>
            <p>{name}</p>
            <p>{_formatDate(date)}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default AnnouncementsListCardModal;
