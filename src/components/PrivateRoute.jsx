import React from "react";
import { Route, Redirect } from "react-router-dom";
import authSelectors from "../redux/auth/authSelectors";
import { connect } from "react-redux";

function PrivateRoute({
  component: Component,
  redirect: redirectRoute,
  isLoggedIn,
  ...routeProps
}) {
  return (
    <Route
      {...routeProps}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectRoute} />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: authSelectors.isLoggedIn(state),
  };
};

export default connect(mapStateToProps)(PrivateRoute);
