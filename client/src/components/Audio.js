import React, { Component } from "react";

export class Audio extends Component {
  render() {
    return (
      <div>
        <audio controls ref="audio">
          <source src="https://raw.githubusercontent.com/maxengel99/khmer-anki-automation/master/files/words/ក្តៅ.mp3" />
        </audio>
      </div>
    );
  }
}

export default Audio;
