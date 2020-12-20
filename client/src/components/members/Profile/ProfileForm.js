import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import profilepicture from "../../../assets/profilepicture.jpg";
import API from "../../../utils/API";
import GetUser from "../../../utils/GetUser";

function ProfileForm({ currentUser, setCurrentUser }) {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const picture = useRef();
  const password = useRef();
  const newPassword = useRef();
  useEffect(() => {
    console.log(currentUser);
    try {
      if (currentUser) {
        FillForm(currentUser);
      } else {
        let user = Promise.resolve(GetUser());
        return Promise.resolve(setCurrentUser(user));
      }
    } catch (error) {
      throw error;
    }
  }, [currentUser]);
  const FillForm = ({ _id }) => {
    API.GetOneMember(_id).then(({ data }) => {
      firstName.current.value = data.firstName;
      lastName.current.value = data.lastName;
      email.current.value = data.email;
      phoneNumber.current.value = data.phoneNumber;
      password.current.value = data.password;
      if (data.picture) {
        picture.current.src = data.picture && data.picture;
      }
    });
  };
  return (
    <>
      <form>
        <div className="container text-center">
          <div className="row">
            <div className="col-12">
              <img
                src={profilepicture}
                ref={picture}
                id="profile-form-image"
              ></img>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label for="exampleFormControlInput1">First Name</label>
              <input
                type="text"
                class="form-control"
                id="firstName"
                ref={firstName}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label for="exampleFormControlInput1">Last Name</label>
              <input
                type="text"
                class="form-control"
                id="lastName"
                ref={lastName}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-sm-6">
              <label for="exampleFormControlInput1">Email</label>
              <input type="email" class="form-control" id="email" ref={email} />
            </div>
            <div className="col-12 col-sm-6">
              <label for="exampleFormControlInput1">Phone Number</label>
              <input
                type="text"
                class="form-control"
                id="phoneNumber"
                ref={phoneNumber}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label for="exampleFormControlInput1">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                ref={password}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label for="exampleFormControlInput1">New Password</label>
              <input
                type="text"
                class="form-control"
                id="newPassword"
                ref={newPassword}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
