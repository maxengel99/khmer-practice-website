const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(bodyParser.json());

app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.get("/user", (req, res) => {
  admin
    .database()
    .ref("users/" + req.query.uid)
    .once("value")
    .then((snapshot) => {
      res.json(snapshot.val());
    });
});

app.post("/user", (req, res) => {
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
});

exports.app = functions.https.onRequest(app);
