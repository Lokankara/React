export const pipeDuration = (minutes) => {
  if (!minutes || isNaN(minutes) || minutes < 0) return '00:00 hours';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const formattedHrs = hrs < 10 ? `0${hrs}` : hrs;
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  return `${formattedHrs}:${formattedMins} hours`;
};