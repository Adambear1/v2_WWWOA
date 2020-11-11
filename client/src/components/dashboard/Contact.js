import React from "react";

function Contact() {
  return (
    <>
      <div
        class="card contact-card animate__animated animate__fadeIn"
        id="contact"
      >
        <h2 class="my-3">Contact</h2>
        <div class="card-body">
          <ul id="menu-ul">
            <li id="menu-li">
              <i class="fas fa-phone"></i>
              <a href="tel:2535555555" id="menu-li-a">
                (253)-555-5555
              </a>
            </li>
            <li id="menu-li">
              <i class="fas fa-map-marker-alt"></i>
              <a id="menu-li-a">PO Box 55, Tacoma, WA 98401</a>
            </li>
            <li id="menu-li">
              <i class="fas fa-envelope-open-text"></i>
              <a href="mailto:example@mail.com" id="menu-li-a">
                example@mail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Contact;
