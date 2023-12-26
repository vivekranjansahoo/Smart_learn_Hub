import React, { useState } from "react";

const CourseForm = ({ onRecommendation }) => {
  const [input, setInput] = useState("");

  const getRecommendations = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict_courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ html_css_input: input }),
      });

      const data = await response.json();
      onRecommendation(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <label htmlFor="userInput">Enter your HTML and CSS description:</label>
      <input
        type="text"
        id="userInput"
        name="userInput"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={getRecommendations}>Get Recommendations</button>
    </div>
  );
};

export default CourseForm;
