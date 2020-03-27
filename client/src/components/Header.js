import React, { Component } from "react";

export class Header extends Component {
  componentDidMount() {
    fetch("/api/getList")
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    return <div>Max</div>;
  }
}

export default Header;
