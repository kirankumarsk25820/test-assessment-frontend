// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { fetchAllQuizzes, deleteQuiz } from "../services/quizService";
import { fetchAllCodingChallenges, deleteCodingChallenge } from "../services/codingService";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const [quizzes, setQuizzes] = useState([]);
  const [codingChallenges, setCodingChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    const loadData = async () => {
      try {
        const quizzesData = await fetchAllQuizzes();
        const codingData = await fetchAllCodingChallenges();
        setQuizzes(quizzesData);
        setCodingChallenges(codingData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleDeleteQuiz = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz(id);
      setQuizzes(quizzes.filter((q) => q.id !== id));
    }
  };

  const handleDeleteCoding = async (id) => {
    if (window.confirm("Are you sure you want to delete this challenge?")) {
      await deleteCodingChallenge(id);
      setCodingChallenges(codingChallenges.filter((c) => c.id !== id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

        {/* Quizzes Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Quizzes</h2>
            <Link
              to="/admin/create-quiz"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Create Quiz
            </Link>
          </div>
          {quizzes.length === 0 ? (
            <p className="text-gray-500">No quizzes available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-800">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm">{quiz.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <Link
                      to={`/admin/edit-quiz/${quiz.id}`}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coding Challenges Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Coding Challenges</h2>
            <Link
              to="/admin/create-coding"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Create Challenge
            </Link>
          </div>
          {codingChallenges.length === 0 ? (
            <p className="text-gray-500">No coding challenges available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {codingChallenges.map((c) => (
                <div key={c.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-800">{c.title}</h3>
                  <p className="text-gray-600 text-sm">{c.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <Link
                      to={`/admin/edit-coding/${c.id}`}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteCoding(c.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
