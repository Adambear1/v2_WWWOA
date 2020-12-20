import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import profilepicture from "../../../assets/profilepicture.jpg";
import "./styles.css";
function MemberCardModel({ open, setOpen, _id }) {
  const [userData, setUserData] = useState(false);
  useEffect(() => {
    try {
      API.GetOneMember(_id).then(({ data }) => {
        setUserData(data);
      });
    } catch (error) {
      throw error;
    }
  }, [open]);
  return (
    <>
      {open && (
        <div id="myModal" class="member-card-modal">
          <div
            class={
              userData.admin
                ? "member-card-modal-content-admin justify-center"
                : "member-card-modal-content justify-center"
            }
            key={_id}
          >
            <button
              class="close"
              style={{ pointer: "cursor" }}
              onClick={(e) => setOpen(false)}
            >
              &times;
            </button>
            <div className="member-card-modal-image">
              <img src={userData.picture ? userData.picture : profilepicture} />
            </div>
            <div className="member-card-modal-name">
              <h3>{userData.firstName + " " + userData.lastName}</h3>
              <a href={`mailto:${userData.email}`} target="_blank">
                <h3>{userData.email}</h3>
              </a>
              <a href={`tel:${userData.phoneNumber}`} target="_blank">
                <h4>{userData.phoneNumber}</h4>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberCardModel;
