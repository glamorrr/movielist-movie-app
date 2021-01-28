import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '@/components/MovieCard';
import SquareLoader from '@/components/SquareLoader';
import BadgeNumber from '@/components/BadgeNumber';
import {
  GET_MOVIES_SEARCH,
  GET_MOVIES_TRENDING,
  GET_MOVIES_POPULAR,
  GET_MOVIES_UPCOMING,
  GET_MOVIES_TOP_RATED,
} from '@/utils/TMDbType';

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
    /**
     * @namespace infiniteScrollConfiguration
     * @property {string} url - URL to request API.
     * @property {string} [query] - Input value to search movies.
     * @property {number} pagination - Current pagination to use in request more data (infinite scroll).
     * @property {number} totalPagination - Total pagination for barrier to request more data.
     * @property {string} type - Request type to API.
     * @property {string} timeSpan (day or week) - Time span for request on trending movies endpoint.
     */
    const { url, query, pagination, totalPagination, type, timeSpan } = infiniteScrollConfiguration;

    const nextPagination = pagination + 1;

    return (
      <div className={mt}>
        <InfiniteScroll
          style={{ overflow: 'visible' }}
          dataLength={movies.length}
          /**
           * Maximum page to request is 5 page.
           * First request from this component will
           * start at page = 2.
           */
          hasMore={nextPagination <= totalPagination && nextPagination <= 5}
          next={async () => {
            try {
              let config;

              /**
               * Set request config based on
               * request movies type.
               */
              switch (type) {
                case GET_MOVIES_SEARCH:
                  config = {
                    params: {
                      query,
                      type,
                      page: nextPagination,
                    },
                  };
                  break;
                case GET_MOVIES_TRENDING:
                  config = {
                    params: {
                      type,
                      time_span: timeSpan,
                      page: nextPagination,
                    },
                  };
                  break;
                case GET_MOVIES_POPULAR:
                case GET_MOVIES_UPCOMING:
                case GET_MOVIES_TOP_RATED:
                  config = {
                    params: {
                      type,
                      page: nextPagination,
                    },
                  };
                  break;
              }

              const res = await axios.get(url, config);
              const data = res.data;

              /**
               * After adding new movies,
               * this will set pagination to the next pagination,
               * and will request (infinite scroll) with that new pagination.
               */
              setMovies((prevMovies) => [...prevMovies, ...data.results]);
              setCurrentPagination(nextPagination);
            } catch (err) {
              console.error({ err });
            }
          }}
          loader={<SquareLoader additionalClassName="mt-8 mb-6 w-8 h-8" />}
        >
          <div className="mt-1 mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
            {movies.map((movie, i) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                orderOfMovie={shouldCountOrder ? i + 1 : null}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              >
                {type === GET_MOVIES_TOP_RATED && <BadgeNumber order={i + 1} />}
              </MovieCard>
            ))}
          </div>
        </InfiniteScroll>
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
