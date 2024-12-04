import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StartGame = () => {
  const [question, setQuestion] = useState(null);
  const [solution, setSolution] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const [timer, setTimer] = useState(30); // Default for Easy
  const [difficulty, setDifficulty] = useState(null); // Null until the user selects a difficulty
  const [timeUp, setTimeUp] = useState(false); // State to check if time is up
  const [showQuitConfirmation, setShowQuitConfirmation] = useState(false); // State to control quit confirmation popup
  const [bestTime, setBestTime] = useState(null);
  const [guessCount, setGuessCount] = useState(0); // Add state for guess count

  const [score, setScore] = useState(0);

  const apiEndpoint = "https://marcconrad.com/uob/banana/api.php";
  const navigate = useNavigate();

  useEffect(() => {
    if (difficulty === "easy") {
      setTimer(60);
    } else if (difficulty === "medium") {
      setTimer(30);
    } else if (difficulty === "hard") {
      setTimer(15);
    }
  }, [difficulty]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setQuestion(response.data.question);
      setSolution(response.data.solution);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (difficulty) {
      fetchQuestion();
    }
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !gameFinished && difficulty) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setFeedback("Time's up! Try again!");
      setTimeUp(true);
      setGameFinished(true);
    }

    return () => clearInterval(interval);
  }, [timer, gameFinished, difficulty]);

  const handleAnswerCheck = async () => {
    if (parseInt(userAnswer) === solution) {
      setFeedback(`🎉 Correct, You did it in ${bestTime}s! 🎉`);
      setGameFinished(true);

      const newScore = score + 1;
      setScore(newScore);

      // Assuming you have a token stored in localStorage or context
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("userDetails"));
      const userId = user ? user._id : null;

      console.log("Token:", token);
      console.log("UserId:", userId);

      // Ensure userId and token are available
      if (!userId || !token) {
        toast.error("User not authenticated. Please log in.");
        return; // Early return if no userId or token
      }

      // Send the updated score to the backend with the authorization token
      try {
        await axios.post(
          "http://localhost:8000/api/score",
          {
            userId,
            score: newScore, // Send the updated score
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token in the headers
            },
          }
        );
      } catch (error) {
        toast.error("Error saving score! Please try again.");
      }

      setTimeout(() => {
        fetchQuestion(); // Reload the game after a short delay
      }, 1500);

      if (bestTime === null || timer < bestTime) {
        setBestTime(timer);
      }
    } else {
      setFeedback("Incorrect, try again!");
      setGuessCount((prevCount) => {
        const newCount = prevCount + 1;

        if (newCount === 5) {
          // Updated to 5 as it should be the 5th guess to end the game
          setFeedback("Game Over! You've reached the maximum guesses.");
          setGameFinished(true); // End the game if the user reaches 5 guesses
        }

        return newCount;
      });
    }
  };

  const handlePlayAgain = () => {
    // Reset the game state
    setGameFinished(false);
    setUserAnswer("");
    setFeedback("");
    setTimer(difficulty === "easy" ? 60 : difficulty === "medium" ? 30 : 15);
    setGuessCount(0); // Reset the guess count
    setLoading(true);

    // Fetch new question after the game reset
    setTimeout(() => {
      const fetchQuestion = async () => {
        try {
          const response = await axios.get(apiEndpoint);
          setQuestion(response.data.question);
          setSolution(response.data.solution);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      };
      fetchQuestion();
    }, 500);
  };

  const handleNo = () => {
    // Navigate to the homepage when "No" is clicked
    navigate("/home"); // or window.location.href = "/"; if not using React Router
  };

  const handleQuit = () => {
    // Show the quit confirmation popup
    setShowQuitConfirmation(true);
  };

  const confirmQuit = () => {
    // Navigate to the homepage when confirmed
    navigate("/home");
  };

  const cancelQuit = () => {
    // Hide the quit confirmation popup
    setShowQuitConfirmation(false);
  };

  if (!difficulty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h2 className="text-4xl text-white font-bold mb-12">
          Choose Your Difficulty
        </h2>
        <div className="flex space-x-10">
          <div
            onClick={() => setDifficulty("easy")}
            className="bg-green-600 text-white p-8 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-2xl font-bold">Easy</h3>
            <p className="mt-2">For beginners to get started!!!</p>
          </div>
          <div
            onClick={() => setDifficulty("medium")}
            className="bg-yellow-600 text-white p-8 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-2xl font-bold">Medium</h3>
            <p className="mt-2">Challenging, but manageable!</p>
          </div>
          <div
            onClick={() => setDifficulty("hard")}
            className="bg-red-600 text-white p-8 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
          >
            <h3 className="text-2xl font-bold">Hard</h3>
            <p className="mt-2">For experienced players!</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-blue-300">
        <div className="text-2xl font-semibold text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-300 to-blue-300">
      <header className="w-full bg-white shadow-md py-4">
        <h1 className="text-4xl font-bold text-center text-yellow-600">
          Banana Game
        </h1>
      </header>
      <main className="flex flex-col items-center flex-grow p-4">
        <div className="w-full max-w-3xl bg-white bg-opacity-90 rounded-lg shadow-lg p-6 my-8">
          <h2 className="text-3xl font-semibold text-center text-yellow-700 mb-6">
            🍌 Welcome to the Banana Game! 🍌
          </h2>
          {question && (
            <div className="flex justify-center mb-6">
              <img
                src={question}
                alt="Banana Game Question"
                className="w-full h-auto rounded-lg shadow-md transform transition duration-300 hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="🍌 Enter your answer"
              className="w-full max-w-md h-12 px-4 py-2 mb-4 border-2 border-yellow-500 rounded-lg text-center text-yellow-900 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleAnswerCheck}
              className="w-full max-w-md bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-yellow-400 transform transition duration-200"
            >
              🍌 Check Answer 🍌
            </button>
            {feedback && (
              <div
                className={`mt-4 text-lg font-semibold animate-pulse ${
                  feedback === "Correct!" ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </div>
            )}
            <div className="mt-4 text-xl font-bold">
              Time Remaining: {timer}s
            </div>
            <div className="mt-4 text-xl font-bold">
              Guesses Remaining: {5 - guessCount}
            </div>
          </div>
        </div>
        <button
          onClick={handleQuit}
          className=" bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-400"
        >
          Quit
        </button>
      </main>

      {/* Modal Popup for "Play Again" or "Time's up" */}
      {gameFinished && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
            <h2 className="text-3xl font-semibold text-yellow-700 mb-4">
              {timeUp
                ? "Time's up! Try again?"
                : feedback.includes("Correct")
                ? `🎉 Correct, You did it in ${bestTime}s! 🎉`
                : feedback === "Game Over! You've reached the maximum guesses."
                ? feedback
                : "Incorrect, try again!"}
            </h2>
            <p className="text-xl mb-6">
              {timeUp ? "Try again?" : "Want to play again?"}
            </p>
            <button
              onClick={handlePlayAgain}
              className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-400 transform transition duration-200 mb-4"
            >
              Play Again
            </button>
            <button
              onClick={handleNo} // Call the handleNo function here
              className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-red-400 transform transition duration-200"
            >
              No
            </button>
          </div>
        </div>
      )}
      {/* Quit Confirmation Popup */}
      {showQuitConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg">
            <h2 className="text-3xl font-semibold text-yellow-700 mb-4">
              Are you sure you want to quit?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={confirmQuit}
                className="w-1/3 bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-400 transform transition duration-200"
              >
                Yes
              </button>
              <button
                onClick={cancelQuit}
                className="w-1/3 bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-400 transform transition duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-white shadow-md py-4">
        <p className="text-center text-gray-600">
          &copy; 2024 Banana Game. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default StartGame;
