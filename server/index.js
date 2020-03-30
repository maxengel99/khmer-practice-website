const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(bodyParser.json());

app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.get("/test", (req, res) => {
  res.send("HTTP GET Request");

  admin
    .database()
    .ref("/TestMessages")
    .set({ TestMessage: "GET Request 10" });
});

app.post("/user", (req, res) => {
  console.log("Adding user if user does not exist");

  res.send("HTTP Post request");
  admin
    .database()
    .ref("/users/" + req.body.email)
    .set({
      name: req.body.name
    });
});

app.get("/media", (req, res) => {
  console.log("getting media file");
  res.send(
    "https://firebasestorage.googleapis.com/v0/b/khmer-practice-website.appspot.com/o/" +
      req.query.word +
      ".mp3?alt=media"
  );
  /*
  request(
    "https://firebasestorage.googleapis.com/v0/b/khmer-practice-website.appspot.com/o/" +
      req.query.word +
      ".mp3?alt=media"
  ).pipe(res);*/
});

exports.app = functions.https.onRequest(app);
