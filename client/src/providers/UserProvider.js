import React, { Component, createContext } from "react";
import { auth } from "./Firebase.js";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((userAuth) => {
      this.setState({ user: userAuth });
    });

    auth.getRedirectResult().then(function (result) {
      if (result.user !== null && result.additionalUserInfo.isNewUser) {
        console.log(result);
        const requestInfo = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            photoURL: result.user.photoURL,
          }),
        };
        fetch("/user", requestInfo)
          .then()
          .then((response) => console.log(response));
      }
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
