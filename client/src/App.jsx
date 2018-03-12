import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Store from "./components/Store/Store";
import Header from "./components/Header/Header";
import Login from "./components/Auth/Login/LogIn";
import Registration from "./components/Auth/Registration/RegistrationContainer";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { PropagateLoader } from "react-spinners";
import { checkSession, fetchUser } from "./actions";

class App extends Component {
  componentWillMount() {
    this.props.checkSession();
  }
  render() {
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
              <div>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/account" component={Account} />
                  <Route path="/register" component={Registration} />
                  <Route path="/" component={Store} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ auth, progress }) => {
  return { auth, progress };
};

export default connect(mapStateToProps, { checkSession, fetchUser })(App);
