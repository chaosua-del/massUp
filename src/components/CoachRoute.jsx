import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import authSelectors from "../redux/auth/authSelectors";

function PublicRoute({
  component: Component,
  redirect: redirectRoute,
  isCoach,
  ...routeProps
}) {
  return (
    <Route
      {...routeProps}
      render={(props) => {
        return !isCoach ? (
          <Redirect to={redirectRoute} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isCoach: authSelectors.isCoach(state),
  };
};

export default connect(mapStateToProps)(PublicRoute);
