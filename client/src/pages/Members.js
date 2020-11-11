import React from "react";
import Footer from "../components/Footer";
import Chatroom from "../components/members/Chatroom";
import Navbar from "../components/members/Navbar";

function Members() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Chatroom />
      </div>
      <Footer />
    </>
  );
}

export default Members;
