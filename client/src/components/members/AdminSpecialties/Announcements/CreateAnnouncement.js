import React from "react";
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import "./styles.css";

function CreateAnnouncement({ open, setOpen }) {
  return (
    <>
      <CreateAnnouncementModal open={open} setOpen={setOpen} />
      <button
        type="button"
        class="btn btn-info btn-lg btn-block announcement-create-btn"
        onClick={() => setOpen(true)}
      >
        Create New Announcement
      </button>
    </>
  );
}

export default CreateAnnouncement;
