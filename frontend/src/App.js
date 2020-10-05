import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Bootcamps from './components/bootcamps/Bootcamps';
import Index from './components/index/Index';
import Login from './components/login/Login';
import Register from './components/register/Register';
import NotFound from './components/notFound/Index';
import PrivateRoute from './components/privateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />
          <Route path={"/search"} component={Index} />
          {/* <Route path={'/bootcamps'} component={Bootcamps} /> */}
          <PrivateRoute route={'/bootcamps'} component={Bootcamps} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
