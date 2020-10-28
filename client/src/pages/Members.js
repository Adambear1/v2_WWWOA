import React from "react";
import Chatroom from "../components/members/Chatroom";
import InteractionToggle from "../components/members/InteractionToggle";
import Navbar from "../components/members/Navbar";
import Zoom from "../components/members/Zoom";

function Members() {
  return (
    <>
      <Navbar />
      <div className="container">
        <InteractionToggle />
        <Chatroom />
        <Zoom />
      </div>
    </>
  );
}

export default Members;
