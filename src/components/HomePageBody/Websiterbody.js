import React, { Component } from "react";
import { Link } from "react-router-dom";

class Websitebody extends Component {
  render() {
    return (
      <div>
        <div id="index-banner" class="parallax-container">
          <div class="section no-pad-bot">
            <div class="container">
              <br />
              <br />
              <h1 class="header center white-text">VOMAkSh</h1>
              <div class="row center">
                <h5 class="header col s12 light white-text">
                  Make Societies, organize events and talks, connect to people
                  and monetize societies
                </h5>
              </div>
              <div class="row center">
                {this.props.isAuthenticated ? (
                  <Link
                    className="waves-effect waves-light btn-large modal-trigger green darken-2 pulse"
                    to="/dashboard"
                  >
                    <b>View your dashboard</b>
                  </Link>
                ) : (
                  <a
                    class="waves-effect waves-light btn-large modal-trigger blue pulse"
                    href="#loginCreateAccount"
                  >
                    <b>Login / Create Account</b>
                  </a>
                )}
              </div>
              <br />
              <br />
            </div>
          </div>
          <div class="parallax">
            <img
              src="https://makerhub.coolermaster.com/wp-content/uploads/2017/04/1920x600-HD-Cover-dark.jpg"
              alt="Unsplashed background img 1"
              style={{
                filter: "blur(1px)"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Websitebody;
