import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ProvideAuth, PrivateRoute } from "./components/auth";
import HomePage from "./components/Pages/HomePage";
import RegisterPage from "./components/Pages/RegisterPage";
import LoginPage from "./components/Pages/LoginPage";
import ProfilePage from "./components/Pages/ProfilePage";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/signup">
            <RegisterPage/>
          </Route>
          <Route path="/signin">
            <LoginPage/>
          </Route>
          <PrivateRoute path="/profile">
            <ProfilePage/>
          </PrivateRoute>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
