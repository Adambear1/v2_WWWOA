import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import CreateAnnouncement from "../AdminSpecialties/Announcements/CreateAnnouncement";
import AnnouncementsList from "./AnnouncementsList";
function Announcements() {
  const { currentUser, setCurrentUser } = useAuth();
  const [open, setOpen] = useState(null);
  return (
    <div className="my-5 mx-3 announcements-container">
      <AnnouncementsList />
      {currentUser.admin === true && (
        <CreateAnnouncement setOpen={setOpen} open={open} />
      )}
    </div>
  );
}

export default Announcements;
