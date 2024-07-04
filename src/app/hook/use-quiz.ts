import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "../axios-client";

const api = {
  validateSecretCode: (body: { id: string; passCode: string }) =>
    axiosClient.post(`/quiz-takes/${body.id}/validate`, {
      passCode: body.passCode,
    }),

  startQuiz: (body: { id: string; passCode: string }) =>
    axiosClient.post(`/quiz-takes/${body.id}/start`, {
      passCode: body.passCode,
    }),

  getQuizQuestions: (id: string): Promise<{ data: any }> =>
    axiosClient.get(`/quiz-takes/${id}/quiz`),

  submitAnswer: (body: {
    quizId: number;
    data: {
      questionId: number;
      answerId?: number;
      answerText?: string;
    }[];
  }) => axiosClient.post(`/quiz-takes/${body.quizId}/result`, body),
};

const useValidateSecretCode = () => {
  return useMutation({
    mutationFn: api.validateSecretCode,
  });
};

const useStartQuiz = () => {
  return useMutation({
    mutationFn: api.startQuiz,
  });
};

const useQuizQuestions = (id: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => api.getQuizQuestions(id),
    select: (data) => data.data,
  });
};

const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: api.submitAnswer,
  });
};

export const quizQuery = {
  useQuizQuestions,
  mutation: {
    useValidateSecretCode,
    useStartQuiz,
    useSubmitAnswer,
  },
};
