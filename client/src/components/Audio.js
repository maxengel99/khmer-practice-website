import React, { Component } from "react";

export class Audio extends Component {
  render() {
    const style = {
      backgroundColor: "#032EA1",
      height: "300px",
      padding: "100px",
      marginBottom: "50px"
    };

    return (
      <div style={style}>
        <audio controls>
          <source src={`/media?word=${this.props.word}`} type="audio/ogg" />
        </audio>
      </div>
    );
  }
}

export default Audio;
