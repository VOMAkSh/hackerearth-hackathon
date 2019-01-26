import React, { Component } from "react";
import firebase from "./config/fire";
import Footer from './Component/Footer/footer';
import Navbar from './Component/Navbar/Navbar';
import Websitebody from './Component/Websitebody/Websiterbody';

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
    return (<div>
        <Navbar />
        <Websitebody />
        <Footer />
      </div>);
  }
}

export default App;
