import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");

export default class Chat extends Component {
  state = {
    message: "",
    messages: []
  };

  componentDidMount() {
    socket.on("chat message", newMsg => {
      this.setState(currentState => {
        return { messages: [...currentState.messages, newMsg] };
      });
    });
  }

  componentDidUpdate() {}

  handleClick = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = subEvent => {
    subEvent.preventDefault();
    socket.emit("chat message", {
      message: this.state.message,
      user: socket.id,
      username: this.props.username
    });
    this.setState({ message: "" });
  };

  render() {
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.message} type="text" onChange={this.handleClick} />
          <button>Send</button>
          {this.state.messages.map((message, index) => {
            return (
              <p key={index}>
                <strong>{message.username}: </strong>
                {message.message}
              </p>
            );
          })}
        </form>
      </main>
    );
  }
}
