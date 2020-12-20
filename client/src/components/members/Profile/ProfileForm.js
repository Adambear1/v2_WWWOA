import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import profilepicture from "../../../assets/profilepicture.jpg";
import API from "../../../utils/API";
import GetUser from "../../../utils/GetUser";

function ProfileForm({ currentUser, setCurrentUser }) {
  const [show, setShow] = useState(false);
  const [newPass, setNewPass] = useState(null);
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const password = useRef();

  useEffect(() => {
    GetUser().then((data) => {
      setCurrentUser(data);
      FillForm(data);
    });
  }, []);
  const FillForm = ({ _id }) => {
    API.GetOneMember(_id).then(({ data }) => {
      firstName.current.value = data.firstName;
      lastName.current.value = data.lastName;
      email.current.value = data.email;
      phoneNumber.current.value = data.phoneNumber;
      password.current.value = data.password;
      if (data.picture) {
        setPicture(data.picture);
      } else {
        setPicture(profilepicture);
      }
    });
    // renderPic(picture);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.UpdateOneMember(currentUser._id, {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        phoneNumber: phoneNumber.current.value,
        password: newPass ? newPass : password.current.value,
        picture,
      });
      setLoading(false);
      setSuccess("Successfully Updated!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch ({ message }) {
      setLoading(false);
      setError(message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  const renderPic = (picture) => {
    var reader = new FileReader();

    reader.onloadend = function () {
      setPicture(reader.result);
    };

    if (picture) {
      reader.readAsDataURL(picture);
    } else {
      // setNewPic(profilepicture);
    }
  };

  return (
    <>
      <form
        className="mt-5 mb-5 text-center"
        onSubmit={onSubmit}
        enctype="multipart/form-data"
      >
        <div className="container text-center">
          <div className="row">
            <div className="col-12">
              <div id="profile-form-image-container">
                <img src={picture} id="profile-form-image"></img>
                <div id="profile-form-image-add">
                  <input
                    type="file"
                    id="uploaded-picture"
                    className="btn btn-primary"
                    onChange={(e) => {
                      renderPic(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
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
            <div className="col-12 col-sm-6 ">
              <label for="password">Password</label>
              <div class="input-group mb-3">
                <input
                  disabled="true"
                  type={show || newPass ? "text" : "password"}
                  class="form-control"
                  ref={password}
                  value={newPass && newPass}
                />
                <div class="input-group-append" onClick={() => setShow(!show)}>
                  <span class="input-group-text" id="basic-addon2">
                    {show ? (
                      <i class="fas fa-eye"></i>
                    ) : (
                      <i class="fas fa-eye-slash"></i>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <label for="newPassword">New Password</label>
              <input
                type="text"
                class="form-control"
                id="newPassword"
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {!loading && !error && !success && (
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
        )}
        {!loading && !error && success && (
          <>
            <button type="submit" className="btn btn-success mt-3">
              <i class="fas fa-check"></i>
            </button>
            <br />
            <small className="text-success">{success}</small>
          </>
        )}
        {!loading && error && !success && (
          <>
            <button type="submit" className="btn btn-danger mt-3">
              <i class="far fa-times-circle"></i>
            </button>
            <br />
            <small className="text-danger">{error}</small>
          </>
        )}
        {loading && !error && !success && (
          <button class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        )}
      </form>
    </>
  );
}

export default ProfileForm;
