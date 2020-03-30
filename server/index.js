const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
var firebase = require("firebase");
const bodyParser = require("body-parser");

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(bodyParser.json());

app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

exports.app = functions.https.onRequest(app);
/*const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
var firebase = require("firebase");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

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
const testApp = express();

testApp.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

const testApi = functions.https.onRequest(testApp);

app.get("/media", (req, res) => {
  console.log("getting media file");
  console.log(req.query.word);
  res.sendFile(path.join(__dirname + "/audio/" + req.query.word + ".mp3"));
});

app.get("/test", (req, res) => {
  res.send("HTTP GET Request");

  firebase
    .database()
    .ref("/TestMessages")
    .set({ TestMessage: "GET Request 3" });
});

app.post("/user", (req, res) => {
  console.log("Adding user if user does not exist");
  firebase
    .database()
    .ref("/users/" + req.body.email)
    .set({
      name: req.body.name
    });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

const port = process.env.PORT || 5000;
//app.listen(port);
module.exports = {
  testApi
};

console.log("App is listening on port " + port);
*/
