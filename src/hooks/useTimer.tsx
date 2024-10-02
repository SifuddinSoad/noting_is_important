import { useState, useEffect, useCallback } from "react";

interface TimerProps {
  hours: string;
  minutes: string;
  seconds: string;
}

const useTimer = ({ hours, minutes, seconds }: TimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [initialTime, setInitialTime] = useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds),
  });

  // Effect to update remaining time when initial values change
  useEffect(() => {
    const totalSeconds =
      initialTime.hours * 3600 + initialTime.minutes * 60 + initialTime.seconds;
    setRemainingTime(totalSeconds);
  }, [initialTime]);

  // Effect to handle timer intervals
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && remainingTime > 0) {
      interval = window.setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime <= 0) {
      setIsRunning(false);
      setIsStarted(false);
    }

    return () => {
      if (interval !== undefined) {
        window.clearInterval(interval);
      }
    };
  }, [isRunning, remainingTime]);

  // Format time to HH:MM:SS
  const formatTime = useCallback((time: number): TimerProps => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  }, []);

  // Start the timer
  const start = useCallback(() => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setInitialTime({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    });
    setRemainingTime(totalSeconds);
    setIsRunning(true);
    setIsStarted(true);
  }, [hours, minutes, seconds]);

  // Pause the timer
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Resume the timer
  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Reset the timer
  const reset = useCallback(() => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setInitialTime({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    });
    setRemainingTime(totalSeconds);
    setIsRunning(false);
    setIsStarted(false);
  }, [hours, minutes, seconds]);

  return {
    timer: formatTime(remainingTime),
    isRunning,
    isStarted,
    start,
    pause,
    resume,
    reset,
  };
};

export default useTimer;
