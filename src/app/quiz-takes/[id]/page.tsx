"use client";
import { useEffect, useMemo, useState } from "react";
import BaseDialog from "@components/app/components/dialog/BaseDialog";
import { useParams } from "next/navigation";
import Show from "@components/app/components/condition/Show";
import { quizQuery } from "@components/app/hook/use-quiz";
import Timer from "@components/app/components/Timer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function QuizPage() {
  const [open, setOpen] = useState(false);
  const [openConfirmSubmit, setOpenConfirmSubmit] = useState(false);
  const [passCode, setPassCode] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: number; answerId?: number; answerText?: string }[]
  >([]);
  const [isFinished, setIsFinished] = useState(false);
  const { id } = useParams();
  const { data } = quizQuery.useQuizQuestions(id as string);
  const questions = data?.questions;
  const currentQuestionDetail = useMemo(
    () => questions?.[currentQuestion],
    [questions, currentQuestion]
  );

  const validateSecretCode = quizQuery.mutation.useValidateSecretCode();
  const startQuizMutation = quizQuery.mutation.useStartQuiz();
  const submitAnswer = quizQuery.mutation.useSubmitAnswer();

  const handleValidateSecretCode = async () => {
    validateSecretCode.mutate(
      {
        id: id as string,
        passCode,
      },
      {
        onSuccess() {
          setOpen(false);
          setStartQuiz(true);
          startQuizMutation.mutate({ id: id as string, passCode });
        },
        onError(error: any) {
          setOpen(false);
          toast.error(error.response.data.error.message);
        },
      }
    );
  };

  const handleSubmitAnswers = async () => {
    submitAnswer.mutate(
      {
        quizId: data?.id,
        data: answers,
      },
      {
        onSuccess() {
          toast.success("Answer submitted successfully!");
          setIsFinished(true);
        },
        onError(error: any) {
          toast.error(error.response.data.error.message);
        },
      }
    );
  };

  useEffect(() => {
    setAnswers(
      questions?.map((question: any) => ({
        questionId: question.id,
      })) || []
    );
  }, [questions]);

  return (
    <div className="[&>*:not(:last-child)]:mb-3 border border-slate-300 rounded-lg p-6 h-full">
      <Show when={!startQuiz && !isFinished}>
        <div className="flex justify-center flex-col items-center gap-4">
          <p className="text-lg">
            Hi, Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="flex flex-col items-center gap-1 justify-center">
            <label htmlFor="secretKey" className="font-semibold">
              Secret key
            </label>
            <input
              id="secretKey"
              type="text"
              value={passCode}
              placeholder="Enter your secret key..."
              className="px-4 py-2 border border-[#ccc] rounded-lg text-sm w-[300px]"
              onChange={(e) => setPassCode(e.target.value)}
            />
          </div>
          <button
            className="px-6 py-2 bg-blue-500 text-white text-base rounded-xl font-medium"
            onClick={() => setOpen(true)}
          >
            Start
          </button>
          <BaseDialog
            open={open}
            closeIcon={false}
            onOpenChange={setOpen}
            className="w-[500px]"
          >
            <div>
              <p className="text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center gap-4 justify-center mt-10">
                <button
                  className="px-6 py-2 bg-red-500 text-white text-sm rounded-lg font-medium w-[110px]"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg font-medium w-[110px]"
                  onClick={handleValidateSecretCode}
                >
                  Continue
                </button>
              </div>
            </div>
          </BaseDialog>
        </div>
      </Show>
      <Show when={startQuiz && !isFinished}>
        <div>
          <div className="flex items-center justify-between">
            <p className="font-medium mb-2">
              {data?.position} {data?.level}
            </p>
            <Timer
              timeInSeconds={data?.duration}
              onTimeOver={handleSubmitAnswers}
            />
          </div>
          <div className="mt-10">
            <p className="mb-2">Question {currentQuestion + 1}</p>
            <div className="grid grid-cols-2 gap-10">
              <div className="border border-slate-300 rounded-lg p-4">
                <p>{currentQuestionDetail?.content}</p>
              </div>
              <div>
                {currentQuestionDetail?.type === "multiple_choice" ? (
                  <div className="border border-slate-300 rounded-lg p-4">
                    {currentQuestionDetail?.answers.map((answer: any) => (
                      <div key={answer.id} className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="answer"
                          id={answer.id.toString()}
                          className="mt-[6px]"
                          onChange={() => {
                            setAnswers((prev) => {
                              const newAnswers = prev.map((prevAnswer) => {
                                if (
                                  prevAnswer.questionId ===
                                  currentQuestionDetail.id
                                ) {
                                  return {
                                    ...prevAnswer,
                                    answerId: answer.id,
                                  };
                                }
                                return prevAnswer;
                              });
                              return newAnswers;
                            });
                          }}
                        />
                        <label htmlFor={answer.id.toString()}>
                          {answer.content}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <textarea
                    placeholder="Write the answer..."
                    className="border border-slate-300 rw-full h-full min-h-[300px] p-4 rounded-lg w-full"
                    onChange={(e) => {
                      setAnswers((prev) => {
                        const newAnswers = prev.map((prevAnswer) => {
                          if (
                            prevAnswer.questionId === currentQuestionDetail.id
                          ) {
                            return {
                              ...prevAnswer,
                              answerText: e.target.value,
                            };
                          }
                          return prevAnswer;
                        });
                        return newAnswers;
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              {currentQuestion > 0 && (
                <button
                  className="text-sm px-2 py-1 rounded-md w-[80px] bg-blue-400 text-white mr-auto"
                  onClick={() => {
                    setCurrentQuestion((prev) => prev - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {currentQuestion === questions.length - 1 && (
                <button
                  className="text-sm px-2 py-1 rounded-md w-[80px] bg-blue-400 text-white"
                  onClick={() => setOpenConfirmSubmit(true)}
                >
                  Submit
                </button>
              )}
              {currentQuestion < questions?.length - 1 && (
                <button
                  className="text-sm px-2 py-1 rounded-md w-[80px] bg-blue-400 text-white ml-auto"
                  onClick={() => {
                    setCurrentQuestion((prev) => prev + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
          <BaseDialog
            open={openConfirmSubmit}
            closeIcon={false}
            onOpenChange={setOpenConfirmSubmit}
            className="w-[500px]"
          >
            <div>
              <p className="text-center">
                Are you sure you want to submit your answers?
              </p>
              <div className="flex items-center gap-4 justify-center mt-10">
                <button
                  className="px-6 py-2 bg-red-500 text-white text-sm rounded-lg font-medium w-[110px]"
                  onClick={() => setOpenConfirmSubmit(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-2 bg-blue-500 text-white text-sm rounded-lg font-medium w-[110px]"
                  onClick={handleSubmitAnswers}
                >
                  Submit
                </button>
              </div>
            </div>
          </BaseDialog>
        </div>
      </Show>
      <Show when={isFinished}>
        <div className="text-lg font-semibold text-center">
          Thankyou so much for joining the test. <br />
          We will inform you about the result soon.
        </div>
      </Show>
      <ToastContainer />
    </div>
  );
}
