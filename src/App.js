import React, { Component } from "react";
import fire from "./config/fire";
import firebase from "firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import SocietyPage from "./pages/SocietyPage/SocietyPage";

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

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
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isAuthenticated: false,
      photoUrl: "",
      name: "",
      uid: "",
      mySocieties: [],
      mySocietyList: [],
      firstTimeLoggedIn: true,
      loading: true
    };
  }
  componentDidMount = () => {
    fcmConfiguration();
    window.M.AutoInit();
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const userInfo = await db
          .collection("users")
          .doc(user.uid)
          .get();
        const mySocieties = userInfo.data().mySocieties;
        mySocieties.forEach(societyId => {
          db.collection("groups")
            .doc(societyId)
            .get()
            .then(doc => {
              this.setState({
                mySocietyList: [
                  ...this.state.mySocietyList,
                  { societyId, societyName: doc.data().name }
                ]
              });
              this.setState({
                isAuthenticated: true,
                photoUrl: user.photoURL,
                email: user.email,
                name: user.displayName,
                uid: user.uid,
                firstTimeLoggedIn: userInfo.data().firstTimeLoggedIn,
                mySocieties: userInfo.data().mySocieties
                  ? userInfo.data().mySocieties
                  : [],
                loading: false
              });
            });
        });
      } else {
        console.log("No user logged in yet.....");
      }
    });
  };
  signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        const uid = result.user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then(docSnapshot => {
            if (docSnapshot.exists) {
              window.M.toast({ html: "You have been logged in successfully." });
              db.collection("users")
                .doc(uid)
                .get()
                .then(doc => {
                  const mySocieties = doc.data().mySocieties;
                  mySocieties.forEach(societyId => {
                    db.collection("groups")
                      .doc(societyId)
                      .get()
                      .then(doc => {
                        this.setState({
                          mySocietyList: [
                            ...this.state.mySocietyList,
                            { societyId, societyName: doc.data().name }
                          ]
                        });
                        this.setState({
                          firstTimeLoggedIn: doc.data().firstTimeLoggedIn,
                          mySocieties: doc.data().mySocieties
                        });
                      });
                  });
                });
            } else {
              window.M.toast({ html: "Creating user" });
              db.collection("users")
                .doc(uid)
                .set({
                  name: user.displayName,
                  email: user.email,
                  firstTimeLoggedIn: true,
                  mySocieties: []
                })
                .then(() => {
                  this.setState({
                    isAuthenticated: true,
                    photoUrl: user.photoURL,
                    email: user.email,
                    name: user.displayName,
                    uid
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("You have been signed out successfully");
        this.setState({
          isAuthenticated: false,
          email: "",
          name: "",
          photoUrl: ""
        });
        window.location.href = "/";
      })
      .catch(error => {
        console.log(error);
      });
  };
  reloadPage = () => {
    window.location.reload();
  };
  render() {
    return (
      <Router>
        <div>
          <Route
            path="/"
            render={() => (
              <HomePage
                name={this.state.name}
                isAuthenticated={this.state.isAuthenticated}
                photoUrl={this.state.photoUrl}
                email={this.state.email}
                signInWithGoogle={this.signInWithGoogle}
                signInWithFacebook={this.signInWithFacebook}
                logout={this.logout}
              />
            )}
            exact
          />
          <Route
            path="/dashboard"
            render={props => (
              <Dashboard
                name={this.state.name}
                isAuthenticated={this.state.isAuthenticated}
                photoUrl={this.state.photoUrl}
                email={this.state.email}
                uid={this.state.uid}
                loading={this.state.loading}
                firstTimeLoggedIn={this.state.firstTimeLoggedIn}
                mySocieties={this.state.mySocieties}
                mySocietyList={this.state.mySocietyList}
                logout={this.logout}
                reloadPage={this.reloadPage}
                {...props}
              />
            )}
          />
          <Route
            path="/society/:societyId"
            render={props => (
              <SocietyPage
                name={this.state.name}
                isAuthenticated={this.state.isAuthenticated}
                photoUrl={this.state.photoUrl}
                email={this.state.email}
                uid={this.state.uid}
                loading={this.state.loading}
                firstTimeLoggedIn={this.state.firstTimeLoggedIn}
                mySocieties={this.state.mySocieties}
                mySocietyList={this.state.mySocietyList}
                logout={this.logout}
                reloadPage={this.reloadPage}
                {...props}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
