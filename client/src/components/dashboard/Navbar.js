import React from "react";
import { Link } from "react-scroll";

function Navbar() {
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
                className="link-to-site"
                activeClass="active"
                to=""
                spy={true}
                smooth={true}
                offset={50}
                duration={750}
              >
                Home
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link
                className="link-to-site"
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={50}
                duration={750}
              >
                About
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link
                className="link-to-site"
                activeClass="active"
                to="history"
                spy={true}
                smooth={true}
                offset={50}
                duration={750}
              >
                History
              </Link>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link">
              <Link
                className="link-to-site"
                activeClass="active"
                to="join"
                spy={true}
                smooth={true}
                offset={50}
                duration={750}
              >
                Join
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <Link
                className="link-to-site"
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={50}
                duration={750}
              >
                Contact
              </Link>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link link-to-site"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
