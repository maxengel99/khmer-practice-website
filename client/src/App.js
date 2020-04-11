import React, { useContext } from "react";
import "firebase/auth";
import "firebase/firestore";
import "./App.css";
import SignIn from "./components/SignIn";
import QuizArea from "./components/QuizArea";
import Profile from "./components/Profile";
import { UserContext } from "./providers/UserProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const user = useContext(UserContext);

  return user ? (
    <div className="App">
      <Router>
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
