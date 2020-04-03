import React, { Component } from "react";

export class Definition extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, definition: this.props.definition };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.show !== nextProps.show ||
      this.state.definition !== nextProps.definition
    ) {
      this.setState({
        show: nextProps.show,
        definition: nextProps.definition
      });
    }
  }

  render() {
    const style = {
      width: "100%",
      textAlign: "center",
      fontSize: "30px"
    };
    return (
      <div style={style}>
        {this.state.show && <p>{this.state.definition}</p>}
      </div>
    );
  }
}

export default Definition;
