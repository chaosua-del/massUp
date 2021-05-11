import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import routes from "../../routes";
import { connect } from "react-redux";
import authSelectors from "../../redux/auth/authSelectors";
import { Button } from "react-bootstrap";
import authOperations from "../../redux/auth/authOperations";

function NavigationBar({ isLoggedIn, firstName, onLogOut }) {
  return (
    <Navbar bg="light" expand="lg" className="py-4 mb-5">
      <Container>
        <NavLink to={routes.home}>MassUp</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-center">
          {isLoggedIn ? (
            <div className="ml-auto">
              <Link className="mr-3" to={routes.myProfile}>
                {firstName}
              </Link>
              <Button onClick={onLogOut} variant="dark">
                Log Out
              </Button>
            </div>
          ) : (
            <Nav className="ml-auto">
              <NavLink className="mr-3" to="/logIn">
                LogIn
              </NavLink>
              <NavLink to="/register">Register</NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: authSelectors.isLoggedIn(state),
    firstName: authSelectors.getUsername(state),
  };
};

export default connect(mapStateToProps, { onLogOut: authOperations.logOut })(
  NavigationBar
);
