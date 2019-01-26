import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAHQekxXYYgVvjo-k7C39lzRi_6T6j6-fk",
  authDomain: "hackerearth-hackathon.firebaseapp.com",
  databaseURL: "https://hackerearth-hackathon.firebaseio.com",
  projectId: "hackerearth-hackathon",
  storageBucket: "hackerearth-hackathon.appspot.com",
  messagingSenderId: "331864450031"
};

export default firebase.initializeApp(config);
