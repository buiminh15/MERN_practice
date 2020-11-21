import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { features } from './models/features'
import App from './App';
import Home from './views/Home';

const Root = (props) => {
  return (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          {
            features.map(feature => <Route key={feature.name} path={feature.path} component={feature.component} />)
          }

        </Switch>
      </App>
    </Router>
  );
};

export default Root;
