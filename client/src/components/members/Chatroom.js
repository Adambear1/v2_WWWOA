// import React, { useState, useEffect, useRef, useContext } from "react";
// import { useHistory } from "react-router-dom";
// import io from "socket.io-client";
// import "./styles.css";
// import { useAuth } from "../../context/AuthContext";

// const url =
//   // process.env.NODE_ENV === "production"
//   // ? "https://wwwoa-297919.wm.r.appspot.com:4000";
//   // :
//   "http://localhost:4000/";
// const socket = io(url, {
//   withCredentials: true,
//   extraHeaders: {
//     "wwwoa-origins": ".",
//   },
// });

// function Chatroom() {
//   const [DBA, setDBA] = useState("");
//   const [loaded, setLoaded] = useState(false);
//   const { currentUser } = useAuth();
//   const { setError } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [chat, setChat] = useState([]);
//   const nameRef = useRef();
//   const messageRef = useRef();

//   const history = useHistory();

//   useEffect(() => {
//     try {
//       console.log(currentUser);
//       {
//         if (currentUser.email === undefined || currentUser.email === "") {
//           setError({ message: "No email was entered!" });
//           setLoaded(true);
//           history.push("/");
//         }
//         if (currentUser.password === undefined || currentUser.password === "") {
//           setError({ message: "No password was entered!" });
//           setLoaded(true);
//           history.push("/");
//         }
//       }
//     } catch ({ message }) {
//       setError({ message });
//       history.push("/");
//     }
//   }, []);

//   useEffect(() => {
//     socket.on("joinRoom", ({ username }) => {
//       console.log(username);
//       setUsers([...users, currentUser.email]);
//     });
//     socket.on("message", (message) => {
//       setChat([...chat, currentUser.email]);
//       document.querySelectorAll(
//         ".chat-messages"
//       )[0].scrollTop = document.querySelectorAll(
//         ".chat-messages"
//       )[0].scrollHeight;
//     });
//   }, []);

//   const leaveRoom = (e) => {
//     e.preventDefault();
//     // socket;
//     socket.emit("leaveRoom", { username: currentUser.email });
//   };

//   const onMessageSubmit = async (e) => {
//     e.preventDefault();

//     await socket.emit("chatMessage", {
//       name: currentUser.email || DBA,
//       message: messageRef.current.value,
//     });

//     messageRef.current.value = "";
//   };

//   return (
//     <>
//       {loaded && (
//         <div
//           class="modal fade"
//           id="chatModal"
//           tabindex="-1"
//           role="dialog"
//           aria-labelledby="chatModalLabel"
//           aria-hidden="true"
//         >
//           <div class="modal-dialog" role="document">
//             <div class="modal-content">
//               <div class="modal-header">
//                 <h5 class="modal-title" id="exampleModalLabel">
//                   Modal title
//                 </h5>
//                 <button
//                   type="button"
//                   class="close"
//                   onClick={leaveRoom}
//                   data-dismiss="modal"
//                   aria-label="Close"
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div class="modal-body">
//                 <form onSubmit={onMessageSubmit}>
//                   <div className="name-field">
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={currentUser.email}
//                     />
//                     <textarea
//                       name="message"
//                       type="textarea"
//                       className="form-control"
//                       rows="3"
//                       ref={messageRef}
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-light">
//                     Send Message
//                   </button>
//                 </form>
//                 <div className="render-chat">
//                   <h1>Chat Log</h1>
//                   <div className="chat-messages">
//                     {chat.map(({ name, message, color }, index) => (
//                       <div key={index}>
//                         <p className={`chat-msg ${color && color}`}>
//                           {name}: <span>{message}</span>
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Chatroom;
