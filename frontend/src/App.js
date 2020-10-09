import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bootcamps from "./components/bootcamps/Bootcamps";
import Index from "./components/index/Index";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NotFound from "./components/notFound/Index";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ResetPassword from "./components/resetPassword/Index";
import Bootcamp from "./components/bootcamp/Bootcamp";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path={"/"} component={Index} />
          <Route path={"/login"} component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/resetPassword"} component={ResetPassword} />
          <PrivateRoute exact route={"/bootcamps"} component={Bootcamps} />
          <PrivateRoute route={"/t"} component={Bootcamp} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
