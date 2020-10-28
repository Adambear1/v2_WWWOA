import React from "react";
import io from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
const socket = io.connect("http://localhost:4000");

function InteractionToggle() {
  const { currentUser } = useAuth();
  const joinChat = () => {
    socket.emit("joinRoom", { username: currentUser.email });
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#chatModal"
        onClick={joinChat}
      >
        Chat
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#zoomModal"
      >
        Zoom
      </button>
    </div>
  );
}

export default InteractionToggle;
