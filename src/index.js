import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCiE7Yq4cUl0n0J-PLyB_LbzuYgo_xXlz0",
    authDomain: "kranti-test.firebaseapp.com",
    databaseURL: "https://kranti-test.firebaseio.com",
    projectId: "kranti-test",
    storageBucket: "kranti-test.appspot.com",
    messagingSenderId: "264834949250",
    appId: "1:264834949250:web:9eba43588b02997bad149b",
    measurementId: "G-WMM1HY78Q1"
  };
  // Initialize Firebase
   
  require("firebase/firestore");
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebaseConfig;
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
