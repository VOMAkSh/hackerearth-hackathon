import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MySocietiesModal extends Component {
  render() {
    return (
      <div id="mySocietiesModal" class="modal">
        <div class="modal-content">
          <h4 className="center-align">My Societies</h4>
          <div>
            {this.props.mySocietyList.length > 0 ? (
              this.props.mySocietyList.map(society => {
                return (
                  <div style={{ marginBottom: "10px" }}>
                    <Link
                      to={`/society/${society.societyId}`}
                      className="btn green darken-2"
                    >
                      {society.societyName}
                    </Link>
                  </div>
                );
              })
            ) : (
              <div>You currently have no societies</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MySocietiesModal;
