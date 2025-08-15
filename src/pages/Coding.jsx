// src/pages/Coding.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCodingChallenge, submitCodingSolution } from "../services/codingService";
import CodeEditor from "../components/CodeEditor";
import Loader from "../components/Loader";

export default function Coding() {
  const { id } = useParams(); // coding challenge id
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Fetch coding challenge
  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const data = await fetchCodingChallenge(id);
        setChallenge(data);
        setCode(data.starterCode || "");
        setLanguage(data.language || "javascript");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadChallenge();
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await submitCodingSolution(id, code, language);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult({ success: false, output: "Submission failed." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (!challenge) return <p className="text-center mt-10">Challenge not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">{challenge.title}</h1>
        <p className="text-gray-600 mt-2 mb-6">{challenge.description}</p>

        {/* Language Selector */}
        <div className="mb-4">
          <label className="mr-2 font-medium text-gray-700">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>

        {/* Code Editor */}
        <CodeEditor
          initialCode={code}
          language={language}
          onChange={setCode}
          height="60vh"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50"
        >
          {submitting ? <Loader size="5" /> : "Submit Solution"}
        </button>

        {/* Result Output */}
        {result && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100 text-gray-800">
            <p className="font-medium">
              {result.success ? "Success ✅" : "Failed ❌"}
            </p>
            <pre className="mt-2 whitespace-pre-wrap">{result.output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
