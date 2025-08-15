// src/services/quizService.js
import api from "./api";

// Fetch all quizzes (for admin)
export const fetchAllQuizzes = async () => {
  const response = await api.get("/quizzes");
  return response.data.quizzes;
};

// Fetch quizzes assigned to a user
export const fetchUserQuizzes = async (userId) => {
  const response = await api.get(`/quizzes/user/${userId}`);
  return response.data.quizzes;
};

// Fetch a single quiz by ID
export const fetchQuizById = async (quizId) => {
  const response = await api.get(`/quizzes/${quizId}`);
  return response.data.quiz;
};

// Submit quiz answers
export const submitQuizAnswers = async (quizId, answers) => {
  const response = await api.post(`/quizzes/${quizId}/submit`, { answers });
  return response.data;
};

// Admin: create a new quiz
export const createQuiz = async (quizData) => {
  const response = await api.post("/quizzes", quizData);
  return response.data;
};

// Admin: edit existing quiz
export const editQuiz = async (quizId, quizData) => {
  const response = await api.put(`/quizzes/${quizId}`, quizData);
  return response.data;
};

// Admin: delete quiz
export const deleteQuiz = async (quizId) => {
  const response = await api.delete(`/quizzes/${quizId}`);
  return response.data;
};
