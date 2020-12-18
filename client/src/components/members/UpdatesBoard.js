import React, { useEffect, useState } from "react";
import CreateUpdates from "./CreateUpdates";
import { useAuth } from "../../context/AuthContext";
function UpdatesBoard() {
  // const [cU, setCU] = useState();
  // let { currentUser } = useAuth();
  useEffect(() => {
    //   if (!currentUser) {
    let user = Promise.resolve(getUser());
    console.log(user);
    //     setCU(getUser());
    //   } else {
    //     setCU(currentUser);
    //   }
  }, []);

  const getUser = async () => {
    let email = sessionStorage.getItem("email");
    let admin = sessionStorage.getItem("admin");
    return { email, admin };
  };
  // console.log(cU);
  return <div>{/* {cU.admin === true && <CreateUpdates />} */}</div>;
}

export default UpdatesBoard;
