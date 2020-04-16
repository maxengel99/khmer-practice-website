import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../providers/Firebase";

const FixedNavbar = () => {
  const user = useContext(UserContext);

  const imgStyle = {
    margin: "10px",
    borderRadius: "50%",
  };

  const buttonStyle = {
    fontSize: "15px",
    color: "#fff",
    lineHeight: "1.2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    float: "right",
    height: "30px",
    borderRadius: "10px",
    background: "rgba(0, 0, 0, 0.2)",
    border: "none",
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/practice">Learn Khmer!</Link>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <Link to="/profile">
              <b>{user.displayName}</b>
            </Link>
          </Navbar.Text>
          <Navbar.Text>
            <img
              src={user.photoURL}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={imgStyle}
              alt="Profile"
            />
          </Navbar.Text>
          <Navbar.Text>
            <button
              style={buttonStyle}
              onClick={() => {
                auth.signOut();
                window.location.href = "/";
              }}
            >
              Sign Out
            </button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default FixedNavbar;
