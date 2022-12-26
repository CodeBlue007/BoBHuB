export const getHourmin = (ISOstring: string, timeLimit: number = 0) => {
  const date = new Date(ISOstring);
  let hour = date.getHours();
  let minute = date.getMinutes() + timeLimit;
  if (minute >= 60) {
    hour += 1;
    minute -= 60;
  }
  const hourString = hour.toString().padStart(2, '0');
  const minuteString = minute.toString().padStart(2, '0');

  return [hourString, minuteString];
};
