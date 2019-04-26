import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.css";

var config = {
  apiKey: "AIzaSyDAB8Bxa4x7zjXgKgEILA4q6IJfS01BjQY",
  authDomain: "spotify-social.firebaseapp.com",
  databaseURL: "https://spotify-social.firebaseio.com",
  projectId: "spotify-social",
  storageBucket: "spotify-social.appspot.com",
  messagingSenderId: "78747537025"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

ReactDOM.render(
  <App firebase={firebase.firestore()} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
