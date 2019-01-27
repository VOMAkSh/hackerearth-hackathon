import React, { Component } from "react";
import firebase from "firebase";

const db = firebase.firestore();

export class EventContainer extends Component {
  render() {
    return (
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">{this.props.event.name}</span>
            <div style={{ fontSize: "16px" }}>
              <b>Event Date</b>:{" "}
              {new Date(this.props.event.date.seconds * 1000).toDateString()}
              <br />
              <b>Topic of the Event</b>
              <br />
              {this.props.event.description}
              <br />
              <b>Location</b>: {this.props.event.city}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventContainer;
