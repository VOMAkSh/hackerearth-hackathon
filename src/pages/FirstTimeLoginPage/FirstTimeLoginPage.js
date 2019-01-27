import React, { Component } from "react";
import firebase from "firebase";
import Loader from "../../components/Loader/Loader";

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export class FirstTimeLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: undefined,
      tagsSelected: [],
      allTags: [],
      loading: false,
      selectedTags: []
    };
  }
  componentDidMount() {
    this.setState({
      loading: true
    });
    document.addEventListener("DOMContentLoaded", () => {
      var elem = document.querySelector("#firstTimeLoginModal");
      var instance = window.M.Modal.init(elem, { dismissible: false });
      this.setState({ instance });
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
    });
  }
  checkIfRequiredTagsSelected = () => {
    if (this.state.selectedTags.length >= 5) {
      db.collection("users")
        .doc(this.props.uid)
        .update({
          tags: this.state.selectedTags.map(tag => tag.value),
          firstTimeLoggedIn: false
        })
        .then(() => {
          window.M.toast({ html: "Your choices have been successfully" });
          this.state.instance.close();
        })
        .catch(error => {
          console.log(error);
          window.M.toast({
            html: "Error has occurred while saving your choices"
          });
        });
    } else {
      window.M.toast({ html: "Please select atleast 5 topics." });
    }
  };
  selectTags = tag => {
    this.setState({
      selectedTags: [...this.state.selectedTags, tag]
    });
    console.log(this.state.selectedTags);
  };
  removeTags = tag => {
    this.setState({
      selectedTags: this.state.selectedTags.filter(
        selectedTag => selectedTag.name !== tag.name
      )
    });
  };
  render() {
    if (this.state.instance) {
      if (this.props.open && !this.props.loading) {
        this.state.instance.open();
      }
    }
    return (
      <div id="firstTimeLoginModal" class="modal">
        <div class="modal-content">
          <h4>Welcome!</h4>
          <p>
            Please select topics in which you are interested in. Select atleast
            5 areas of interest.
          </p>
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
        </div>
        <div class="modal-footer">
          <a
            href="#!"
            class="waves-effect waves-green btn-flat"
            onClick={this.checkIfRequiredTagsSelected}
          >
            Yes, I have Selected
          </a>
        </div>
      </div>
    );
  }
}

export default FirstTimeLoginPage;
