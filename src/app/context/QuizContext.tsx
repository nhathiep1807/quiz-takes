"use client";
import { createContext, useState } from "react";

interface QuizContextType {
  currentQuiz: number;
  setCurrentQuiz: React.Dispatch<React.SetStateAction<number>>;
}

export const QuizContext = createContext<QuizContextType>(
  {} as QuizContextType
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentQuiz, setCurrentQuiz] = useState(1);

  const contextValue = {
    currentQuiz,
    setCurrentQuiz,
  };
  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
