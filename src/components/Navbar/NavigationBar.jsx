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
import config from "../../config";

function NavigationBar({ isLoggedIn, firstName, onLogOut, avatar, id }) {
  return (
    <Navbar bg="light" expand="lg" className="py-4 mb-5">
      <Container>
        <NavLink to={routes.home}>MassUp</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-center">
          {isLoggedIn ? (
            <div className="ml-auto d-flex align-items-center">
              <Link to={routes.myProfile} className="d-flex align-items-center">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    display: "flex",
                    marginRight: "10px",
                  }}
                >
                  <img
                    style={{ objectFit: "cover", maxWidth: "100%" }}
                    src={`${config.url}/uploads/${avatar}`}
                    alt="avatar"
                  />
                </div>
                <span className="mr-3" to={routes.myProfile}>
                  {firstName}
                </span>
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
    avatar: authSelectors.getAvatar(state),
    id: authSelectors.getId(state),
  };
};

export default connect(mapStateToProps, { onLogOut: authOperations.logOut })(
  NavigationBar
);
