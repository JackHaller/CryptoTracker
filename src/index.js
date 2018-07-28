import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.1.0";

import firebase from "firebase";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </Switch>
  </Router>,
  document.getElementById("root")
);


var config = {
    apiKey: "AIzaSyApdOt_lT-3SFDsKilN-wb6G2zySxaQ0QY",
    authDomain: "cryptotracker-bcd99.firebaseapp.com",
    databaseURL: "https://cryptotracker-bcd99.firebaseio.com/",
    storageBucket: "gs://cryptotracker-bcd99.appspot.com",
  };
  
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user.displayName)
    } else {
      console.log("no user")
    }
  });