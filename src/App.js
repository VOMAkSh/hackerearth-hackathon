import React, { Component } from "react";
import firebase from "./config/fire";

const fcmConfiguration = () => {
  const messaging = firebase.messaging();
  messaging.onMessage(payload => {
    console.log("Notification Received", payload);
  });
  messaging
    .requestPermission()
    .then(() => {
      console.log("Have Permission");
      return messaging.getToken();
    })
    .then(token => {
      console.log("FCM Token:", token);
    })
    .catch(error => {
      if (error.code === "messaging/permission-blocked") {
        console.log("Please Unblock Notification Request Manually");
      } else {
        console.log("Error Occurred", error);
      }
    });
};

class App extends Component {
  componentDidMount = () => {
    fcmConfiguration();
  };
  render() {
    return <div className="App">Basic Boilerplate code</div>;
  }
}

export default App;
