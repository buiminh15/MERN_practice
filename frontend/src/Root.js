import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Sample from './components/Sample/Sample';
import GenFile from './components/GenFile/GenFile';
import Home from './components/Home';

const Root = (props) => {
  return (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sample" component={Sample} />
          <Route path="/gen" component={GenFile} />
        </Switch>
      </App>
    </Router>
  );
};

export default Root;
