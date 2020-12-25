import React, { useState } from "react";
import { _formatDate } from "../../../utils/Formatting";
import AnnouncementsListCardModal from "./AnnouncementsListCardModal";
import "./styles.css";

function AnnouncementsListCard({
  title,
  date,
  name,
  message,
  _id,
  index,
  readyDelete,
  setReadyDelete,
  confirmDelete,
  setConfirmDelete,
}) {
  const [open, setOpen] = useState(null);

  return (
    <>
      {!readyDelete && (
        <AnnouncementsListCardModal
          open={open}
          setOpen={setOpen}
          title={title}
          date={date}
          name={name}
          message={message}
        />
      )}
      <div
        data-index={index}
        class={
          !readyDelete
            ? "card announcement-card"
            : "card announcement-card announcement-ready-delete"
        }
        id={_id}
        onClick={(e) => {
          {
            !readyDelete
              ? setOpen(true)
              : document
                  .querySelectorAll(".announcement-card")
                  [e.target.dataset.index].classList.add(
                    "announcements-card-hover-delete"
                  );
            setConfirmDelete(
              confirmDelete === e.target.id ? null : e.target.id
            );
          }
        }}
        onMouseOver={(e) => {
          !readyDelete
            ? document
                .querySelectorAll(".announcement-card")
                [e.target.dataset.index].classList.add(
                  "announcements-card-hover"
                )
            : document
                .querySelectorAll(".announcement-card")
                [e.target.dataset.index].classList.add(
                  "announcements-card-hover-delete"
                );
        }}
        onMouseOut={(e) => {
          !readyDelete
            ? document
                .querySelectorAll(".announcement-card")
                [e.target.dataset.index].classList.remove(
                  "announcements-card-hover"
                )
            : document
                .querySelectorAll(".announcement-card")
                [e.target.dataset.index].classList.remove(
                  "announcements-card-hover-delete"
                );
        }}
        style={{ cursor: "pointer" }}
      >
        <div class="card-horizontal" data-index={index} id={_id}>
          <div class="card-body" data-index={index} id={_id}>
            <h4 class="card-title" data-index={index} id={_id}>
              {title}
            </h4>
            <p class="card-text" data-index={index} id={_id}>
              {_formatDate(date)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnnouncementsListCard;
