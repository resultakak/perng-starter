import React from "react";
import GeneralLayout from "../Layouts/GeneralLayout";
import Container from "../core/Container";
import Hero from "../core/Hero";

const RegisterPage = () => {
  return (
      <React.Fragment>
        <GeneralLayout>

          <section className="hero is-medium is-light mt-4">
            <div className="hero-body">
              <div className="container">
                <p className="title">
                  Sign Up
                </p>
                <p className="subtitle">
                  Please sign up!
                </p>
              </div>
            </div>
          </section>

        </GeneralLayout>
      </React.Fragment>
  );
};

export default RegisterPage;
