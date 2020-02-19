import React, { Component } from "react";

class Title extends Component {
  render() {
    return (
      <div>
        <h1>Instant Messaging Service</h1>
        <h2>Logged in as: {this.props.user}</h2>
      </div>
    );
  }
}

export default Title;
