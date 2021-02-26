import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import SquareLoader from '@/components/SquareLoader';
import {
  GET_MOVIES_SEARCH,
  GET_MOVIES_TRENDING,
  GET_MOVIE_RECOMMENDATIONS,
  GET_MOVIES_BY_KEYWORDS,
  GET_PERSON_SEARCH,
  GET_FAVORITE_MOVIES,
  GET_WATCHLIST,
} from '@/utils/TMDbType';

const TMDbInfiniteScroll = ({
  children,
  result,
  setResult,
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
   * @property {number} [accountId] - get data based on TMDb account id.
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
    accountId,
    keywordId,
    query,
    timeSpan,
  } = infiniteScrollConfiguration;
  const nextPagination = pagination + 1;

  return (
    <InfiniteScroll
      style={{ overflow: 'visible' }}
      dataLength={result.length}
      /**
       * Maximum page to request is 5 page.
       * First request from this component will
       * start at page = 2.
       */
      hasMore={nextPagination <= totalPagination && nextPagination <= 5}
      next={async () => {
        try {
          let config = {
            params: {
              type,
              page: nextPagination,
            },
          };

          /**
           * Set request config based on
           * request type.
           */
          switch (type) {
            case GET_MOVIES_SEARCH:
            case GET_PERSON_SEARCH:
              config.params.query = query;
              break;
            case GET_MOVIES_TRENDING:
              config.params.time_span = timeSpan;
              break;
            case GET_MOVIES_BY_KEYWORDS:
              config.params.keyword_id = keywordId;
              break;
            case GET_MOVIE_RECOMMENDATIONS:
              config.params.movie_id = movieId;
              break;
            case GET_FAVORITE_MOVIES:
            case GET_WATCHLIST:
              config.params.accountId = accountId;
              break;
          }

          const res = await axios.get(url, config);
          const data = res.data;

          /**
           * After adding new results,
           * this will set pagination to the next pagination,
           * and will request (infinite scroll) with that new pagination.
           */
          setResult((prevResult) => [...prevResult, ...data.results]);
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

export default TMDbInfiniteScroll;
