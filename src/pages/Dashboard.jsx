// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserQuizzes } from "../services/quizService";
import QuizCard from "../components/QuizCard";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchUserQuizzes(user?.id);
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) loadQuizzes();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here are your available quizzes and challenges.
        </p>

        {quizzes.length === 0 ? (
          <p className="mt-6 text-gray-500 text-center">
            No quizzes available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                description={quiz.description}
                difficulty={quiz.difficulty}
                duration={quiz.duration}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
