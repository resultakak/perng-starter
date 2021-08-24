import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import GeneralLayout from "../Layouts/GeneralLayout";
import { USER_LOGIN } from "../graphql/mutations";
import { messages } from "../languages";
import { useAuth } from "../auth";

const LoginPage = () => {
  const auth = useAuth();
  const history = useHistory();

  const [fields, setFields] = React.useState();
  const [notification, setNotification] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  const [login] = useMutation(USER_LOGIN, {
    onCompleted({ login }) {
      setCompleted(true);
      const { token = false, user = false } = login;

      setNotification({
        type: "success",
        message: "Success",
        description: messages.SUCCESSFULL,
      });

      auth.signin(token, user, () => {
        history.push("/profile");
      });
    },
    onError(err) {
      setCompleted(false);
      setNotification({
        type: "danger",
        message: "Error",
        description: err.message,
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotification(false);

    if (completed === false) {
      setCompleted(true);

      const input = {
        email: fields.email,
        password: fields.password,
      };

      login({ variables: { "input": input } });
    }
  };

  const changeField = (e) => {
    const { name, value } = e.target;
    if(value) {
      setFields({
        ...fields,
        [name]: value,
      });
    }

    setCompleted(false);
  };

  return (
      <React.Fragment>
        <GeneralLayout>

          <section className="hero is-small is-light mt-4">
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

          <section className="section mt-4">
            <div className="container">
              <div className="columns">
                <div className="column is-6 is-offset-3">

                  {notification && (
                      <div className={`notification is-${notification.type}`}>
                        <button className="delete"
                                onClick={() => setNotification(false)}></button>
                        {notification.description}
                      </div>
                  )}

                  <form onSubmit={handleSubmit}>

                    <div className="field">
                      <label className="label">E-mail</label>
                      <div className="control">
                        <input name="email"
                               type="email"
                               className="input"
                               onChange={changeField}
                               placeholder="E-mail"
                               required={true}/>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input name="password"
                               type="password"
                               className="input"
                               onChange={changeField}
                               placeholder="Password"
                               required={true}/>
                      </div>
                    </div>

                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link"
                                disabled={completed}>
                          Submit
                        </button>
                      </div>
                      <div className="control">
                        <button className="button is-link is-light">
                          Cancel
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

export default LoginPage;
