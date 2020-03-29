import React from "react";
import "./App.css";
import Auth0NavBar from "./components/Auth0NavBar";
import { useAuth0 } from "./auth0/react-auth0-spa";
import FixedNavbar from "./components/FixedNavbar";
import QuizArea from "./components/QuizArea";
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./auth0/history";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <Auth0NavBar />
        </header>
        <Switch>
          <Route path="/" exact />
          <PrivateRoute path="/profile" component={QuizArea} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
