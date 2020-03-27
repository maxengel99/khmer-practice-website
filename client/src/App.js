import React from "react";
import "./App.css";

import FixedNavbar from "./components/FixedNavbar";
import QuizArea from "./components/QuizArea";

function App() {
  return (
    <div className="App">
      <FixedNavbar />
      <QuizArea />
    </div>
  );
}

export default App;
