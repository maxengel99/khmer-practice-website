const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.get("/api/user", (req, res) => {
  admin
    .database()
    .ref("users/" + req.query.uid)
    .once("value")
    .then((snapshot) => {
      res.json(snapshot.val());
    });
});

app.post("/api/user", (req, res) => {
  console.log("Adding user if user does not exist");
  res.send("Adding user to the db");
  admin
    .database()
    .ref("users/" + req.body.uid)
    .set({
      email: req.body.email,
      name: req.body.name,
      photoURL: req.body.photoURL,
      success: 0,
      fail: 0,
    });
});

app.post("/answer", (req, res) => {
  console.log("Submitting answer");
  res.send("Submitting answer");

  if (req.body.success) {
    admin
      .database()
      .ref("users")
      .child(req.body.uid)
      .child("success")
      .transaction(function (success) {
        return (success || 0) + 1;
      });
  } else {
    admin
      .database()
      .ref("users")
      .child(req.body.uid)
      .child("fail")
      .transaction(function (fail) {
        return (fail || 0) + 1;
      });
  }

  admin
    .database()
    .ref("users/" + req.body.uid + "/attempts/" + Date.now())
    .set({
      correct_word: req.body.word,
      given_answer: req.body.answer,
      correct: req.body.success,
    });
});

exports.app = functions.https.onRequest(app);
