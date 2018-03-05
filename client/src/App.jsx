import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/Landing/Landing";
import Store from "./components/Store/Store";
import Header from "./components/Header/Header";
import EmailLogin from "./components/Auth/LogIn";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import { connect } from "react-redux";
import * as actions from "./actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { PropagateLoader } from "react-spinners";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    console.log(this.props.progress);
    return (
      <MuiThemeProvider>
        <div>
          <BrowserRouter>
            <div>
              <Header />
              {/* <div
                style={
                  this.props.progress > 0
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                Loading...
              </div> */}
              <PropagateLoader
                color={"#123abc"}
                loading={this.props.progress > 0}
              />
              <div className="container">
                <Switch>
                  <Route path="/cart" component={Cart} />
                  <Route path="/store" component={Store} />
                  <Route path="/account" component={Account} />
                  <Route path="/" component={EmailLogin} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ progress }) => {
  return { progress };
};

export default connect(mapStateToProps, actions)(App);
