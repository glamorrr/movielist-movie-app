import MovieCard from '@/components/MovieCard';
import BadgeNumber from '@/components/BadgeNumber';
import MoviesInfiniteScroll from '@/components/MoviesInfiniteScroll';
import { GET_MOVIES_TOP_RATED } from '@/utils/TMDbType';

/**
 * MoviesGrid have 2 styles,
 * one that have an infinite scroll,
 * and another doesn't.
 */
const MoviesGrid = ({
  mt = 'mt-0',
  movies,
  setMovies,
  shouldCountOrder,
  shouldInfiniteScroll,
  setCurrentPagination,
  infiniteScrollConfiguration,
  imagesTMDbAPIConfiguration,
}) => {
  if (shouldInfiniteScroll) {
    return (
      <div className={mt}>
        <MoviesInfiniteScroll
          movies={movies}
          setMovies={setMovies}
          setCurrentPagination={setCurrentPagination}
          infiniteScrollConfiguration={infiniteScrollConfiguration}
        >
          <div className="mt-1 mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
            {movies.map((movie, i) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                orderOfMovie={shouldCountOrder ? i + 1 : null}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              >
                {infiniteScrollConfiguration.type === GET_MOVIES_TOP_RATED && (
                  <BadgeNumber order={i + 1} />
                )}
              </MovieCard>
            ))}
          </div>
        </MoviesInfiniteScroll>
      </div>
    );
  }

  /**
   * A grid that doesn't have
   * infinite scroll feature.
   */
  return (
    <div className={mt}>
      <div className="mt-5 mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
        {movies.map((movie, i) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            orderOfMovie={shouldCountOrder ? i + 1 : null}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
