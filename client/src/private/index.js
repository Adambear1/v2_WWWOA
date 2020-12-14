import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser, setError } = useAuth();
  const history = useHistory();
  console.log(currentUser);
  try {
    return (
      <>
        <Route
          {...rest}
          render={(props) => {
            try {
              if (currentUser) {
                <Component {...props} />;
              } else {
                setError({ message: "Invalid credentials" });
                <Redirect to="/" />;
              }
              // return currentUser ? <Component {...props} /> : <Redirect to="/" />;
            } catch ({ message }) {
              setError({ message });
              history.push("/");
            }
          }}
        />
      </>
    );
  } catch ({ message }) {
    setError({ message });
    history.push("/");
  }
}

export default PrivateRoute;
