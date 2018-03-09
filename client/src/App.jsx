import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Landing from "./components/Landing/Landing";
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
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Registration} />
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
