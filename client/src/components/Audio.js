import React, { Component } from "react";

export class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `/media?word=${this.props.word}`,
      word: this.props.word
    };
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
          this.refs.audio.play();
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
              "https://kheng.info/static/dictionary/audio/" +
              this.props.word +
              ".mp3"
            }
            type="audio/ogg"
          />
        </audio>
      </div>
    );
  }
}

export default Audio;
