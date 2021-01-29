const formatRuntime = (minutes) => {
  if (!minutes) return '';
  const hours = minutes / 60;
  const roundedHours = Math.floor(hours);
  const roundedMinutes = Math.round((hours - roundedHours) * 60);
  return `${roundedHours}h ${roundedMinutes}m`;
};

export default formatRuntime;
