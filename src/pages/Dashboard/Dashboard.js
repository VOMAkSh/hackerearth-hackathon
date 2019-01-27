import React, { Component } from "react";
import firebase from "firebase";
import FirstTimeLoginPage from "../FirstTimeLoginPage/FirstTimeLoginPage";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import CreateSocietyModal from "../../components/CreateSocietyModal/CreateSocietyModal";
import MySocietiesModal from "../../components/MySocietiesModal/MySocietiesModal";
import GroupsList from "../../components/GroupsList/GroupsList";
import EventsList from "../../components/EventsList/EventsList";

const db = firebase.firestore();

export class Dashboard extends Component {
  componentDidMount = () => {
    window.M.AutoInit();
    if (!this.props.loading && !this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  };
  reloadPage = () => {
    window.location.reload();
  };
  render() {
    return (
      <div>
        <DashboardHeader
          logout={this.props.logout}
          isAuthenticated={this.props.isAuthenticated}
          photoUrl={this.props.photoUrl}
          mySocieties={this.props.mySocieties}
          mySocietyList={this.props.mySocietyList}
        />
        <GroupsList />
        <EventsList />
        <FirstTimeLoginPage
          uid={this.props.uid}
          open={this.props.firstTimeLoggedIn}
          loading={this.props.loading}
        />
        <CreateSocietyModal uid={this.props.uid} reloadPage={this.reloadPage} />
        <MySocietiesModal mySocietyList={this.props.mySocietyList} />
      </div>
    );
  }
}

export default Dashboard;
