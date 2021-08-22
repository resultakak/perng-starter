import React from "react";
import GeneralLayout from "../Layouts/GeneralLayout";

const RegisterPage = () => {
  const [fields, setFields] = React.useState({});
  const [completed, setCompleted] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const changeField = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });

    if (fields.name && fields.surname) {
      setCompleted(true);
    }
  };

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

          <section className="section mt-4">
            <div className="container">
              <div className="columns">
                <div className="column is-6 is-offset-3">

                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input name="name" type="text" className="input"
                               onChange={changeField} placeholder="Name" required={true} />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Surname</label>
                      <div className="control">
                        <input name="surname" type="text" className="input"
                               onChange={changeField} placeholder="Surname" required={true} />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">E-mail</label>
                      <div className="control">
                        <input name="email" type="email" className="input"
                               onChange={changeField} placeholder="E-mail" required={true} />
                      </div>
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link"
                                disabled={!completed}>Submit
                        </button>
                      </div>
                      <div className="control">
                        <button className="button is-link is-light">Cancel
                        </button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </section>

        </GeneralLayout>
      </React.Fragment>
  );
};

export default RegisterPage;
