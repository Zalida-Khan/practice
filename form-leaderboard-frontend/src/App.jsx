import React from "react";
import VotingForm from "./components/VotingForm";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Aether Forms</h1>
      <div className="forms-cont">
      <VotingForm />
      <hr />
      <Leaderboard />
      </div>
    </div>
  );
}

export default App;
