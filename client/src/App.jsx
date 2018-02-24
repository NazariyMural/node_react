import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Header from "./components/Header/Header";
import Surveys from "./components/Surveys/Surveys";
import SurveysNew from "./components/Surveys/SurveysNew/SurveysNew";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <p>Hi, there</p>

        <Switch>
          <Route path="/surveys/new" component={SurveysNew} />
          <Route path="/surveys" component={Surveys} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    );
  }
}

export default App;
