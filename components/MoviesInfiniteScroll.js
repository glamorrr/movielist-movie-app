import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import SquareLoader from '@/components/SquareLoader';
import {
  GET_MOVIES_SEARCH,
  GET_MOVIES_TRENDING,
  GET_MOVIES_POPULAR,
  GET_MOVIES_UPCOMING,
  GET_MOVIES_TOP_RATED,
  GET_MOVIE_RECOMMENDATIONS,
  GET_MOVIES_BY_KEYWORDS,
} from '@/utils/TMDbType';

const MoviesInfiniteScroll = ({
  children,
  movies,
  setMovies,
  setCurrentPagination,
  infiniteScrollConfiguration,
}) => {
  /**
   * infiniteScrollConfiguration Object
   * @property {string} url - URL to request API.
   * @property {number} pagination - Current pagination to use in request more data (infinite scroll).
   * @property {number} totalPagination - Total pagination for barrier to request more data.
   * @property {string} type - Request type to API.
   * @property {number} [movieId] - movie id to get recommendation for movies based on movie.
   * @property {number} [keywordId] - keyword id to get movies by keyword.
   * @property {string} [query] - Input value to search movies.
   * @property {string} [timeSpan] (day or week) - Time span for request on trending movies endpoint.
   */
  const {
    url,
    pagination,
    totalPagination,
    type,
    movieId,
    keywordId,
    query,
    timeSpan,
  } = infiniteScrollConfiguration;
  const nextPagination = pagination + 1;

  return (
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
            case GET_MOVIES_BY_KEYWORDS:
              config = {
                params: {
                  type,
                  page: nextPagination,
                  keyword_id: keywordId,
                },
              };
              break;
            case GET_MOVIE_RECOMMENDATIONS:
              config = {
                params: {
                  type,
                  page: nextPagination,
                  movie_id: movieId,
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
      loader={<SquareLoader additionalClassName="mt-12 mb-6 w-8 h-8" />}
    >
      {children}
    </InfiniteScroll>
  );
};

export default MoviesInfiniteScroll;
