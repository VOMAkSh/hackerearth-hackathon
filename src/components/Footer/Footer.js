import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="page-footer grey darken-4">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">About Us</h5>
                <p class="grey-text text-lighten-4">
                  We are a team of college students working on this project like
                  it's our full time job. Any amount would help support and
                  continue development on this project and is greatly
                  appreciated.
                </p>
              </div>
              <div class="col l6 s12 right-align">
                <h5 class="white-text">Connect</h5>
                <ul>
                  <li>
                    <a class="white-text" href="#!">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a class="white-text" href="#!">
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">Made by VOMAkSh</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
