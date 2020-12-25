import React, { useState } from "react";
import AnnouncementsListCardModal from "./AnnouncementsListCardModal";
import "./styles.css";

function AnnouncementsListCard({ title, date, name, message, _id }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      class="card"
      id={_id}
      onClick={(e) => {
        setOpen(true);
      }}
    >
      <AnnouncementsListCardModal
        open={open}
        setOpen={setOpen}
        title={title}
        date={date}
        name={name}
        message={message}
      />
      <div class="card-horizontal">
        <div class="card-body">
          <h4 class="card-title">{title}</h4>
          <p class="card-text">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsListCard;
