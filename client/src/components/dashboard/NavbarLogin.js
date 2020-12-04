import React, { useEffect, useState, useContext, useRef } from "react";

import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "./styles.css"

function NavbarLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Failed to Login.");
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
          <button type="submit" class="btn btn-secondary btn-currently-disabled"  onClick={onSubmit} disabled="true">
            {/* <Link to="/members" style={{color: "white"}}>Login</Link> */}Login
          </button>
        
        </form>
      </div>
    </div>
  );
}

export default NavbarLogin;
