import React, { useState, useEffect } from "react";
import "./Forms.css";

const VotingForm = () => {
  const [formDescriptions, setFormDescriptions] = useState([]);
  const [formType, setFormType] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  // Load form descriptions from JSON
  useEffect(() => {
    import("../formDescriptions.json")
      .then((module) => {
        console.log("Loaded form descriptions:", module.default); // Debugging
        setFormDescriptions(module.default);
      })
      .catch((error) => {
        console.error("Failed to load form descriptions:", error);
      });
  }, []);

  // Handle form selection and display description
  const handleFormSelection = (form) => {
    setFormType(form);
    const description = formDescriptions.find((item) => item.formType === form)?.description;
    setSelectedDescription(description || "No description available.");
  };

  // Handle vote submission
  const handleVote = async (e) => {
    e.preventDefault();

    if (!formType) {
      alert("Please select a form!");
      return;
    }

    try {
      const response = await fetch("https://aether-top-forms-leaderboard.onrender.com//api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formType }),
      });

      if (response.ok) {
        alert(`Vote submitted for ${formType}`);
      } else {
        console.error("Error submitting vote:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div>
      <form className="container-form" onSubmit={handleVote}>
      {formDescriptions.map((form) => (
  <div className="cont-label" key={form.formType}>
    <label>
      <input
        type="radio"
        name="form"
        value={form.formType}
        onChange={(e) => handleFormSelection(e.target.value)}
      />
      {form.formType}
    </label>
  </div>
))}
        <button className="btn-cont" type="submit">Submit Vote</button>
      </form>

      {selectedDescription && (
        <div>
          <h3>Form Description:</h3>
          <p>{selectedDescription}</p>
        </div>
      )}
    </div>
  );
};

export default VotingForm;
