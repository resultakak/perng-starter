import React, { useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Container from "../core/Container";

const NavbarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
      <Container>
        <nav className="navbar" role="navigation" aria-label="main navigation">

          <div className="navbar-brand">
            <Logo/>
            <a href="#" onClick={onCollapse} role="button" className={collapsed
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
                <a href="#" className="navbar-link">
                  More
                </a>

                <div className="navbar-dropdown">
                  <a href="#" className="navbar-item">
                    About
                  </a>
                  <a href="#" className="navbar-item">
                    Jobs
                  </a>
                  <a href="#" className="navbar-item">
                    Contact
                  </a>
                  <hr className="navbar-divider"/>
                  <a href="#" className="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div>

            </div>



            <div className="navbar-end">

              <div className="navbar-item has-dropdown is-hoverable">
                <a href="#" className="navbar-link">
                  More
                </a>

                <div className="navbar-dropdown">
                  <a href="#" className="navbar-item">
                    About
                  </a>
                  <a href="#" className="navbar-item">
                    Jobs
                  </a>
                  <a href="#" className="navbar-item">
                    Contact
                  </a>
                  <hr className="navbar-divider"/>
                  <a href="#" className="navbar-item">
                    Report an issue
                  </a>
                </div>
              </div>

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
            </div>

          </div>

        </nav>
      </Container>
  );
};

export default NavbarComponent;
