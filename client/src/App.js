import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./private";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import MembersProfile from "./pages/MembersProfile";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/members" component={Members} />
            <PrivateRoute path="/members/profile" component={MembersProfile} />
            {/* <PrivateRoute path="/members" component={Members} /> */}
          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
