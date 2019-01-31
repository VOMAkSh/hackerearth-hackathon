import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Websitebody from "../../components/HomePageBody/Websiterbody";
import Footer from "../../components/Footer/Footer";
import LoginSignUpModal from "../../components/LoginSignUpModal/LoginSignUpModal";
import firebase from "firebase";

const db = firebase.firestore();
export class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar
          logout={this.props.logout}
          isAuthenticated={this.props.isAuthenticated}
          photoUrl={this.props.photoUrl}
        />
        <Websitebody isAuthenticated={this.props.isAuthenticated} />
        <Footer />
        <LoginSignUpModal signInWithGoogle={this.props.signInWithGoogle} />
      </div>
    );
  }
}

export default HomePage;
