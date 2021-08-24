import React, { useState } from "react";
import Logo from "./Logo";
import { Link, useHistory } from "react-router-dom";
import Container from "../core/Container";
import { useAuth } from "../auth";

const NavbarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const auth = useAuth();
  const history = useHistory();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const signout = () => {
    auth.signout(() => {
      history.push("/signin");
    });
  };

  return (
      <Container>
        <nav className="navbar" role="navigation" aria-label="main navigation">

          <div className="navbar-brand">
            <Logo/>
            <a href="#menu" onClick={onCollapse} role="button"
               className={collapsed
                   ? "navbar-burger is-active"
                   : "navbar-burger"} aria-label="menu"
               aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className={collapsed
              ? "navbar-menu is-active"
              : "navbar-menu"}>

            <div className="navbar-start">
              <Link to="/" className="navbar-item">Home</Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <a href="#more" className="navbar-link">
                  More
                </a>

                <div className="navbar-dropdown">
                  <a href="#about" className="navbar-item">
                    About
                  </a>
                  <a href="#jobs" className="navbar-item">
                    Jobs
                  </a>
                  <a href="#contact" className="navbar-item">
                    Contact
                  </a>
                  <hr className="navbar-divider"/>
                  <a href="#issue" className="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div>

            </div>


            <div className="navbar-end">

              {auth.isAuthenticated() ? (
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a href="#more" className="navbar-link">
                      {auth?.user ? auth?.user?.name : ("guest")}
                    </a>
                    <div className="navbar-dropdown">
                      <Link to="/profile" className="navbar-item">
                        Profile
                      </Link>
                      <hr className="navbar-divider"/>
                      <a href="#signout" onClick={signout} className="navbar-item">
                        Sign Out
                      </a>
                    </div>
                  </div>
              ) : (
                  <div className="navbar-item">
                    <div className="buttons">
                      <Link to="/signup" className="button is-primary">
                        <strong>Sign up</strong>
                      </Link>
                      <Link to="/signin" className="button is-light">
                        Log in
                      </Link>
                    </div>
                  </div>
              )}


            </div>

          </div>

        </nav>
      </Container>
  );
};

export default NavbarComponent;
