import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/Pages/HomePage";
import RegisterPage from "./components/Pages/RegisterPage";
import LoginPage from "./components/Pages/LoginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <RegisterPage/>
        </Route>
        <Route path="/signin">
          <LoginPage/>
        </Route>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
