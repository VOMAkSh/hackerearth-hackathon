import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav class="grey darken-4" role="navigation">
        <div class="nav-wrapper container">
          <a id="logo-container" href="#" class="brand-logo">
            VOMAkSh
          </a>
          <ul class="right hide-on-med-and-down">
            <li style={{ marginRight: "20px" }}>
              <a href="#">About Us</a>
            </li>
            <li style={{ marginRight: "20px" }}>
              <a href="#">Contact Us</a>
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
            {this.props.isAuthenticated ? (
              <li onClick={this.props.logout}>Logout</li>
            ) : null}
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
          <a href="#" data-target="nav-mobile" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
