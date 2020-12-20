import React, { useEffect, useState } from "react";
import CreateUpdates from "../AdminSpecialties/CreateUpdates";
import { useAuth } from "../../../context/AuthContext";
function UpdatesBoard() {
  const getUser = async () => {
    let email = localStorage.getItem("email");
    let admin = localStorage.getItem("admin");
    return { email, admin };
  };
  // console.log(cU);
  return <div>{/* {cU.admin === true && <CreateUpdates />} */}</div>;
}

export default UpdatesBoard;
