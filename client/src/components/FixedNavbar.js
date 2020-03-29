import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "../auth0/react-auth0-spa";

const FixedNavbar = () => {
  const { user } = useAuth0();

  const imgStyle = {
    margin: "5px",
    borderRadius: "50%"
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Learn Khmer!</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <b>{user.name}</b>
          </Navbar.Text>
          <Navbar.Brand>
            <img
              src={user.picture}
              width="30"
              height="30"
              className="d-inline-block align-top"
              style={imgStyle}
            />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default FixedNavbar;
