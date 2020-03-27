import React, { Component } from "react";
import Audio from "./Audio";
import { WordsArray } from "../word-list";

export class QuizArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: WordsArray[Math.floor(Math.random() * WordsArray.length)]
    };
    this.updateWord = this.updateWord.bind(this);
  }

  updateWord() {
    this.setState({
      word: WordsArray[Math.floor(Math.random() * WordsArray.length)]
    });
  }

  render() {
    return (
      <div>
        <Audio word={this.state.word} />
      </div>
    );
  }
}

export default QuizArea;
