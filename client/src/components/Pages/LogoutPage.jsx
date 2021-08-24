import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import GeneralLayout from "../Layouts/GeneralLayout";
import { USER_LOGIN } from "../graphql/mutations";
import { messages } from "../languages";
import { useAuth } from "../auth";

const LogoutPage = () => {
  const auth = useAuth();
  const history = useHistory();

  auth.signin(token, user, () => {
    history.push("/profile");
  });

  return (
      <React.Fragment>
        ...
      </React.Fragment>
  );
};

export default LogoutPage;
