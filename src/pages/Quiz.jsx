// src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizById, submitQuizAnswers } from "../services/quizService";
import Loader from "../components/Loader";

export default function Quiz() {
  const { id } = useParams(); // quiz id from route
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  // Fetch quiz
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuizById(id);
        setQuiz(data);
        setTimeLeft(data.duration * 60); // convert minutes to seconds
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    try {
      await submitQuizAnswers(id, answers);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;

  if (!quiz) return <p className="text-center mt-10">Quiz not found.</p>;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
          <span className="text-gray-600 font-mono">
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>
        <p className="text-gray-600 mb-6">{quiz.description}</p>

        {/* Questions */}
        {quiz.questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <p className="font-medium text-gray-800">
              {index + 1}. {q.question}
            </p>
            <div className="mt-2 space-y-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    className="form-radio h-4 w-4 text-blue-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
