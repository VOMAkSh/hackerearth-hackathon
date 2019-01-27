import React, { Component } from "react";
import firebase from "firebase";
import Loader from "../Loader/Loader";

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export class CreateSocietyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: [],
      selectedTags: [],
      loading: true,
      name: "",
      city: "",
      description: ""
    };
  }
  componentDidMount = () => {
    db.collection("tags")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          this.setState({
            allTags: [...this.state.allTags, doc.data()],
            loading: false
          });
        });
      });
  };
  createNewSociety = () => {
    const { name, city, description } = this.state;
    const tags = this.state.selectedTags.map(tag => tag.value);
    const docId = Date.now() + "";
    const uid = this.props.uid;
    db.collection("groups")
      .doc(docId)
      .set({ name, city, description, tags, donationAmount: 0, uid })
      .then(() => {
        window.M.toast({ html: "Society created successfully" });
        db.collection("users")
          .doc(uid)
          .update({
            mySocieties: firebase.firestore.FieldValue.arrayUnion(docId)
          });
        this.props.reloadPage();
      })
      .catch(error => {
        console.log(error);
        window.M.toast({ html: "An error occurred" });
      });
  };
  selectTags = tag => {
    this.setState({
      selectedTags: [...this.state.selectedTags, tag]
    });
  };
  removeTags = tag => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(
        selectedTag => selectedTag.name !== tag.name
      )
    });
  };
  render() {
    return (
      <div id="createSocietyModal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4 className="center-align" style={{ marginBottom: "20px" }}>
            Create my society
          </h4>
          <h6>What's your new Society's home city?</h6>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="societyCity"
                type="text"
                class="validate"
                onChange={event => this.setState({ city: event.target.value })}
                value={this.state.city}
              />
              <label for="societyCity">Name of your Society's Hometown</label>
            </div>
          </div>
          <h6>What will be the name of your society?</h6>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="societyName"
                type="text"
                class="validate"
                onChange={event => this.setState({ name: event.target.value })}
                value={this.state.name}
              />
              <label for="societyName">Name of your new Society</label>
            </div>
          </div>
          <h6>What will your society be based on?</h6>
          <div style={{ textAlign: "center" }}>
            {this.state.loading ? (
              <div style={{ marginTop: "30px" }}>
                <Loader />
              </div>
            ) : (
              this.state.allTags.map(tag => (
                <div style={{ padding: "5px", display: "inline-block" }}>
                  {!this.state.selectedTags.find(
                    selectedTag => selectedTag.name === tag.name
                  ) ? (
                    <button
                      className="btn blue"
                      onClick={() => {
                        this.selectTags(tag);
                      }}
                    >
                      {tag.name}
                    </button>
                  ) : (
                    <button
                      className="btn green darken-2"
                      onClick={() => {
                        this.removeTags(tag);
                      }}
                    >
                      {tag.name}
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
          <h6>Describe your society and how can it be helpful for people?</h6>
          <div class="row">
            <div class="input-field col s12">
              <textarea
                id="societyDescription"
                class="materialize-textarea"
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
                value={this.state.description}
              />
              <label for="societyDescription">Describe your society</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a
            href="#"
            class="modal-close waves-effect waves-green btn-flat"
            onClick={this.createNewSociety}
          >
            Create my Society
          </a>
        </div>
      </div>
    );
  }
}

export default CreateSocietyModal;
