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
import styles from "./App.css";
import WaitList from "./components/WaitList/WaitList";

class App extends Component {
  componentWillMount() {
    this.props.checkSession();
  }

  render() {
    const { auth } = this.props;
    if (auth === null) {
      return (
        <div className={styles.Wrapper}>
          <div className={styles.SpinnerContainer}>
            <PropagateLoader color={"#123abc"} loading={true} />
          </div>
        </div>
      );
    } else {
      return (
        <MuiThemeProvider>
          <div>
            <BrowserRouter>
              <div className={styles.Wrapper}>
                <Header />
                <div className={styles.SpinnerContainer}>
                  <PropagateLoader
                    color={"#123abc"}
                    loading={this.props.progress > 0}
                  />
                </div>
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
                    <Route path="/wait-list" component={WaitList} />
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
