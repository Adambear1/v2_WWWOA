import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-scroll";
import { Link as HistoryLink, useHistory } from "react-router-dom";

function Navbar({ open, setOpen }) {
  const { currentUser, setCurrentUser } = useAuth();
  const { logout } = useAuth();

  const history = useHistory();
  const onLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      history.push("/");
      window.location.reload();
    } catch (error) {}
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link">
              <HistoryLink
                activeClass="active"
                style={{ cursor: "pointer" }}
                to="/members"
              >
                Home
              </HistoryLink>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link
                activeClass="active"
                to="members"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                style={{ cursor: "pointer" }}
              >
                Members
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                style={{ cursor: "pointer" }}
              >
                Meetings
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
                style={{ cursor: "pointer" }}
              >
                Rule Changes
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <HistoryLink
                activeClass="active"
                style={{ cursor: "pointer" }}
                to="/members/profile"
              >
                Profile
              </HistoryLink>
            </a>
          </li>
          {currentUser && currentUser.admin && (
            <>
              <li
                class="nav-item"
                style={{ cursor: "pointer" }}
                onClick={(e) => setOpen(true)}
              >
                <a class="nav-link">Edit Members</a>
              </li>
            </>
          )}

          <li class="nav-item">
            <a
              onClick={onLogout}
              class="nav-link "
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
            >
              <HistoryLink to="/">Logout</HistoryLink>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
