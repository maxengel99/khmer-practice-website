import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "../auth0/react-auth0-spa";
import Popup from "reactjs-popup";
import Button from "react-bootstrap/Button";

const FixedNavbar = () => {
  const { user, logout } = useAuth0();

  const imgStyle = {
    margin: "5px",
    borderRadius: "50%"
  };

  const modalStyle = {
    fontSize: "12px"
  };

  const closeStyle = {
    cursor: "pointer",
    position: "absolute",
    display: "block",
    padding: "2px 5px",
    lineHeight: "20px",
    right: "-10px",
    top: "-10px",
    fontSize: "24px",
    background: "#ffffff",
    borderRadius: "18px",
    border: "1px solid #cfcece"
  };

  const headerStyle = {
    width: "100%",
    borderBottom: "1px solid gray",
    fontSize: "18px",
    textAlign: "center",
    padding: "5px"
  };

  const actionsStyle = {
    width: "100%",
    padding: "10px 5px",
    margin: "auto",
    textAlign: "center"
  };

  const buttonStyle = {
    margin: "10px"
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Learn Khmer!</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:
            <Popup trigger={<b> {user.name}</b>} modal position="top right">
              {close => (
                <div style={modalStyle}>
                  <a style={closeStyle} onClick={close}>
                    &times;
                  </a>
                  <div style={headerStyle}>Would you like to logout?</div>
                  <div style={actionsStyle}>
                    <Button
                      style={buttonStyle}
                      variant="secondary"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      style={buttonStyle}
                      variant="secondary"
                      onClick={() => {
                        close();
                      }}
                    >
                      No
                    </Button>
                  </div>
                </div>
              )}
            </Popup>
          </Navbar.Text>
          <Navbar.Brand>
            <img
              src={user.picture}
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
