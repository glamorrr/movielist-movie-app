import { useState } from 'react';
import MoviesGrid from '@/components/MoviesGrid';
import { GET_MOVIES_BY_KEYWORDS } from '@/utils/TMDbType';

const MoviesByKeyword = ({ moviesByKeyword, imagesTMDbAPIConfiguration, genres }) => {
  const [movies, setMovies] = useState(moviesByKeyword.results);
  const [moviesCurrentPagination, setMoviesCurrentPagination] = useState(1);

  return (
    <MoviesGrid
      mt="mt-8"
      movies={movies}
      genres={genres}
      setMovies={setMovies}
      shouldInfiniteScroll={true}
      setCurrentPagination={setMoviesCurrentPagination}
      infiniteScrollConfiguration={{
        type: GET_MOVIES_BY_KEYWORDS,
        url: '/api/movies',
        keywordId: moviesByKeyword.id,
        pagination: moviesCurrentPagination,
        totalPagination: moviesByKeyword.total_pages,
      }}
      imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
    />
  );
};

export default MoviesByKeyword;
