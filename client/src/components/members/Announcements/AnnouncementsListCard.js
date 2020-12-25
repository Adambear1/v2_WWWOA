import React, { useState } from "react";
import { _formatDate } from "../../../utils/Formatting";
import AnnouncementsListCardModal from "./AnnouncementsListCardModal";
import "./styles.css";

function AnnouncementsListCard({ title, date, name, message, _id, index }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <AnnouncementsListCardModal
        open={open}
        setOpen={setOpen}
        title={title}
        date={date}
        name={name}
        message={message}
      />
      <div
        data-index={index}
        class="card announcement-card"
        id={_id}
        onClick={() => {
          setOpen(true);
        }}
        onMouseOver={(e) => {
          document
            .querySelectorAll(".announcement-card")
            [e.target.dataset.index].classList.add("announcements-card-hover");
        }}
        onMouseOut={(e) => {
          document
            .querySelectorAll(".announcement-card")
            [e.target.dataset.index].classList.remove(
              "announcements-card-hover"
            );
        }}
        style={{ cursor: "pointer" }}
      >
        <div class="card-horizontal" data-index={index}>
          <div class="card-body" data-index={index}>
            <h4 class="card-title" data-index={index}>
              {title}
            </h4>
            <p class="card-text" data-index={index}>
              {_formatDate(date)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnnouncementsListCard;
