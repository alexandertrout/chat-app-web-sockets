import "./App.css";
import React, { Component } from "react";
import Title from "./Components/Title";

class App extends Component {
  state = { user: "", input: "" };

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
      </section>
    );
  }
}

export default App;
