import React from "react";
import { signInWithRedirect } from "../providers/Firebase.js";

const SignIn = () => {
  const containerLogin = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    background: "#f2f2f2",
  };

  const wrapperStyle = {
    width: "390px",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "77px 55px 33px 55px",
    boxShadow: "0 5px 10px 0px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    display: "block",
    fontSize: "30px",
    color: "#333333",
    lineHeight: "1.2",
    textAlign: "center",
    paddingBottom: "26px",
  };

  const buttonWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: "13px",
  };

  const buttonStyle = {
    fontSize: "15px",
    color: "#fff",
    lineHeight: "1.2",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
    width: "100%",
    height: "50px",
    borderRadius: "50px",
    background:
      "-webkit-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff)",
    transition: "all 0.4s",
    border: "none",
  };

  return (
    <div style={containerLogin}>
      <div style={wrapperStyle}>
        <span style={titleStyle}>Welcome</span>
        <div style={buttonWrapperStyle}>
          <button style={buttonStyle} onClick={() => signInWithRedirect()}>
            login with gmail
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
