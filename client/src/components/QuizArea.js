import React, { Component } from "react";
import Audio from "./Audio";
import TextInput from "./TextInput";
import CorrectAnswer from "./CorrectAnswer";
import FixedNavbar from "./FixedNavbar";
import Definition from "./Definition";
import { WordsArray } from "../word-list";

const khmer_words = Object.keys(WordsArray);

export class QuizArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: khmer_words[parseInt(Math.random() * khmer_words.length)],
      didAnswer: false,
      correct: false,
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({
        word: khmer_words[parseInt(Math.random() * khmer_words.length)],
        didAnswer: false,
        correct: false,
      });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.didAnswer !== this.state.didAnswer) {
      if (this.state.didAnswer) {
        document.addEventListener("keydown", this.handleKeyDown);
      } else {
        document.removeEventListener("keydown", this.handleKeyDown);
      }
    }
  }

  handleAnswer = (answerValue) => {
    console.log(answerValue.answerInput);
    this.setState({ didAnswer: true, correct: answerValue.answerValue });

    let requestInfo = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    if (answerValue.answerValue) {
      requestInfo["body"] = JSON.stringify({
        uid: this.props.uid,
        success: true,
        word: this.state.word,
        answer: answerValue.answerInput,
      });
    } else {
      requestInfo["body"] = JSON.stringify({
        uid: this.props.uid,
        word: this.state.word,
        success: false,
        answer: answerValue.answerInput,
      });
    }

    fetch(
      "https://us-central1-khmer-practice-website.cloudfunctions.net/app/answer",
      requestInfo
    ).then((response) => console.log(response));
  };

  render() {
    return (
      <div>
        <FixedNavbar />
        <Audio word={this.state.word} />
        <TextInput
          onSubmitAnswer={this.handleAnswer}
          word={this.state.word}
          disabled={this.state.didAnswer}
          correct={this.state.correct}
        />
        <CorrectAnswer
          show={this.state.didAnswer && !this.state.correct}
          correctAnswer={this.state.word}
        />
        <Definition
          show={this.state.didAnswer}
          definition={WordsArray[this.state.word]}
        />
      </div>
    );
  }
}

export default QuizArea;
