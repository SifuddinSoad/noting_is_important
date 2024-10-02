export const getUncloseStopwatch = () => {
  const localStorageID_start = "focusMode--Built-in--Counter--startTimes";
  const localStorageID_pause = "focusMode--Built-in--Counter--pauseTimes";
  const localStorageID_end = "focusMode--Built-in--Counter--endTimes";

  const startTimes = JSON.parse(localStorage.getItem(localStorageID_start) || '[]');
  const pauseTimes = JSON.parse(localStorage.getItem(localStorageID_pause) || '[]');
  const endTimes = JSON.parse(localStorage.getItem(localStorageID_end) || '[]');

  const startTimesLength = startTimes.length;
  const pauseTimesLength = pauseTimes.length;
  const endTimesLength = endTimes.length;

  if (startTimesLength === pauseTimesLength && startTimesLength === endTimesLength) {
    return null;
  }

  if (startTimesLength === 0 || pauseTimesLength === 0) {
    return null;
  }

  const lastStartTime = startTimes[startTimesLength - 1];
  const lastPauseTime = pauseTimes[pauseTimesLength - 1];

  if (!lastStartTime || !lastPauseTime) {
    return null;
  }

  const startTime = new Date(lastStartTime);
  const pauseTime = new Date(lastPauseTime);

  const elapsedTime = pauseTime.getTime() - startTime.getTime();

  if (elapsedTime < 0) {
    return null;
  }

  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  return { hours, minutes, seconds };
};
