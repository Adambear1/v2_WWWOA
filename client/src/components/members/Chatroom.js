import React, { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";
import "./styles.css";
import { useAuth } from "../../context/AuthContext";

const socket = io.connect("http://localhost:4000");
function Chatroom() {
  const [DBA, setDBA] = useState("");
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState([]);
  const nameRef = useRef();
  const messageRef = useRef();
  const username = "Adam";
  const room = "General";

  socket.on("message", (message) => {
    console.log(message);
    setChat([...chat, message]);
    document.querySelectorAll(
      ".chat-messages"
    )[0].scrollTop = document.querySelectorAll(
      ".chat-messages"
    )[0].scrollHeight;
  });

  const leaveRoom = (e) => {
    e.preventDefault();
    socket.emit("leaveRoom", { username: currentUser.email });
  };

  const onMessageSubmit = async (e) => {
    e.preventDefault();

    await socket.emit("chatMessage", {
      name: currentUser.email || DBA,
      message: messageRef.current.value,
    });

    messageRef.current.value = "";
  };

  return (
    <div
      class="modal fade"
      id="chatModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="chatModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              class="close"
              onClick={leaveRoom}
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form onSubmit={onMessageSubmit}>
              <div className="name-field">
                <input
                  type="text"
                  className="form-control"
                  value={currentUser.email}
                />
                <textarea
                  name="message"
                  type="textarea"
                  className="form-control"
                  rows="5"
                  ref={messageRef}
                />
              </div>
              <button type="submit" className="btn btn-light">
                Send Message
              </button>
            </form>
            <div className="render-chat">
              <h1>Chat Log</h1>
              <div className="chat-messages">
                {chat.map(({ name, message }, index) => (
                  <div key={index}>
                    <h3>
                      {name}: <span>{message}</span>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
