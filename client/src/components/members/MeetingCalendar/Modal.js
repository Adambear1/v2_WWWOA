import React, { useState, useMemo } from "react";
import API from "../../../utils/API";
import "./styles.css";
function Modal({ open, setOpen, date, currentUser }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  useMemo(() => {
    if (startTime && endTime) {
      if (startTime >= endTime) {
        return setError(true);
      } else {
        return setError(false);
      }
    }
  }, [startTime, endTime]);
  const onSubmit = (e) => {
    e.preventDefault();
    API.PostMeetings({
      location,
      date,
      startTime,
      endTime,
      name: currentUser.name,
    }).then(() => {
      setOpen(false);
    });
  };
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
            <div class="form-group row mt-5">
              <label for="example-time-input" class="col-2 col-form-label">
                Location
              </label>
              <div class="col-10">
                <input
                  className="form-control"
                  type="text"
                  id="location"
                  name="location"
                  onChange={(e) => setLocation(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="example-time-input" class="col-2 col-form-label">
                Start
              </label>
              <div class="col-10">
                <input
                  className={error ? "form-control error" : "form-control"}
                  type="time"
                  id="startTime"
                  name="startTime"
                  onChange={(e) => setStartTime(e.target.value)}
                  min="09:00"
                  max="20:00"
                  required={true}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="example-time-input" class="col-2 col-form-label">
                End
              </label>
              <div class="col-10">
                <input
                  className={error ? "form-control error" : "form-control"}
                  type="time"
                  id="endTime"
                  name="endTime"
                  onChange={(e) => setEndTime(e.target.value)}
                  min="09:00"
                  max="20:00"
                  required={true}
                />
              </div>
            </div>

            <button
              type="btn"
              className="btn btn-success"
              onClick={(e) => onSubmit(e)}
              disabled={error ? true : false}
              style={error ? { cursor: "not-allowed" } : { cursor: "pointer" }}
            >
              Confirm Meeting
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
