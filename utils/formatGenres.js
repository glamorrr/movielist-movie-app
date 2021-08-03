/**
 * Convert movie genres array of objects
 * to key (id) value (name) pair.
 */
const formatGenres = (genresFromTMDb) => {
  let movieGenres = {};
  genresFromTMDb.forEach((movieGenre) => {
    movieGenres[movieGenre.id] = movieGenre.name;
  });
  return movieGenres;
};

export default formatGenres;
