import React, { useEffect, useState, useContext, useRef } from "react";

import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

function NavbarLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, setError, error, loading, setLoading } = useAuth();
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      let { status } = await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (status) {
        history.push("/members");
      } else {
        history.push("/");
      }
    } catch ({ message }) {
      setError({ message });
    }
    setLoading(false);
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
          {process.env.NODE_ENV === "production" ? (
            <button
              type="submit"
              class="btn btn-secondary btn-currently-disabled"
              onClick={onSubmit}
              disabled="true"
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
              class="btn btn-secondary btn-currently-disabled"
              onClick={onSubmit}
            >
              <Link style={{ color: "white" }}>Login</Link>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default NavbarLogin;
