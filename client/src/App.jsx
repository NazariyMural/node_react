import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Some from "./components/Some";
import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p>Hi, there</p>
        <a href="auth/google">SingIn with Google</a>

        <Switch>
          <Route path="/" component={Some} />
        </Switch>
      </div>
    );
  }
}

export default App;
