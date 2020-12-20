import React, { useEffect, useState, useRef } from "react";
import API from "../../../utils/API";
import AddForm from "./AddForm";
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
  const onSubmit = (e) => {
    e.preventDefault();
    {
      if (state === "Add") {
        setLoading(true);
        try {
          if (
            firstName.current !== "" ||
            lastName.current !== "" ||
            email !== "" ||
            phoneNumber !== ""
          ) {
            API.AddMembers({
              firstName: firstName.current.value,
              lastName: lastName.current.value,
              email: email.current.value,
              phoneNumber: phoneNumber.current.value,
              admin: admin.current.value,
              password: "password123",
            }).then((data) => {
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
              {state === "Edit" && <>Edit</>}
              {state === "Delete" && <>Delete</>}
              {state && loading && !error && (
                <button class="btn btn-primary" type="button" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              )}
              {state && !loading && error && (
                <button class="btn btn-danger" type="button" disabled>
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddEditDeleteUsersModal;
