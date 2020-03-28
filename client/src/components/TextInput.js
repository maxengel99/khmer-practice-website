import React, { Component } from "react";

export class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    console.log(this.props.word);
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
      backgroundColor: "#f03",
      opacity: "1"
    };

    let inputStyle;
    console.log(this.props);

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
