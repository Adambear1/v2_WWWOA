import React, { useEffect, useState } from "react";
import profilepicture from "../../../assets/profilepicture.jpg";
import MemberCardModel from "./MemberCardModel";
//
import "./styles.css";

function MemberCard({ firstName, lastName, email, picture, phoneNumber, _id }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MemberCardModel open={open} setOpen={setOpen} _id={_id} />
      <div
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          setOpen(true);
        }}
      >
        <div class="card member-card" id={_id}>
          <div class="card-horizontal" id={_id}>
            <div class="img-square-wrapper" id={_id}>
              <img
                className="member-photo"
                src={picture ? picture : profilepicture}
                alt="Card image cap"
                id={_id}
              />
            </div>
            <div class="card-body" id={_id}>
              <h4 class="card-title" id={_id}>
                {firstName + " " + lastName}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemberCard;
