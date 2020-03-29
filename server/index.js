const express = require("express");
const path = require("path");
const fs = require("fs");
var firebase = require("firebase");

require("dotenv").config();

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

var config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.get("/media", (req, res) => {
  console.log("getting media file");
  console.log(req.query.word);
  //fs.createReadStream('song.mp3').pipe(res);});
  res.sendFile(path.join(__dirname + "/audio/" + req.query.word + ".mp3"));
});

app.get("/test", (req, res) => {
  res.send("HTTP GET Request");

  firebase
    .database()
    .ref("/TestMessages")
    .set({ TestMessage: "GET Request 3" });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
