import React from "react";
import { useAuth0 } from "../auth0/react-auth0-spa";

const Auth0NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const limiter = {
    width: "100%",
    margin: "0 auto"
  };

  const containerLogin = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    background: "#f2f2f2"
  };

  const wrapperStyle = {
    width: "390px",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    padding: "77px 55px 33px 55px",
    boxShadow: "0 5px 10px 0px rgba(0, 0, 0, 0.1)"
  };

  const titleStyle = {
    display: "block",
    fontSize: "30px",
    color: "#333333",
    lineHeight: "1.2",
    textAlign: "center",
    paddingBottom: "26px"
  };

  const buttonWrapperStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: "13px"
  };

  const loginWrapperStyle = {
    position: "absolute",
    zIndex: "-1",
    width: "300%",
    height: "100%",
    background: "#a64bf4",
    background:
      "-webkit-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff)",
    background: "-o-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff)",
    background:
      "-moz-linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff)",
    background: "linear-gradient(right, #21d4fd, #b721ff, #21d4fd, #b721ff)",
    top: "0",
    left: "-100%",
    transition: "all 0.4s"
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
    border: "none"
  };

  return (
    <div style={containerLogin}>
      <div style={wrapperStyle}>
        <span style={titleStyle}>Welcome</span>
        <div style={buttonWrapperStyle}>
          <button style={buttonStyle} onClick={() => loginWithRedirect({})}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth0NavBar;

//{isAuthenticated && <button onClick={() => logout()}>Log out</button>}
