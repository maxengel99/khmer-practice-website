import React, { Component } from "react";
import { UserContext } from "../providers/UserProvider";
import FixedNavbar from "./FixedNavbar";
import { WordsArray } from "../word-list";

export class Profile extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      incorrect: 0,
      savedWords: [],
    };

    this.downloadWords = this.downloadWords.bind(this);
    this.downloadSummary = this.downloadSummary.bind(this);
  }

  downloadWords() {
    const element = document.createElement("a");
    console.log(WordsArray);
    var wordsString = "";
    for (var word in WordsArray) {
      wordsString += `${word}: "${WordsArray[word]}"\n`;
    }
    const file = new Blob([wordsString], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "words-file.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  downloadSummary() {
    const requestInfo = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    let wordIncorrectPair = new Map();

    fetch("/user?uid=" + this.context.uid, requestInfo)
      .then((response) => response.json())
      .then((data) => {
        for (var attempt in data.attempts) {
          if (!data.attempts[attempt]["correct"]) {
            if (
              !wordIncorrectPair.has(data.attempts[attempt]["correct_word"])
            ) {
              wordIncorrectPair.set(data.attempts[attempt]["correct_word"], 1);
            } else {
              wordIncorrectPair.set(
                data.attempts[attempt]["correct_word"],
                wordIncorrectPair.get(data.attempts[attempt]["correct_word"]) +
                  1
              );
            }
          }
        }
        let sortedWordMap = new Map(
          Array.from(wordIncorrectPair).sort((a, b) => (a[0] > b[0] ? 1 : -1))
        );

        const element = document.createElement("a");
        var wordsString = `You have ${this.state.correct} correct submissions.\n`;
        wordsString += `You have ${this.state.incorrect} incorrect submissions.\n\n`;
        wordsString += `Here are your most frequently missed words - \n`;

        for (var [word, value] of sortedWordMap) {
          console.log(word);
          if (value > 1) {
            wordsString += `${word}  has been answered incorrectly ${value} times\n`;
          } else {
            wordsString += `${word}  has been answered incorrectly ${value} time\n`;
          }
        }

        const file = new Blob([wordsString], {
          type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        element.download = "summary-file.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      });
  }

  componentDidMount() {
    const requestInfo = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/user?uid=" + this.context.uid, requestInfo)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          correct: data.success,
          incorrect: data.fail,
        });
      });
  }

  render() {
    const cardStyle = {
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      maxWidth: "500px",
      margin: "auto",
      marginTop: "20px",
      padding: "5px",
      textAlign: "center",
      fontFamily: "arial",
    };

    const titleStyle = {
      color: "grey",
      fontSize: "18px",
    };

    const imgStyle = {
      width: "40%",
      borderRadius: "50%",
      margin: "auto",
    };

    const headerStyle = {
      marginTop: "10px",
    };

    const buttonStyle = {
      fontSize: "15px",
      color: "#fff",
      lineHeight: "1.2",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      float: "left",
      margin: "10px",
      padding: "0 20px",
      width: "20%",
      height: "50px",
      borderRadius: "10px",
      background: "rgba(0, 0, 0, 0.2)",
      border: "none",
    };

    const paragraphStyle = {
      margin: "2px",
      textAlign: "left",
    };

    return (
      <div>
        <FixedNavbar />
        <div class="card" style={cardStyle}>
          <img src={this.context.photoURL} alt="Profile" style={imgStyle} />
          <h1 style={headerStyle}>{this.context.displayName}</h1>
          <p class="title" style={titleStyle}>
            {this.context.email}
          </p>
          <p style={paragraphStyle}>
            Total Answers: {this.state.correct + this.state.incorrect}
          </p>
          <p style={paragraphStyle}>
            Percent Correct:{" "}
            {this.state.correct !== 0
              ? Math.round(
                  (((this.state.correct + this.state.incorrect) /
                    this.state.correct) *
                    100) /
                    100
                ).toFixed(2)
              : 0}
            {"%"}
          </p>
          <div>
            <button style={buttonStyle} onClick={this.downloadSummary}>
              Download Summary
            </button>
            <button style={buttonStyle} onClick={this.downloadWords}>
              Download Words
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
