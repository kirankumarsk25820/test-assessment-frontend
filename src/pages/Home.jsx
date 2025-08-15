// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center px-4">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">
        Welcome to Pushpagiri Assessment Platform
      </h1>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl">
        Test your skills with our quizzes and coding challenges. Designed for
        learners, professionals, and recruiters to evaluate and improve
        knowledge.
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/quiz"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Take a Quiz
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {/* Footer Note */}
      <p className="mt-8 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Pushpagiri Technology — Design, Develop,
        and Innovate Solutions.
      </p>
    </div>
  );
}
