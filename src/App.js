import "./App.css";
import React, { Component } from "react";
import Title from "./Components/Title";
import socketIoClient from "socket.io-client";
import Chat from "./Components/Chat";

const socket = socketIoClient("http://localhost:3000");

class App extends Component {
  state = { user: "", input: "", count: 0 };

  componentDidMount() {
    let count = 0;
    socket.on("join event", num => {
      count++;
      this.setState({ count });
      console.log(count, "join event receiebved");
    });
    socket.on("leave event", num => {
      count--;
      this.setState({ count });
      console.log(count, "leave event receiebved");
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
    return (
      <section>
        <div>
          <Title user={this.state.user} />
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
        <Chat username={this.state.user} />
      </section>
    );
  }
}

export default App;
