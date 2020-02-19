import "./App.css";
import React, { Component } from "react";
import Title from "./components/Title";
import socketIoClient from "socket.io-client";
import Chat from "./components/Chat";

const socket = socketIoClient("http://localhost:3000");

class App extends Component {
  state = { user: "", input: "", count: 0 };

  componentDidMount() {
    let count = 0;
    socket.on("join event", num => {
      count++;
      this.setState({ count });
    });
    socket.on("leave event", num => {
      count--;
      this.setState({ count });
    });
  }

  handleChange = event => {
    const input = event.target.value;
    this.setState({ input: input });
  };

  handleClick = event => {
    event.preventDefault();
    this.setState({ user: this.state.input, input: "" });
  };

  render() {
    const { user, count } = this.state;
    return (
      <section>
        <div>
          <Title user={user} clientCount={count} />
        </div>
        {this.state.user === "" && (
          <form onSubmit={this.handleClick}>
            <input
              type="text"
              placeholder="Enter username"
              required
              onChange={this.handleChange}
            ></input>
            <button>Log in</button>
          </form>
        )}
        <Chat username={user} />
      </section>
    );
  }
}

export default App;
