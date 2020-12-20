import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/members/Navbar";
import ProfileForm from "../components/members/Profile/ProfileForm";

import { useAuth } from "../context/AuthContext";
import GetUser from "../utils/GetUser";

function MembersProfile() {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(GetUser());
    }
  }, []);

  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <ProfileForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Footer />
    </div>
  );
}

export default MembersProfile;
