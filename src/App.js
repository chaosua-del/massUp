import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

import routes from "./routes";

import Home from "./views/Home/Home";
import LogIn from "./views/Auth/LogIn";
import Register from "./views/Auth/Register";
import NavigationBar from "./components/Navbar/NavigationBar";
import Profile from "./views/User/Profile";
import MyProfile from "./views/User/MyProfile";
import authOperations from "./redux/auth/authOperations";
import CreateCourse from "./views/Create/CreateCourse";
import Course from "./views/Course/Course";
import EditCourse from "./views/Course/EditCourse";
import EditProfile from "./views/User/EditProfile";
import CreateRoom from "./views/Create/CreateRoom";
import Room from "./views/Room/Room";

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
          <Route exact path={routes.profile + "/:id"} component={Profile} />
          <Route exact path={routes.myProfile} component={MyProfile} />
          <Route exact path={routes.createCourse} component={CreateCourse} />
          <Route
            exact
            path={routes.editProfile + "/:id"}
            component={EditProfile}
          />
          <Route path={routes.room + "/:id"} component={Room} />
          <Route path={routes.createRoom + "/:id"} component={CreateRoom} />
          <Route path={routes.editCourse + "/:id"} component={EditCourse} />
          <Route path={routes.course + "/:id"} component={Course} />
        </Switch>
      </>
    );
  }
}

export default connect(null, { getUser: authOperations.getCurrentUser })(App);
