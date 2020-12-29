import React from "react";
import API from "../../../../utils/API";
import "./styles.css";
function DeleteAnnouncements({
  readyDelete,
  setReadyDelete,
  confirmDelete,
  setConfirmDelete,
}) {
  const archiveAnnouncement = (e) => {
    API.ArchiveAnnouncement(confirmDelete).then(() => {
      // window.location.reload();
    });
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-warning btn-lg btn-block announcement-delete-btn"
        onClick={() => {
          !confirmDelete
            ? setReadyDelete(!readyDelete)
            : archiveAnnouncement(confirmDelete);
        }}
      >
        {!confirmDelete ? (
          "Delete Announcement"
        ) : (
          <i class="fa fa-trash" aria-hidden="true"></i>
        )}
      </button>
    </div>
  );
}
export default DeleteAnnouncements;
