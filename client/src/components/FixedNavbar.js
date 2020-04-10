import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { UserContext } from "../providers/UserProvider";

const FixedNavbar = () => {
  const user = useContext(UserContext);

  const imgStyle = {
    margin: "10px",
    borderRadius: "50%",
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Learn Khmer!</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:{" "}
            <Link to="/profile">
              <b>{user.displayName}</b>
            </Link>
          </Navbar.Text>
          <Navbar.Brand>
            <img
              src={user.photoURL}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={imgStyle}
              alt="Profile"
            />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default FixedNavbar;
