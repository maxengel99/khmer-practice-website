import React from "react";
import Navbar from "react-bootstrap/Navbar";

function FixedNavbar() {
  return (
    <div>
      <Navbar fixed="top" bg="light" variant="light">
        <Navbar.Brand>Learn Khmer!</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <b>Max</b>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default FixedNavbar;
