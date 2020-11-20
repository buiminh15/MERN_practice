import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import TextGenerator from './views/features/TextGenerator';
import Home from './views/Home';

const Root = (props) => {
  return (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/text-generator/" component={TextGenerator} />
        </Switch>
      </App>
    </Router>
  );
};

export default Root;
