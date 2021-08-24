import React, { useContext, createContext, useState, useEffect } from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const authContext = createContext();

function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    if (!user?.email) {
      let localUser = JSON.parse(localStorage.getItem("user"));
      if (localStorage.getItem(AUTH_TOKEN) && localUser) {
        setUser(localUser);
      }
    }
  },[user]);

  const signin = (token, user, cb) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return cb();
  };

  const signout = cb => {
    localStorage.clear();
    setUser(null);
    return cb();
  };

  const isAuthenticated = () => {
    if (user && user?.email) {
      return true;
    }

    return false;
  };

  return {
    isAuthenticated,
    user,
    signin,
    signout,
  };
}

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

function useAuth() {
  return useContext(authContext);
}

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export { useAuth, PrivateRoute, ProvideAuth };
