import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./private";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="*" component={Members} />
            {/* <PrivateRoute path="/members" component={Members} /> */}
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
