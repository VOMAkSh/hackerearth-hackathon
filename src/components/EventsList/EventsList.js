import React, { Component } from "react";
import firebase from "firebase";

const db = firebase.firestore();

export class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }
  componentDidMount = () => {
    db.collection("events")
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
        {this.state.groups.length > 0 ? (
          <h4 className="center-align">
            Recommended Events according to your preferences
          </h4>
        ) : null}
        <div className="row">
          {this.state.groups.slice(0, 5).map(group => {
            return (
              <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title">{group.name}</span>
                    <b>Description</b>
                    <br />
                    {group.description}
                    <b>Date</b>:{" "}
                    {new Date(group.date.seconds * 1000).toDateString()}
                    <br />
                    <b>Location</b>: {group.city}
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

export default EventsList;
