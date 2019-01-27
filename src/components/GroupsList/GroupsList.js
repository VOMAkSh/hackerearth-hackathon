import React, { Component } from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";

const db = firebase.firestore();

export class GroupsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }
  componentDidMount = () => {
    db.collection("groups")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            groups: [
              ...this.state.groups,
              {
                id: doc.id,
                ...doc.data()
              }
            ]
          });
        });
      });
  };
  render() {
    return (
      <div className="container">
        <h4 className="center-align">
          Recommended Groups according to your preferences
        </h4>
        <div className="row">
          {this.state.groups.map(group => {
            return (
              <div class="col s12 m4">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">{group.name}</span>
                    <b>Description</b>
                    <br />
                    {group.description}
                  </div>
                  <div class="card-action">
                    <Link to={`/society/${group.id}`}>Further information</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GroupsList;
