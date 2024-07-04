import React, { useEffect, useState } from "react";

type TimerProps = {
  timeInSeconds: number;
  onTimeOver: () => void;
};

export default function Timer({ timeInSeconds, onTimeOver }: TimerProps) {
  const [seconds, setSeconds] = useState(timeInSeconds);

  useEffect(() => {
    if (seconds === 0) {
      onTimeOver();
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    setSeconds(timeInSeconds);
  }, [timeInSeconds]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      <p className="p-4 bg-green-400 rounded-md text-sm w-fit text-white">
        Timer: {formatTime(seconds)}
      </p>
    </div>
  );
}
