import React, { useState } from "react";

function ModalNav({ state, setState, member, setMember, error, setError }) {
  return (
    <nav>
      <ul id="add-modal-ul">
        <li id="add-modal-li">
          <button
            className="btn btn-light mx-3"
            onClick={() => {
              setError(null);
              setMember(null);
              setState("Add");
            }}
          >
            {" "}
            Add
          </button>
        </li>
        <li id="add-modal-li">
          <button
            className="btn btn-light mx-3"
            onClick={() => {
              setError(null);
              setMember(null);
              setState("Edit");
            }}
          >
            {" "}
            Edit
          </button>
        </li>
        <li id="add-modal-li">
          <button
            className="btn btn-light mx-3"
            onClick={() => {
              setError(null);
              setMember(null);
              setState("Delete");
            }}
          >
            {" "}
            Delete
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default ModalNav;
