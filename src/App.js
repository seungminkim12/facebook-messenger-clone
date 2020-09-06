import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./Firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // useState = variable in REACT
  // useEffect = run code on a condition in REACT

  useEffect(() => {
    //run once when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    //run code here...
    //if its blank inside [], this code runs ONCE when the app component loads
    // if we have a variable like input, it runs every time input changes
    setUsername(prompt("please enter your name"));
  }, []); //condition

  const sendMessage = (event) => {
    // all the logic to send a message goes
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <img
        className="app__logo"
        src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=512&h=512"
      />
      <h1>Fakebook-Messenger</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {/* input field*/}
      {/* button */}

      {/* messages themselves */}

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/7.19.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/7.19.1/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>
 */

export default App;
