import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AddEditDeleteUsersModal from "../components/members/AdminSpecialties/AddEditDeleteUsersModal";
import MembersList from "../components/members/MembersList/MembersList";

import Navbar from "../components/members/Navbar";
import UpdatesBoard from "../components/members/Updates/UpdatesBoard";

import { useAuth } from "../context/AuthContext";
import GetUser from "../utils/GetUser";

function Members() {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
      setCurrentUser(GetUser());
    }
  }, []);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <div className="container">
        <AddEditDeleteUsersModal open={open} setOpen={setOpen} />
        <div className="row">
          <div className="col-12 col-sm-6">
            <UpdatesBoard />
          </div>
          <div className="col-12 col-sm-6">
            <MembersList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Members;
