import React, { useContext } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import QuizArea from "./components/QuizArea";
import Profile from "./components/Profile";
import { UserContext } from "./providers/UserProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const user = useContext(UserContext);
  console.log(user);
  return user ? (
    <Router>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <QuizArea />
        </Route>
      </Switch>
    </Router>
  ) : (
    <SignIn />
  );
}

export default App;
