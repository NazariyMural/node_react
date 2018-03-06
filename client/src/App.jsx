import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/Landing/Landing";
import Store from "./components/Store/Store";
import Header from "./components/Header/Header";
import EmailLogin from "./components/Auth/LogIn";
import Register from "./components/Auth/registerContainer";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import { connect } from "react-redux";
// import * as actions from "./actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { PropagateLoader } from "react-spinners";
import { checkSession, fetchUser } from "./actions";

class App extends Component {
  componentWillMount() {
    this.props.checkSession();
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
              <PropagateLoader
                color={"#123abc"}
                loading={this.props.progress > 0}
              />
              <div className="container">
                <Switch>
                  <Route path="/cart" component={Cart} />
                  <Route path="/store" component={Store} />
                  <Route path="/account" component={Account} />
                  <Route path="/login" component={EmailLogin} />
                  <Route path="/register" component={Register} />
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

export default connect(mapStateToProps, { checkSession, fetchUser })(App);
