import React, { Component } from "react";
import DatePicker from "react-datepicker";
import firebase from "firebase";

const db = firebase.firestore();

export class CreateNewEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      description: "",
      date: new Date()
    };
  }
  createEvent = () => {
    const docId = "event" + Date.now();
    db.collection("events")
      .doc(docId)
      .set({
        name: this.state.name,
        city: this.state.city,
        description: this.state.description,
        date: this.state.date,
        societyId: this.props.societyId
      });
    db.collection("groups")
      .doc(this.props.societyId)
      .update({
        events: firebase.firestore.FieldValue.arrayUnion(docId)
      })
      .then(() => {
        window.M.toast({ html: "Saved your event successfully" });
        window.location.reload();
      })
      .catch(() => {
        window.M.toast({ html: "Something went wrong!" });
      });
  };
  render() {
    return (
      <div id="createEvent" class="modal">
        <div class="modal-content">
          <h4 className="center-align">Create a new Event</h4>
          <h6>What's your new event's location?</h6>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="eventCity"
                type="text"
                class="validate"
                onChange={event => this.setState({ city: event.target.value })}
                value={this.state.city}
              />
              <label for="eventCity">Event's location</label>
            </div>
          </div>
          <h6>What will be the name of your event?</h6>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="eventName"
                type="text"
                class="validate"
                onChange={event => this.setState({ name: event.target.value })}
                value={this.state.name}
              />
              <label for="eventName">Name of your event</label>
            </div>
          </div>
          <h6>What will your event be based on?</h6>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="eventDescription"
                type="text"
                class="validate"
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
                value={this.state.description}
              />
              <label for="eventDescription">Description of your event</label>
            </div>
          </div>
          <h6>When is your event going to happen?</h6>
          <DatePicker
            selected={this.state.date}
            onChange={date => this.setState({ date })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
          />
        </div>
        <div class="modal-footer">
          <a
            href="#!"
            class="modal-close waves-effect waves-green btn-flat"
            onClick={this.createEvent}
          >
            Create your event
          </a>
        </div>
      </div>
    );
  }
}

export default CreateNewEventModal;
