import React from "react";
import Footer from "../components/Footer";
import MembersList from "../components/members/MembersList";

import Navbar from "../components/members/Navbar";
import UpdatesBoard from "../components/members/UpdatesBoard";

function Members() {
  return (
    <>
      <Navbar />
      <div className="container">
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
