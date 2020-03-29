import React, { Component } from "react";

export class Home extends Component {
  render() {
    return (
      <div className="login-box">
        <a onClick={this.props.lock.show()}>Sign In</a>
      </div>
    );
  }
}

export default Home;
