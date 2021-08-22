import React from "react";
import GeneralLayout from "../Layouts/GeneralLayout";

const LoginPage = () => {
  return (
      <React.Fragment>
        <GeneralLayout>

          <section className="hero is-medium is-info mt-4">
            <div className="hero-body">
              <div className="container">
                <p className="title">
                  Sign In
                </p>
                <p className="subtitle">
                  Please sign in!
                </p>
              </div>
            </div>
          </section>

        </GeneralLayout>
      </React.Fragment>
  );
};

export default LoginPage;
