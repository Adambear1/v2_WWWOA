import React, { useEffect, useState, useRef } from "react";
import API from "../../../utils/API";
import AddForm from "./AddForm";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";
import ModalNav from "./ModalNav";
import "./styles.css";

function AddEditDeleteUsersModal({ open, setOpen }) {
  const [state, setState] = useState("Add");
  const [member, setMember] = useState(null);
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
                password: "password",
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
                setMember(null);
                setState("Edit");
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
              API.ToggleUserStatus(memberID.current.id).then(() => {
                setLoading(false);
              });
            }
            setLoading(false);
          } catch ({ message }) {
            setLoading(false);
            setError(message);
          }
          break;
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
            <ModalNav
              state={state}
              setState={setState}
              member={member}
              setMember={setMember}
              error={error}
              setError={setError}
            />
            <form onSubmit={onSubmit}>
              {state === "Add" && (
                <AddForm
                  state={state}
                  setState={setState}
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
                    state={state}
                    setState={setState}
                    member={member}
                    setMember={setMember}
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
                  <DeleteForm
                    state={state}
                    setState={setState}
                    memberID={memberID}
                    member={member}
                    setMember={setMember}
                  />
                </>
              )}
              <div className="btn-div">
                {state && loading && !error && (
                  <button class="btn btn-primary" type="button" disabled={true}>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                )}
                {state && !loading && error && (
                  <button
                    class="btn btn-danger btn-blocks"
                    type="button"
                    disabled={true}
                  >
                    <i class="far fa-times-circle"></i>
                  </button>
                )}
                {state && !loading && !error && (
                  <button type="submit" className="btn btn-primary">
                    {state === "Delete" &&
                      member &&
                      member.active === "true" &&
                      "Deactivate"}
                    {state === "Delete" &&
                      member &&
                      member.active === "false" &&
                      "Activate"}
                    {state === "Delete" && !member && "Select One..."}
                    {state !== "Delete" && state + " Member"}
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
