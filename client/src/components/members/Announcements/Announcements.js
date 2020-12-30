import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CreateAnnouncement from "../AdminSpecialties/Announcements/CreateAnnouncement";
import DeleteAnnouncements from "../AdminSpecialties/Announcements/DeleteAnnouncements";
import AnnouncementsList from "./AnnouncementsList";
function Announcements() {
  const { currentUser, setCurrentUser } = useAuth();
  const [open, setOpen] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [readyDelete, setReadyDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState([]);
  return (
    <div
      className={
        currentUser.admin === true || currentUser.admin === "true"
          ? "my-5 mx-3 announcements-container"
          : "my-5 mx-3 announcements-container-not-admin"
      }
    >
      <AnnouncementsList
        open={open}
        readyDelete={readyDelete}
        setReadyDelete={setReadyDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        deleted={deleted}
        setDeleted={setDeleted}
      />
      {currentUser.admin === true ||
        (currentUser.admin === "true" && (
          <>
            <CreateAnnouncement setOpen={setOpen} open={open} />
            <DeleteAnnouncements
              deleted={deleted}
              setDeleted={setDeleted}
              readyDelete={readyDelete}
              setReadyDelete={setReadyDelete}
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
            />
          </>
        ))}
    </div>
  );
}

export default Announcements;
