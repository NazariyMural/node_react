import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Store from "./components/Store/Store";
import Header from "./components/Header/Header";
import Login from "./components/Auth/Login/LogIn";
import Registration from "./components/Auth/Registration/RegistrationContainer";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import CompaRison from "./components/Сomparison/Сomparison";
import PurchaseHistoryItem from "./components/Notification/PurchaseHistory/PurchaseHistoryItems/PurchaseHistoryItem/PurchaseHistoryItem";
import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { PropagateLoader } from "react-spinners";
import { checkSession, getComparison } from "./actions";

class App extends Component {
  componentWillMount() {
    this.props.checkSession();
  }

  render() {
    const { auth } = this.props;
    if (auth === null) {
      return <PropagateLoader color={"#123abc"} loading={true} />;
    } else {
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
                    <Route
                      path="/account/purchase/:id"
                      component={PurchaseHistoryItem}
                    />
                    <Route path="/account" component={Account} />
                    <Route path="/register" component={Registration} />

                    <Route path="/compare" component={CompaRison} />
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
}

const mapStateToProps = ({ auth, progress }) => {
  return { auth, progress };
};

export default connect(mapStateToProps, {
  checkSession,
  getComparison
})(App);
