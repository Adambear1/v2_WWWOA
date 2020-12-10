import React, { useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-scroll";
import { Link as HistoryLink, useHistory } from "react-router-dom";
const socket = process.env.NODE_ENV === "production" ? io.connect("https://wwwoa-297919.wm.r.appspot.com:4000") : io.connect("http://localhost:4000");

function Navbar() {
  const { logout } = useAuth();
  const history = useHistory();
  const { currentUser } = useAuth();
  const joinChat = () => {
    socket.emit("joinRoom", { username: currentUser.email });
  };
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
              <Link
                activeClass="active"
                to=""
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
              >
                Home
              </Link>
              <Link
                activeClass="active"
                to="members"
                spy={true}
                smooth={true}
                offset={50}
                duration={500}
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
              >
                Meetings
              </Link>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link">
              <li
                data-toggle="modal"
                data-target="#chatModal"
                onClick={joinChat}
              >
                Chat Room
              </li>
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
              >
                Rule Changes
              </Link>
            </a>
          </li>
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
