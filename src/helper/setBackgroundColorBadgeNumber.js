/**
 * Set background color for badge number.
 * @param {number} order - Order of movie.
 * @return {string}
 */
const setBackgroundColorBadgeNumber = (order) => {
  if (order === 1) return 'bg-yellow-300';
  if (order === 2) return 'bg-gray-200';
  if (order === 3) return 'bg-yellow-500';

  return 'bg-blue-200';
};

export default setBackgroundColorBadgeNumber;
