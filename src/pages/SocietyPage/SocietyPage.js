import React, { Component, Fragment } from "react";
import firebase from "firebase";
import FirstTimeLoginPage from "../FirstTimeLoginPage/FirstTimeLoginPage";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import Loader from "../../components/Loader/Loader";
import CreateNewEventModal from "../../components/CreateNewEventModal/CreateNewEventModal";
import "react-datepicker/dist/react-datepicker.css";
import EventsContainer from "../../components/EventsContainer/EventsContainer";

const db = firebase.firestore();
const jumbotronStyle = {
  paddingBottom: "150px",
  marginTop: "-2px",
  boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)"
};

export class SocietyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      description: "",
      tags: "",
      donationAmount: "",
      loading: true,
      donatingAmount: 50,
      events: []
    };
  }
  componentDidMount = () => {
    window.M.AutoInit();
    this.setState({
      societyId: this.props.match.params.societyId
    });
    db.collection("groups")
      .doc(this.props.match.params.societyId)
      .get()
      .then(doc => {
        this.setState({
          name: doc.data().name,
          city: doc.data().city,
          description: doc.data().description,
          tags: doc.data().tags,
          donationAmount: doc.data().donationAmount,
          founderUid: doc.data().uid,
          loading: false
        });
        if (doc.data().events) {
          doc.data().events.forEach(event => {
            db.collection("events")
              .doc(event)
              .get()
              .then(doc => {
                this.setState({
                  events: [...this.state.events, doc.data()]
                });
              });
          });
        }
      });
  };
  donateMoney = event => {
    event.preventDefault();
    var options = {
      key: "rzp_test_1mNMojEPu7SOmN",
      amount: this.state.donatingAmount * 100, // 2000 paise = INR 20
      name: this.state.name,
      description: "Donate Us",
      image:
        "https://cdn-images-1.medium.com/max/1600/1*T1b83o47E1AI0lTpwzHVvA.png",
      handler: function(response) {
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: this.props.name,
        email: this.props.email
      },
      notes: {
        address: "Hello World"
      },
      theme: {
        color: "#F37254"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  addEvent = event => {
    this.setState({
      events: [...this.state.events, event]
    });
  };
  goToDashboard = () => {
    window.M.Tooltip.getInstance(
      document.getElementById("dashboardTooltip")
    ).close();
    this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div>
        <DashboardHeader
          logout={this.props.logout}
          isAuthenticated={this.props.isAuthenticated}
          photoUrl={this.props.photoUrl}
          mySocieties={this.props.mySocieties}
          mySocietyList={this.props.mySocietyList}
          uid={this.props.uid}
          reloadPage={this.props.reloadPage}
          backButton={true}
          goToDashboard={this.goToDashboard}
        />
        {this.state.loading ? (
          <div style={{ width: "100%", height: "90%", marginTop: "60px" }}>
            <div
              style={{ position: "absolute", marginLeft: "45%", top: "40%" }}
            >
              <Loader />
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="card-panel grey lighten-2" style={jumbotronStyle}>
              <div className="container">
                <h1>{this.state.name}</h1>
                <p className="flow-text">Our Home Town is {this.state.city}</p>
                {this.props.uid == this.state.founderUid ? (
                  <div>
                    <div
                      className="btn-large green"
                      style={{
                        cursor: "auto",
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      <b style={{ fontSize: "20px" }}>Donation Money</b>
                      <span style={{ marginLeft: "10px" }} />
                      <i
                        class="fas fa-rupee-sign"
                        style={{ fontSize: "20px" }}
                      />
                      <b style={{ fontSize: "20px", marginLeft: "5px" }}>
                        {this.state.donationAmount}
                      </b>
                    </div>
                    <span style={{ marginLeft: "10px" }} />
                    <button
                      className="btn-large blue modal-trigger"
                      href="#createEvent"
                    >
                      <b style={{ fontSize: "20px" }}>Create a new event</b>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn-large orange darken-2"
                      style={{ marginBottom: "10px" }}
                    >
                      <i class="fas fa-users" />
                      <b style={{ marginLeft: "10px" }}>Follow Us</b>
                    </button>
                    <span style={{ marginLeft: "20px" }} />
                    <i
                      class="fas fa-rupee-sign green-text"
                      style={{ fontSize: "20px" }}
                    />
                    <input
                      type="number"
                      style={{
                        width: "50px",
                        marginRight: "10px",
                        marginLeft: "10px"
                      }}
                      value={this.state.donatingAmount}
                      onChange={event =>
                        this.setState({ donatingAmount: event.target.value })
                      }
                      placeholder="Donate"
                    />
                    <button
                      className="btn-large green"
                      onClick={this.donateMoney}
                    >
                      <i class="fas fa-rupee-sign" />
                      <b style={{ marginLeft: "10px" }}>
                        Donate Us to help our society
                      </b>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="container">
              <h4>About our Society</h4>
              <p style={{ fontSize: "20px" }}>{this.state.description}</p>
            </div>
          </Fragment>
        )}
        {console.log(this.state.events, "in render")}
        <EventsContainer
          events={this.state.events}
          loading={this.state.loading}
          name={this.state.name}
        />
        <FirstTimeLoginPage
          uid={this.props.uid}
          open={this.props.firstTimeLoggedIn}
          loading={this.props.loading}
          setFirstTimeLoginAfterSelection={
            this.props.setFirstTimeLoginAfterSelection
          }
        />
        <CreateNewEventModal
          societyId={this.state.societyId}
          path={this.props.location.pathName}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default SocietyPage;
