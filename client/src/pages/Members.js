import React from "react";
import Footer from "../components/Footer";
import MembersList from "../components/members/MembersList";
import Chatroom from "../components/members/Chatroom";
import Navbar from "../components/members/Navbar";

function Members() {
  return (
    <>
      <Navbar />
      <div className="container">
        <MembersList />
        <Chatroom />
      </div>
      <Footer />
    </>
  );
}

export default Members;
