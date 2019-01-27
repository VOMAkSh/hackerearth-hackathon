import React, { Component } from "react";
import EventContainer from "../EventContainer/EventContainer";

export class EventsContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        {!this.props.loading ? (
          this.props.events.length === 0 ? (
            <div>
              <h4>Events hosted</h4>
              <p>No events have been hosted by {this.props.name} yet!</p>
            </div>
          ) : (
            <div>
              <h4>Events hosted</h4>
              <div className="row">
                {this.props.events.map(event => {
                  return <EventContainer event={event} />;
                })}
              </div>
            </div>
          )
        ) : null}
      </div>
    );
  }
}

export default EventsContainer;
