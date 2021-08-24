import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import GeneralLayout from "../Layouts/GeneralLayout";
import { messages, errorMessages } from "../languages";
import { PROFILE } from "../graphql/queries";
import { USER_REGISTER } from "../graphql/mutations";

const ProfilePage = () => {
  const [fields, setFields] = React.useState({email: "", name: "", surname: ""});
  const [notification, setNotification] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  const { loading } = useQuery(PROFILE, {
    onCompleted({ me }) {
      if (loading === false && me) {
        setFields({ ...me });
      }
    },
    onError(err) {
      setNotification({
        type: "danger",
        message: "Error",
        description: err.message,
      });
    },
  });

  const [registerUser] = useMutation(USER_REGISTER, {
    onCompleted({ registerUser }) {
      console.log("registerUser", registerUser);
      setCompleted(true);
      setNotification({
        type: "success",
        message: "Success",
        description: messages.SUCCESSFULL,
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

    if (fields.repassword !== fields.password) {
      setNotification({
        type: "danger",
        message: "Error",
        description: errorMessages.INVALID_REPASSWORD,
      });
      return;
    }

    if (completed === false && fields !== false) {
      setCompleted(true);

      const input = {
        name: fields.name,
        surname: fields.surname
      };

      registerUser({ variables: { "input": input } });
    }
  };

  const changeField = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });

    setCompleted(false);
  };

  return (
      <React.Fragment>
        <GeneralLayout>

          <section className="hero is-small is-light mt-4">
            <div className="hero-body">
              <div className="container">
                <p className="title">
                  Profile
                </p>
                <p className="subtitle">
                  Update your profile!
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
                               value={fields.email}
                               disabled={true}
                               required={true}/>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input name="name"
                               type="text"
                               className="input"
                               onChange={changeField}
                               placeholder="Name"
                               value={fields.name}
                               required={true}/>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Surname</label>
                      <div className="control">
                        <input name="surname"
                               type="text"
                               className="input"
                               onChange={changeField}
                               placeholder="Surname"
                               value={fields.surname}
                               required={true}/>
                      </div>
                    </div>

                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link" disabled={completed}>
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

export default ProfilePage;
