import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import NavUser from "../../Components/Header/NavUser/NavUser";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [level, setlevel] = useState("");

  const fetchNextQuestion = () => {
    axios
      .get("http://127.0.0.1:5000/generate_mcq")
      .then((response) => {
        const { question, choices, correct_answer } = response.data;
        setQuestion(question);
        setChoices(choices);
        setCorrectAnswer(correct_answer);
      })
      .catch((error) => console.error("Error fetching question:", error));
  };

  const handleAnswer = () => {
    if (!userAnswer) {
      alert("Please select an answer");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/check_answer", {
        user_answer: userAnswer,
        correct_answer: correctAnswer,
      })
      .then((response) => {
        if (response.data.is_correct) {
          setScore((prevScore) => prevScore + 1);
        }
        setAnsweredQuestions((prevCount) => prevCount + 1);
        // Clear user's answer

        if (answeredQuestions + 1 === TOTAL_QUESTIONS) {
          setQuizEnded(true);
        }
      })
      .catch((error) => console.error("Error checking answer:", error));
  };

  useEffect(() => {
    if (!quizEnded) {
      fetchNextQuestion();
    } else {
      // Show final score or perform any other action
      if (score == 6) {
        setlevel("Advanced");
      }
      if (score >= 4 && score < 6) {
        setlevel("Intermediate");
      }
      if (score < 4) {
        setlevel("Beginner");
      }

      console.log("Final Score:", score);
    }
  }, [answeredQuestions, quizEnded, score]);

  const TOTAL_QUESTIONS = 6;

  return (
    <>
      <div>
        <NavUser />
        {!quizEnded ? (
          <>
            <h2>Generated MCQ:</h2>
            <p>{question}</p>
            <form>
              {choices.map((choice, index) => (
                <div key={index}>
                  <label htmlFor={`choice-${index}`}>
                    {String.fromCharCode(65 + index)}. {choice}
                  </label>
                </div>
              ))}
              <input
                type="text"
                style={{ border: "1px solid black" }}
                onChange={(e) => setUserAnswer(e.target.value)}
              />{" "}
              <br />
            </form>
            <button onClick={handleAnswer}>Submit Answer</button>
          </>
        ) : (
          <div>
            <h1>Final Score: {score}/6</h1>
            <h2>Your level is {level}</h2>
            <Link to={`/projects/HTML/${level}`}>
              <Button>Click Here For Project</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
