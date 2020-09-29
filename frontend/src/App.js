import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Bootcamps from './components/bootcamps/Bootcamps';
import Index from './components/index/Index';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/bootcamps">
            <Bootcamps />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
