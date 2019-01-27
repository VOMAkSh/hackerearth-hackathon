import React, { Component } from "react";

export class LoginSignUpModal extends Component {
  render() {
    return (
      <div id="loginCreateAccount" className="modal">
        <div class="modal-content center-align">
          <h4>Login or Create your account</h4>
          <div>
            <button
              className="btn"
              style={{ backgroundColor: "#db4437" }}
              onClick={this.props.signInWithGoogle}
            >
              <i class="fab fa-google-plus-g" />
              <b style={{ marginLeft: "10px" }}>Login with Google</b>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">
            Close
          </a>
        </div>
      </div>
    );
  }
}

export default LoginSignUpModal;
