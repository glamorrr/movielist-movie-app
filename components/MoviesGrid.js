import ReactTooltip from 'react-tooltip';
import MovieCard from '@/components/MovieCard';
import BadgeNumber from '@/components/BadgeNumber';
import TMDbInfiniteScroll from '@/components/TMDbInfiniteScroll';
import BadgeGenre from '@/components/BadgeGenre';
import MovieTooltipWrapper from '@/components/MovieTooltipWrapper';
import convertUnitNumberToPercentage from '@/utils/convertUnitNumberToPercentage';
import { GET_MOVIES_TOP_RATED } from '@/utils/TMDbType';

/**
 * MoviesGrid have 2 styles,
 * one that have an infinite scroll,
 * and another doesn't.
 */
const MoviesGrid = ({
  mt = 'mt-0',
  movies,
  genres,
  setMovies,
  shouldCountOrder = false,
  shouldInfiniteScroll = false,
  setCurrentPagination,
  infiniteScrollConfiguration,
  imagesTMDbAPIConfiguration,
}) => {
  if (shouldInfiniteScroll) {
    return (
      <div className={mt}>
        <TMDbInfiniteScroll
          result={movies}
          setResult={setMovies}
          setCurrentPagination={setCurrentPagination}
          infiniteScrollConfiguration={infiniteScrollConfiguration}
        >
          <div className="grid grid-cols-3 mx-auto mt-1 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
            {movies.map((movie, i) => (
              <MovieTooltipWrapper key={movie.id} genres={genres} movie={movie}>
                <MovieCard
                  movie={movie}
                  orderOfMovie={shouldCountOrder ? i + 1 : null}
                  imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                >
                  {infiniteScrollConfiguration.type === GET_MOVIES_TOP_RATED && (
                    <BadgeNumber order={i + 1} />
                  )}
                </MovieCard>
              </MovieTooltipWrapper>
            ))}
          </div>
        </TMDbInfiniteScroll>
      </div>
    );
  }

  /**
   * A grid that doesn't have
   * infinite scroll feature.
   */
  return (
    <div className={mt}>
      <div className="grid grid-cols-3 mx-auto mt-5 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
        {movies.map((movie, i) => (
          <MovieTooltipWrapper key={movie.id} genres={genres} movie={movie}>
            <MovieCard
              movie={movie}
              orderOfMovie={shouldCountOrder ? i + 1 : null}
              imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
            />
          </MovieTooltipWrapper>
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;
