import React, { Component } from "react";

export class Audio extends Component {
  render() {
    return (
      <div>
        <audio controls>
          <source src="/media" type="audio/ogg" />
        </audio>
      </div>
    );
  }
}

export default Audio;
