import React, { useEffect, useState, useContext, useRef } from "react";

import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";
import API from "../../utils/API";

function NavbarLogin() {
  const [error, setError] = useState(null);
  const { setErr, err, loading, setLoading } = useAuth();
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      API.Login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }).then(({ data }) => {
        console.log(data);
      });
    } catch ({ message }) {
      console.log(message);
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
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <input
              ref={passwordRef}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <>
            <button type="submit" class="btn btn-secondary" onClick={onSubmit}>
              <a href="/members" style={{ color: "white" }}>
                Login
              </a>
            </button>
            {error && (
              <a href="/resetAccount" target="_blank">
                Forgot Password? Reset Here
              </a>
            )}
          </>
        </form>
      </div>
    </div>
  );
}

export default NavbarLogin;
