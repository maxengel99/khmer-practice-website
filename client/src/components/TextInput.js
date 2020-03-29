import React, { Component } from "react";

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "", word: this.props.word };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  handleChange({ target }) {
    this.setState({ input: target.value });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      if (this.state.input === this.props.word) {
        this.props.onSubmitAnswer({ answerValue: true });
      } else {
        this.props.onSubmitAnswer({ answerValue: false });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.word !== this.state.word) {
      this.setState({
        input: "",
        word: nextProps.word
      });
    }
  }

  render() {
    const inputStyleBasic = {
      width: "100%",
      height: "3em",
      lineHeight: "1em",
      fontSize: "1.5em",
      boxShadow: "3px 3px 0 #e1e1e1",
      boxSizing: "border-box",
      textAlign: "center"
    };

    const inputStyleCorrect = {
      width: "100%",
      height: "3em",
      lineHeight: "1em",
      fontSize: "1.5em",
      boxShadow: "3px 3px 0 #e1e1e1",
      boxSizing: "border-box",
      textAlign: "center",
      transition: "backgroud-color 0.1s ease-in",
      backgroundColor: "#88cc00",
      opacity: "1"
    };

    const inputStyleWrong = {
      width: "100%",
      height: "3em",
      lineHeight: "1em",
      fontSize: "1.5em",
      boxShadow: "3px 3px 0 #e1e1e1",
      boxSizing: "border-box",
      textAlign: "center",
      transition: "backgroud-color 0.1s ease-in",
      backgroundColor: "#E00025",
      opacity: "1"
    };

    let inputStyle;

    if (!this.props.disabled) {
      inputStyle = inputStyleBasic;
    } else {
      if (this.props.correct) {
        inputStyle = inputStyleCorrect;
      } else {
        inputStyle = inputStyleWrong;
      }
    }

    const containerStyle = {
      padding: "10px"
    };

    return (
      <div className="form-group" style={containerStyle}>
        <input
          style={inputStyle}
          onKeyDown={this.keyPress}
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="ចម្លើយ"
          value={this.state.input}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

export default TextInput;
