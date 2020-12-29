import React from "react";
import API from "../../../../utils/API";
import DeleteDuplicates from "../../../../utils/DeleteDuplicates";
import "./styles.css";
function DeleteAnnouncements({
  readyDelete,
  setReadyDelete,
  confirmDelete,
  setConfirmDelete,
  setDeleted,
  deleted,
}) {
  const archiveAnnouncement = (e) => {
    let filteredDelete = DeleteDuplicates(confirmDelete);
    API.ArchiveAnnouncement(filteredDelete).then(() => {
      setDeleted(true);
      setConfirmDelete([]);
      setReadyDelete(false);
    });
    setDeleted(false);
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-warning btn-lg btn-block announcement-delete-btn"
        onClick={() => {
          confirmDelete.length === 0
            ? setReadyDelete(!readyDelete)
            : archiveAnnouncement(confirmDelete);
        }}
      >
        {confirmDelete.length === 0 ? (
          "Delete Announcement"
        ) : (
          <i class="fa fa-trash" aria-hidden="true"></i>
        )}
      </button>
    </div>
  );
}
export default DeleteAnnouncements;
