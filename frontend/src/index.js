import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// require('firebase/firestore')
import 'firebase/firestore'
import firebase from 'firebase'
// const firebase =require('firebase')

const firebaseConfig = {
  apiKey: "AIzaSyDVlE34eN5rOodqWcwDnScV8gEjEallY4o",
  authDomain: "evernote-clone-85798.firebaseapp.com",
  projectId: "evernote-clone-85798",
  storageBucket: "evernote-clone-85798.appspot.com",
  messagingSenderId: "471636922947",
  appId: "1:471636922947:web:abe8d3b714b0175d29baf6",
  measurementId: "G-QKM6KYZRYV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('evernote-container')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
