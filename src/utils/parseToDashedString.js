/**
 * Parse normal string to dashed string.
 * example:
 *  - from : Cats & Dogs 3: Paws Unite
 *  - to   : cats-dogs-3-paws-unite
 * @param {string} normalString
 * @returns {string}
 */
const parseToDashedString = (normalString) => {
  return normalString
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s\s+/g, ' ')
    .replace(/\s/g, '-')
    .toLowerCase();
};
export default parseToDashedString;
