/**
 * Set text color for badge number.
 * @param {number} order - Order of movie.
 * @return {string}
 */
const setTextColorBadgeNumber = (order) => {
  if (order === 1 || order === 3) return 'text-yellow-900';
  if (order === 2) return 'text-gray-800';

  return 'text-gray-700';
};

export default setTextColorBadgeNumber;
