import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

import routes from "./routes";

import Home from "./views/Home/Home";
import LogIn from "./views/Auth/LogIn";
import Register from "./views/Auth/Register";
import NavigationBar from "./components/Navbar/NavigationBar";
import MyProfile from "./views/User/MyProfile";
import authOperations from "./redux/auth/authOperations";

class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <>
        <NavigationBar />

        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.logIn} component={LogIn} />
          <Route exact path={routes.register} component={Register} />
          <Route exact path={routes.myProfile} component={MyProfile} />
        </Switch>
      </>
    );
  }
}

export default connect(null, { getUser: authOperations.getCurrentUser })(App);
