import React, { useState, useRef, useEffect } from "react";
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
  const [open, setOpen] = useState(false);
  const [toggleShow, setToggleShow] = useState(true);
  const [deleteCardAnimation, setDeleteCardAnimation] = useState("");

  const toggleAnimation = (e) => {
    try {
      if (toggleShow) {
        return setDeleteCardAnimation("smooth-transition-delete");
      } else {
        return setDeleteCardAnimation("smooth-transition-rescind");
      }
    } catch ({ message }) {
      console.log(message);
    }
  };
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
          try {
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
          } catch ({ message }) {
            console.log(message);
          }
        }}
        onMouseOut={(e) => {
          try {
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
          } catch ({ message }) {
            console.log(message);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <div
          class="card-horizontal"
          data-index={index}
          id={_id}
          onClick={(e) => readyDelete && setToggleShow(!toggleShow)}
          onMouseOver={(e) => readyDelete && toggleAnimation}
        >
          {toggleShow === true ? (
            <div class="card-body" data-index={index} id={_id}>
              <h4 class="card-title" data-index={index} id={_id}>
                {title}
              </h4>
              <p class="card-text" data-index={index} id={_id}>
                {_formatDate(date)}
              </p>
            </div>
          ) : (
            <div
              class={`card-body card-body-delete ${deleteCardAnimation}`}
              data-index={index}
              id={_id}
            >
              <i
                class="fa fa-trash fa-2x mt-2 mx-auto"
                aria-hidden="true"
                data-index={index}
                id={_id}
              ></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AnnouncementsListCard;
