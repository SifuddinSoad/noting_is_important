import { useState, useEffect, useCallback } from "react";
import Stopwatch, { GetStopwatch } from "../assets/utils/Stopwatch";

export default function useStopwatch() {
  const [stopwatch, setStopwatch] = useState<GetStopwatch>({ hours: "00", minutes: "00", seconds: "00" });
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [stopwatchInstance] = useState(() => new Stopwatch());

  const updateStopwatch = useCallback((updatedStopwatch: GetStopwatch) => setStopwatch(updatedStopwatch), []);

  useEffect(() => {
    stopwatchInstance.onUpdate = updateStopwatch;
    return () => stopwatchInstance.reset();
  }, [stopwatchInstance, updateStopwatch]);

  const start = () => {
    stopwatchInstance.start();
    setIsRunning(true);
    setIsStarted(true);
  };

  const resume = () => {
    stopwatchInstance.resume();
    setIsRunning(true);
  };

  const pause = () => {
    stopwatchInstance.pause();
    setIsRunning(false);
  };

  const reset = () => {
    stopwatchInstance.reset();
    setIsRunning(false);
    setIsStarted(false);
  };

  return { stopwatch, isRunning, isStarted, start, resume, pause, reset, stopwatchInstance, updateStopwatch };
}
