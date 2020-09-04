import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCLmX2EwY7ForiNPzPO5W1Mbc0g0mMEPWU",
  authDomain: "facebook-messenger-clone-e5f56.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-e5f56.firebaseio.com",
  projectId: "facebook-messenger-clone-e5f56",
  storageBucket: "facebook-messenger-clone-e5f56.appspot.com",
  messagingSenderId: "504929125234",
  appId: "1:504929125234:web:e5dd2715507ec5062013eb",
  measurementId: "G-969L4GWR1X",
});

const db = firebaseApp.firestore();

export default db;
