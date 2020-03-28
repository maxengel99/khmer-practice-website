import React, { Component } from "react";
import Audio from "./Audio";
import TextInput from "./TextInput";
import { WordsArray } from "../word-list";

export class QuizArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: WordsArray[Math.floor(Math.random() * WordsArray.length)],
      answer: false,
      correct: null
    };
    this.updateWord = this.updateWord.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  updateWord() {
    this.setState({
      word: WordsArray[Math.floor(Math.random() * WordsArray.length)]
    });
  }

  handleAnswer = answerValue => {
    this.setState({ answer: true, correct: answerValue });
    console.log(answerValue.answerValue);
  };

  render() {
    return (
      <div>
        <Audio word={this.state.word} />
        <TextInput onSubmitAnswer={this.handleAnswer} word={this.state.word} />
      </div>
    );
  }
}

export default QuizArea;
