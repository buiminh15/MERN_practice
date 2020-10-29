import React, { Component } from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
