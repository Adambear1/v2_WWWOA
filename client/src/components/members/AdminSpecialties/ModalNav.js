import React from "react";

function ModalNav({ state, setState }) {
  return (
    <nav>
      <ul id="add-modal-ul">
        <li id="add-modal-li">
          <button
            className="btn btn-light mx-3"
            onClick={() => setState("Add")}
          >
            {" "}
            Add
          </button>
        </li>
        <li id="add-modal-li">
          <button
            className="btn btn-light mx-3"
            onClick={() => setState("Edit")}
          >
            {" "}
            Edit
          </button>
        </li>
        <li id="add-modal-li">
          <button
            className="btn btn-light mx-3"
            onClick={() => setState("Delete")}
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
