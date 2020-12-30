import React, { useState, useMemo } from "react";
import API from "../../../utils/API";
import "./styles.css";
function SpecModal({ open, setOpen, date, time }) {
  const [error, setError] = useState(false);

  return (
    <>
      {open && (
        <div id="myModal" className="meetings-modal">
          <div class="meetings-modal-content">
            <span
              onClick={() => {
                setOpen(false);
              }}
              className="close"
            >
              &times;
            </span>
            <>{date}</>
            <>{time}</>
          </div>
        </div>
      )}
    </>
  );
}

export default SpecModal;
