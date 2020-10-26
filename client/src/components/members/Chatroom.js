import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
function Chatroom() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, []);
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => {
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>;
    });
  };

  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <div className="name-field">
          <input
            name="name"
            className="form-control"
            type="text"
            onChange={(e) => onTextChange(e)}
            value={state.name}
          />
          <textarea
            name="message"
            type="textarea"
            className="form-control"
            rows="5"
            onChange={(e) => onTextChange(e)}
            value={state.message}
          />
        </div>
        <button type="submit" className="btn btn-light">
          Send Message
        </button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default Chatroom;
