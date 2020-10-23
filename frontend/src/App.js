import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const URI = `http://localhost:4000/api/v1/sample/download`
function App() {
  return (
    <div className="App">
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

function handleDownload() {
  const config = { responseType: 'blob' };
  axios.get(URI, config)
  // .then(resp => resp.blob())
  .then(response => {
    new File([response.data], '123.png');       
});

  // .then(blob => {
  //   console.log(blob);
  //   const url = window.URL.createObjectURL(blob.data);
  //   const a = document.createElement('a');
  //   a.style.display = 'none';
  //   a.href = url;
  //   // the filename you want
  //   a.download = 'todo-1.png';
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   alert('your file has downloaded!'); 
  // })
}

export default App;
