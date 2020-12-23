import React, { useEffect, useState, useRef } from "react";
import API from "../../../utils/API";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";
import ModalNav from "./ModalNav";
import "./styles.css";

function AddEditDeleteUsersModal({ open, setOpen }) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const admin = useRef();
  const memberID = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    {
      switch (state) {
        case "Add":
          setLoading(true);
          try {
            if (
              firstName.current.value !== "" ||
              lastName.current.value !== "" ||
              email.current.value !== "" ||
              phoneNumber.current.value !== ""
            ) {
              API.AddMembers({
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                phoneNumber: phoneNumber.current.value,
                admin: admin.current.value,
                password: "password123",
              }).then(() => {
                firstName.current.value = "";
                lastName.current.value = "";
                email.current.value = "";
                phoneNumber.current.value = "";
                admin.current.value = "";
                setLoading(false);
              });
            } else {
              setLoading(false);
              setError("One or more fields is not filled out!");
            }
          } catch ({ message }) {
            setLoading(false);
            setError(message);
          }
          break;
        case "Edit":
          setLoading(true);
          console.log(memberID.current.id);
          try {
            if (
              firstName.current.value !== "" ||
              lastName.current.value !== "" ||
              email.current.value !== "" ||
              phoneNumber.current.value !== "" ||
              memberID.current.id !== ""
            ) {
              API.UpdateOneMember(memberID.current.id, {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                phoneNumber: phoneNumber.current.value,
                admin: admin.current.value,
              }).then(() => {
                setLoading(false);
              });
            } else {
              setLoading(false);
              setError("One or more fields is not filled out!");
            }
          } catch ({ message }) {
            setLoading(false);
            setError(message);
          }
          break;
        case "Delete":
          setLoading(true);
          try {
            if (memberID.current.id) {
              API.UpdateOneMember(memberID.current.id, { active: false }).then(
                () => {
                  memberID.current.id = "";
                  setLoading(false);
                }
              );
            }
            setLoading(false);
            setError("No Member Selected!");
          } catch ({ message }) {
            setLoading(false);
            setError(message);
          }
      }
    }
  };
  return (
    <>
      {open && (
        <div id="myModal" class="add-modal">
          <div class="add-modal-content justify-center">
            <button
              class="close"
              style={{ pointer: "cursor" }}
              onClick={(e) => setOpen(false)}
            >
              &times;
            </button>
            <ModalNav state={state} setState={setState} />
            <form onSubmit={onSubmit}>
              {state === "Add" && (
                <AddForm
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  phoneNumber={phoneNumber}
                  admin={admin}
                />
              )}
              {state === "Edit" && (
                <>
                  <EditForm
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    phoneNumber={phoneNumber}
                    admin={admin}
                    memberID={memberID}
                  />
                </>
              )}
              {state === "Delete" && (
                <>
                  <DeleteForm memberID={memberID} />
                </>
              )}
              <div className="btn-div">
                {state && loading && !error && (
                  <button class="btn btn-primary" type="button" disabled="true">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                )}
                {state && !loading && error && (
                  <button class="btn btn-danger " type="button" disabled="true">
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <i class="far fa-times-circle"></i>
                  </button>
                )}
                {state && !loading && !error && (
                  <button type="submit" className="btn btn-primary">
                    {state}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddEditDeleteUsersModal;
