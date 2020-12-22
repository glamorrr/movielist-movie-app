/**
 * Convert number (in unit) to percentage.
 * @param {number} unit - Number in unit.
 * @return {string} - example: '87%'.
 */
const convertUnitNumberToPercentage = (unit) => {
  const number = Math.round(unit * 10);
  return `${number}%`;
};

export default convertUnitNumberToPercentage;
