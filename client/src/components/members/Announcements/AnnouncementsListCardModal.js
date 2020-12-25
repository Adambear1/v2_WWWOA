import React from "react";
import "./styles.css";
function AnnouncementsListCardModal({
  name,
  date,
  title,
  message,
  open,
  setOpen,
}) {
  return (
    <>
      {open && (
        <div id="myModal" class="announcements-modal">
          <div class="announcements-modal-content">
            <span
              class="close"
              onClick={(e) => {
                setOpen(false);
              }}
            >
              &times;
            </span>
            <p>{title}</p>
            <p>{message}</p>
            <p>{name}</p>
            <p>{date}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default AnnouncementsListCardModal;
