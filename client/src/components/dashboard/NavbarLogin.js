import React, { useEffect, useState, useContext, useRef } from "react";

import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";
import API from "../../utils/API";
import ResetPasswordModal from "./ResetPasswordModal";

function NavbarLogin() {
  const [error, setError] = useState(null);
  const [resetInfo, setResetInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser, loading, setLoading } = useAuth();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      API.Login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }).then(({ data }) => {
        if (data.error) {
          return setError({ message: "Forgot Password? Reset Here" });
        } else {
          const { email, admin, firstName, lastName, _id, active } = data;
          console.log(data);
          if (data.message) {
            return setError({
              message: data.message,
            });
          }
          if (active === false) {
            return setError({
              message:
                "Account not active! Please speak to an admin to promptly reactive.",
            });
          } else {
            localStorage.setItem("email", email);
            localStorage.setItem("admin", admin);
            localStorage.setItem("name", firstName + " " + lastName);
            localStorage.setItem("_id", _id);
            setCurrentUser({
              email,
              name: firstName + " " + lastName,
              admin,
              _id,
            });
            return history.push("/members");
          }
        }
      });
    } catch (error) {
      setError({
        message:
          "No Account Found! Please Reach Out to an Admin To Get Registered.",
      });
    }
  };

  return (
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <form>
          <div class="form-group">
            <input
              type="email"
              ref={emailRef}
              class="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e) => {
                setResetInfo({ [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div class="form-group">
            <input
              ref={passwordRef}
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setResetInfo({ [e.target.name]: e.target.value });
              }}
            />
          </div>
          <>
            <button type="submit" class="btn btn-secondary" onClick={onSubmit}>
              <a style={{ color: "white" }}>Login</a>
            </button>
          </>
          <br />
          <br />
          <ResetPasswordModal
            open={open}
            setOpen={setOpen}
            resetInfo={resetInfo}
            setResetInfo={setResetInfo}
          />
          {error && (
            <>
              <a
                className="text-danger"
                onClick={() => setOpen(!open)}
                target="_blank"
              >
                {error.message}
              </a>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default NavbarLogin;
