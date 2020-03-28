import React, { Component } from "react";

export class CorrectAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, correctAnswer: this.props.correctAnswer };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.show !== nextProps.show ||
      this.state.correctAnswer !== nextProps.correctAnswer
    ) {
      this.setState({
        show: nextProps.show,
        correctAnswer: nextProps.correctAnswer
      });
    }
  }

  render() {
    const style = {
      width: "100%",
      textAlign: "center",
      fontSize: "30px"
    };
    return (
      <div style={style}>
        {this.state.show && <p>{this.state.correctAnswer}</p>}
      </div>
    );
  }
}

export default CorrectAnswer;
