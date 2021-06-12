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
import ShowRooms from "./views/Show/ShowRooms";
import ShowCoaches from "./views/Show/ShowCoaches";
import Room from "./views/Room/Room";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import CoachRoute from "./components/CoachRoute";

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

          <PublicRoute
            exact
            path={routes.logIn}
            component={LogIn}
            redirect={routes.myProfile}
          />
          <PublicRoute
            exact
            path={routes.register}
            component={Register}
            redirect={routes.myProfile}
          />
          <Route exact path={routes.profile + "/:id"} component={Profile} />
          <PrivateRoute
            exact
            path={routes.myProfile}
            component={MyProfile}
            redirect={routes.logIn}
          />
          <CoachRoute
            exact
            path={routes.createCourse}
            component={CreateCourse}
            redirect={routes.logIn}
          />
          <PrivateRoute
            exact
            path={routes.editProfile + "/:id"}
            component={EditProfile}
            redirect={routes.logIn}
          />
          <PrivateRoute
            path={routes.room + "/:id"}
            component={Room}
            redirect={routes.logIn}
          />
          <CoachRoute
            path={routes.createRoom + "/:id"}
            component={CreateRoom}
            redirect={routes.myProfile}
          />
          <CoachRoute
            path={routes.editCourse + "/:id"}
            component={EditCourse}
            redirect={routes.myProfile}
          />
          <Route path={routes.course + "/:id"} component={Course} />
          <Route path={routes.showRooms} component={ShowRooms} />
          <Route path={routes.showCoaches} component={ShowCoaches} />
        </Switch>

        {/* <Footer /> */}
      </>
    );
  }
}

export default connect(null, { getUser: authOperations.getCurrentUser })(App);
