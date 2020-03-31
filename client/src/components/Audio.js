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
    document.addEventListener("keydown", e => {
      if (e.keyCode === 32) {
        this.refs.audio.play();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", e => {
      if (e.keyCode === 32) {
        this.refs.audio.play();
      }
    });
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
          <source
            src={
              "https://firebasestorage.googleapis.com/v0/b/khmer-practice-website.appspot.com/o/" +
              this.props.word +
              ".mp3?alt=media"
            }
            type="audio/ogg"
          />
        </audio>
      </div>
    );
  }
}

export default Audio;
