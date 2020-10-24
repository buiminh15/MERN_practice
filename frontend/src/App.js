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

// const URI = `http://localhost:4000/api/v1/sample/download`;
// function App() {
//   return (
//     <div className="App">
//       <button onClick={handleDownload}>Download</button>
//     </div>
//   );
// }

// function handleDownload() {
//   const config = { responseType: 'blob' };
//   axios
//     .get(URI, config)
//     // .then(resp => resp.blob())
//     .then((response) => {
//       new File([response.data], '123.png');
//     });
// }

export default App;
