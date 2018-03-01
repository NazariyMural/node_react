import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Store from "./components/Store/Store";
import Header from "./components/Header/Header";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import { connect } from "react-redux";
import * as actions from "./actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <BrowserRouter>
            <div>
              <Header />
              <div className="container">
                <Switch>
                  <Route path="/cart" component={Cart} />
                  <Route path="/store" component={Store} />
                  <Route path="/account" component={Account} />
                  <Route path="/" component={Landing} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
