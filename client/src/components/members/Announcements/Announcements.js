import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CreateAnnouncement from "../AdminSpecialties/Announcements/CreateAnnouncement";
import DeleteAnnouncements from "../AdminSpecialties/Announcements/DeleteAnnouncements";
import AnnouncementsList from "./AnnouncementsList";
function Announcements() {
  const { currentUser, setCurrentUser } = useAuth();
  const [open, setOpen] = useState(null);
  const [readyDelete, setReadyDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  return (
    <div className="my-5 mx-3 announcements-container">
      <AnnouncementsList
        open={open}
        readyDelete={readyDelete}
        setReadyDelete={setReadyDelete}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
      />
      {currentUser.admin === true && (
        <>
          <CreateAnnouncement setOpen={setOpen} open={open} />
          <DeleteAnnouncements
            readyDelete={readyDelete}
            setReadyDelete={setReadyDelete}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
          />
        </>
      )}
    </div>
  );
}

export default Announcements;
