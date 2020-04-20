import React, { useContext } from "react";
import "firebase/auth";
import "firebase/firestore";
import "./App.css";
import SignIn from "./components/SignIn";
import QuizArea from "./components/QuizArea";
import Profile from "./components/Profile";
import { UserContext } from "./providers/UserProvider";
import { Router, Switch, Route } from "react-router-dom";
import history from "./providers/History";

function App() {
  const user = useContext(UserContext);

  if (window.sessionStorage.getItem("pending") == 1) {
    window.sessionStorage.setItem("pending", 0);
    return <div>Loading...</div>;
  }

  return user ? (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <QuizArea uid={user.uid} />
          </Route>
        </Switch>
      </Router>
    </div>
  ) : (
    <SignIn />
  );
}

export default App;
