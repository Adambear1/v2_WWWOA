import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/members/Navbar";
import ProfileForm from "../components/members/Profile/ProfileForm";

import { useAuth } from "../context/AuthContext";

function MembersProfile() {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      let user = getUser();
      setCurrentUser(user);
    }
  }, []);
  const getUser = () => {
    let email = sessionStorage.getItem("email");
    let admin = sessionStorage.getItem("admin");
    return { email: email, admin: admin };
  };
  return (
    <div>
      <Navbar open={open} setOpen={setOpen} />
      <ProfileForm />
      <Footer />
    </div>
  );
}

export default MembersProfile;
