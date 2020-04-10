import React, { Component } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../providers/Firebase";

export class Profile extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      incorrect: 0,
      savedWords: [],
    };
  }

  render() {
    const cardStyle = {
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      maxWidth: "500px",
      margin: "auto",
      marginTop: "20px",
      padding: "5px",
      textAlign: "center",
      fontFamily: "arial",
    };

    const titleStyle = {
      color: "grey",
      fontSize: "18px",
    };

    const imgStyle = {
      width: "40%",
      borderRadius: "50%",
      margin: "auto",
    };

    const headerStyle = {
      marginTop: "10px",
    };

    const buttonStyle = {
      fontSize: "15px",
      color: "#fff",
      lineHeight: "1.2",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      float: "right",
      margin: "10px",
      padding: "0 20px",
      width: "20%",
      height: "50px",
      borderRadius: "10px",
      background: "rgba(0, 0, 0, 0.2)",
      border: "none",
    };

    const paragraphStyle = {
      margin: "2px",
      textAlign: "left",
    };

    return (
      <div class="card" style={cardStyle}>
        <img src={this.context.photoURL} alt="Profile" style={imgStyle} />
        <h1 style={headerStyle}>{this.context.displayName}</h1>
        <p class="title" style={titleStyle}>
          {this.context.email}
        </p>
        <p style={paragraphStyle}>
          Total Answers: {this.state.correct + this.state.incorrect}
        </p>
        <p style={paragraphStyle}>
          Percent Correct:{" "}
          {this.state.correct !== 0
            ? (this.state.correct + this.state.incorrect) / this.state.correct
            : 0}
          {"%"}
        </p>
        <button
          style={buttonStyle}
          onClick={() => {
            auth.signOut();
            window.location.href = "/";
          }}
        >
          Sign out
        </button>
      </div>
    );
  }
}

export default Profile;
