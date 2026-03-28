import { apiFetch } from "./client";

export const GameApi = {
  /**
   * Starts a new game session and retrieves AI-generated questions.
   */
  async createSession(profile?: { gender?: string; age?: number; environment?: string }) {
    return apiFetch("/game-sessions", {
      method: "POST",
      body: profile ? JSON.stringify(profile) : undefined,
      // Game session creation can involve AI question generation on the backend.
      // Wait for the backend response rather than timing out client-side.
      timeoutMs: 0,
    });
  },

  /**
   * Reports a user's response to a specific question in the session.
   */
  async answerQuestion(sessionId: string, questionId: string, selectedAnswerId: string, responseTimeMs: number) {
    return apiFetch(`/game-sessions/${sessionId}/questions/${questionId}/response`, {
      method: "POST",
      body: JSON.stringify({
        selectedAnswerId,
        responseTimeMs,
      }),
    });
  },

  /**
   * Updates the status of the session (e.g., to COMPLETED when time is up).
   */
  async updateSessionStatus(sessionId: string, status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED") {
    return apiFetch(`/game-sessions/${sessionId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
