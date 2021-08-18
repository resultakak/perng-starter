import React from "react";

import GeneralLayout from "../Layouts/GeneralLayout";

const HomePage = () => {
  return (
      <React.Fragment>
        <GeneralLayout>

          <section className="hero is-medium is-link mt-4">
            <div className="hero-body">
              <div className="container">
                <p className="title">
                  🚀 Ready!
                </p>
                <p className="subtitle">
                  Yeah...
                </p>
              </div>
            </div>
          </section>

        </GeneralLayout>
      </React.Fragment>
  );
};

export default HomePage;
