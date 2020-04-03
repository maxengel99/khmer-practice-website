import React, { Component } from "react";
import Audio from "./Audio";
import TextInput from "./TextInput";
import CorrectAnswer from "./CorrectAnswer";
import { WordsArray } from "../word-list2";
import FixedNavbar from "./FixedNavbar";

const khmer_words = Object.keys(WordsArray);

export class QuizArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: khmer_words[parseInt(Math.random() * khmer_words.length)],
      didAnswer: false,
      correct: false
    };
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  async componentDidMount() {
    let fixedEmail = this.props.user.email.replace(".", "-");
    await fetch("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fixedEmail,
        name: this.props.user.name
      })
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.setState({
        word: khmer_words[parseInt(Math.random() * khmer_words.length)],
        didAnswer: false,
        correct: false
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

  handleAnswer = answerValue => {
    this.setState({ didAnswer: true, correct: answerValue.answerValue });
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
      </div>
    );
  }
}

export default QuizArea;
