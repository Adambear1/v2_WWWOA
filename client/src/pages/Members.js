import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import AddEditDeleteUsersModal from "../components/members/AdminSpecialties/AddEditDeleteMember/AddEditDeleteUsersModal";
import Announcements from "../components/members/Announcements/Announcements";
import Jumbotron from "../components/members/Jumbotron/Jumbotron";
import Calendar from "../components/members/MeetingCalendar/Calendar";
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
            <h1 className="mt-5" style={{ color: "white" }} id="announcements">
              Announcements
            </h1>
            <Announcements />
          </div>
          <div className="col-12 col-sm-6">
            <h1 className="mt-5" style={{ color: "white" }} id="members">
              Members List
            </h1>
            <MembersList />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1 className="mt-5" style={{ color: "white" }} id="meetings">
              Meeting Calendar
            </h1>
            <Calendar />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Members;
