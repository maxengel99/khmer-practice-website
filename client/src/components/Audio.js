import React, { Component } from "react";

export class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `/media?word=${this.props.word}`,
      word: this.props.word
    };
  }

  componentDidMount() {
    console.log("new audio");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.word !== nextProps.word) {
      this.setState(
        {
          url: `/media?word=${nextProps.word}`
        },
        function() {
          this.refs.audio.pause();
          this.refs.audio.load();
        }
      );
    }
  }

  render() {
    const style = {
      backgroundColor: "#032EA1",
      height: "300px",
      padding: "100px",
      marginBottom: "50px"
    };

    return (
      <div style={style}>
        <audio controls ref="audio">
          <source src={this.state.url} type="audio/ogg" />
        </audio>
      </div>
    );
  }
}

export default Audio;
