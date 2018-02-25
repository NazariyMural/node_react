import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Store from "./components/Store/Store";
import Header from "./components/Header/Header";
import Surveys from "./components/Surveys/Surveys";
import SurveysNew from "./components/Surveys/SurveysNew/SurveysNew";
import { connect } from "react-redux";
import * as actions from "./actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    // this.props.fetchData();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/surveys/new" component={SurveysNew} />
              <Route path="/store" component={Store} />
              <Route path="/surveys" component={Surveys} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
