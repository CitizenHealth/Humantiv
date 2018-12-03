export const convertMinutesToHours = (minutes) => {
  return parseFloat((minutes/60).toFixed(1));
}

export const convertSecondsToMinutes = (seconds) => {
  return parseFloat((seconds/60).toFixed(1));
}