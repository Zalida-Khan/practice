import React, { useState } from "react";
import axios from "axios";
import "./Forms.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaderboardAndDescriptions = async () => {
    try {
      const { data: leaderboardData } = await axios.get(
        "https://aether-top-forms-leaderboard.onrender.com/api/votes/leaderboard"
      );

      const descriptionsModule = await import("../formDescriptions.json");
      const formDescriptions = descriptionsModule.default;

      const uniqueLeaderboardData = leaderboardData.reduce((acc, entry) => {
        if (!acc.some((item) => item._id === entry._id)) {
          acc.push(entry);
        }
        return acc;
      }, []);

      const combinedData = uniqueLeaderboardData.map((entry) => {
        const description = formDescriptions.find(
          (form) => form.formType === entry._id
        )?.description;
        return { ...entry, description: description || "No description available." };
      });

      setLeaderboard(combinedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching leaderboard or descriptions:", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="cont-leaderboard">
      <button onClick={fetchLeaderboardAndDescriptions}>View Leaderboard</button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h3>Leaderboard:</h3>
      <ul>
        {leaderboard.map((entry) => (
          <li key={entry._id}>
            <strong>{entry._id}</strong> ({entry.count} votes): {entry.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
