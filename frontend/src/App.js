import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Bootcamps from './components/bootcamps/Bootcamps';
import Index from './components/index/Index';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route  path={'/login'} component={Login} />
          <Route  path={'/register'} component={Register} />
          <Route  path={'/bootcamps'} component={Bootcamps} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
