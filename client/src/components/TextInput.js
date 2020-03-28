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
    const inputStyle = {
      width: "100%",
      height: "3em",
      lineHeight: "1em",
      fontSize: "1.5em",
      boxShadow: "3px 3px 0 #e1e1e1",
      boxSizing: "border-box",
      textAlign: "center"
    };

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
        />
      </div>
    );
  }
}

export default TextInput;
