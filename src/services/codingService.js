// src/services/codingService.js
import api from "./api";

// Fetch all coding challenges (admin)
export const fetchAllCodingChallenges = async () => {
  const response = await api.get("/coding");
  return response.data.challenges;
};

// Fetch a single coding challenge by ID
export const fetchCodingChallenge = async (challengeId) => {
  const response = await api.get(`/coding/${challengeId}`);
  return response.data.challenge;
};

// Submit coding solution
export const submitCodingSolution = async (challengeId, code, language) => {
  const response = await api.post(`/coding/${challengeId}/submit`, {
    code,
    language,
  });
  return response.data;
};

// Admin: create new coding challenge
export const createCodingChallenge = async (challengeData) => {
  const response = await api.post("/coding", challengeData);
  return response.data;
};

// Admin: edit coding challenge
export const editCodingChallenge = async (challengeId, challengeData) => {
  const response = await api.put(`/coding/${challengeId}`, challengeData);
  return response.data;
};

// Admin: delete coding challenge
export const deleteCodingChallenge = async (challengeId) => {
  const response = await api.delete(`/coding/${challengeId}`);
  return response.data;
};
