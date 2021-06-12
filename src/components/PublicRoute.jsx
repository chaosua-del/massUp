import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import authSelectors from "../redux/auth/authSelectors";

function PublicRoute({
  component: Component,
  redirect: redirectRoute,
  isLoggedIn,
  ...routeProps
}) {
  console.log("public", isLoggedIn);
  return (
    <Route
      {...routeProps}
      render={(props) => {
        return isLoggedIn ? <Redirect to={redirectRoute} /> : <Component />;
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: authSelectors.isLoggedIn(state),
  };
};

export default connect(mapStateToProps)(PublicRoute);
