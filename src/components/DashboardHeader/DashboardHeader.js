import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import MySocietiesModal from "../MySocietiesModal/MySocietiesModal";
import CreateSocietyModal from "../CreateSocietyModal/CreateSocietyModal";

export class DashboardHeader extends Component {
  componentDidMount() {
    window.M.AutoInit();
  }
  render() {
    return (
      <Fragment>
        <nav class="grey darken-4" role="navigation">
          <div class="nav-wrapper container">
            {this.props.backButton ? (
              <i
                class="fas fa-chevron-left tooltipped"
                id="dashboardTooltip"
                style={{ marginRight: "50px", cursor: "pointer" }}
                onClick={this.props.goToDashboard}
                data-position="bottom"
                data-tooltip="Go to Dashboard"
              />
            ) : null}
            <a id="logo-container" href="/" class="brand-logo">
              VOMAkSh
            </a>
            <ul class="right hide-on-med-and-down">
              <li style={{ marginRight: "20px" }}>
                <button
                  className="btn green modal-trigger"
                  href="#createSocietyModal"
                >
                  Create my Society
                </button>
              </li>
              <li style={{ marginRight: "20px" }}>
                <button
                  className="btn blue modal-trigger"
                  href="#mySocietiesModal"
                >
                  My Societies
                </button>
              </li>
              <li>
                {this.props.isAuthenticated ? (
                  <button className="btn red" onClick={this.props.logout}>
                    Logout
                  </button>
                ) : null}
              </li>
              <li style={{ height: "64px" }}>
                {this.props.isAuthenticated ? (
                  <img
                    src={this.props.photoUrl}
                    style={{
                      marginLeft: "20px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginTop: "12px"
                    }}
                  />
                ) : null}
              </li>
            </ul>
            <ul id="nav-mobile" class="sidenav">
              <li>Create my Society</li>
              <li onClick={this.props.logout}>Logout</li>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger">
              <i class="material-icons">menu</i>
            </a>
          </div>
        </nav>
        <CreateSocietyModal
          uid={this.props.uid}
          reloadPage={this.props.reloadPage}
        />
        <MySocietiesModal mySocietyList={this.props.mySocietyList} />
      </Fragment>
    );
  }
}

export default DashboardHeader;
