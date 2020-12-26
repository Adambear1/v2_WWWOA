import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AddEditDeleteUsersModal from "../components/members/AdminSpecialties/AddEditDeleteMember/AddEditDeleteUsersModal";
import Announcements from "../components/members/Announcements/Announcements";
import Jumbotron from "../components/members/Jumbotron/Jumbotron";
import MembersList from "../components/members/MembersList/MembersList";

import Navbar from "../components/members/Navbar";

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
      <Jumbotron name={currentUser && currentUser.name} />
      <div className="container">
        <AddEditDeleteUsersModal open={open} setOpen={setOpen} />
        <div className="row">
          <div className="col-12 col-sm-6">
            <Announcements />
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
