import React, { useState } from "react";
import API from "../../../../utils/API";
import "./styles.css";
import { useAuth } from "../../../../context/AuthContext";
function CreateAnnouncementModal({ open, setOpen }) {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      API.PostAnnouncements({
        title: message.title,
        message: message.message,
        name: currentUser.name,
      }).then(() => {
        setMessage({ message: "", title: "" });
        setLoading(false);
        setMessage(null);
      });
    } catch ({ message }) {
      setLoading(false);
      setError(message);
    }
  };
  return (
    <div>
      {open && (
        <div id="myModal" className="announcements-modal">
          <div className="announcements-modal-content">
            <span className="close" onClick={() => setOpen(false)}>
              &times;
            </span>
            <div classNameName="container px-5">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label for="exampleFormControlInput1">
                    Announcement Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={message && message.title}
                    onChange={(e) =>
                      setMessage({
                        ...message,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label for="message">Announcement Message</label>
                  <textarea
                    name="message"
                    value={message && message.message}
                    onChange={(e) =>
                      setMessage({
                        ...message,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="form-control"
                    id="message"
                    rows="5"
                  ></textarea>
                </div>
                <div className="btn-div">
                  {loading && !error && (
                    <button
                      class="btn btn-primary"
                      type="button"
                      disabled={true}
                    >
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button>
                  )}
                  {!loading && error && (
                    <>
                      <button
                        class="btn btn-danger btn-blocks"
                        type="button"
                        disabled={true}
                      >
                        <i class="far fa-times-circle"></i>
                      </button>
                      <br />
                      <small class="text-danger">{error}</small>
                    </>
                  )}
                  {!loading && !error && (
                    <button
                      type="submit"
                      className={
                        message && message.title && message.message
                          ? "btn btn-primary"
                          : "btn btn-primary btn-locked"
                      }
                      disabled={
                        message && message.title && message.message
                          ? false
                          : true
                      }
                    >
                      {message && message.title && message.message
                        ? "Create Announcement"
                        : "Complete The Form"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAnnouncementModal;
