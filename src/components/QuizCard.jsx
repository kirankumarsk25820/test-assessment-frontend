// src/components/QuizCard.jsx
import { Link } from "react-router-dom";

export default function QuizCard({ title, description, difficulty, duration, id }) {
  const difficultyColors = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>

      {/* Difficulty & Duration */}
      <div className="flex justify-between items-center mt-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            difficultyColors[difficulty] || "bg-gray-100 text-gray-700"
          }`}
        >
          {difficulty}
        </span>
        <span className="text-xs text-gray-500">{duration} min</span>
      </div>

      {/* Start Quiz Button */}
      <Link
        to={`/quiz/${id}`}
        className="block mt-4 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Start Quiz
      </Link>
    </div>
  );
}
