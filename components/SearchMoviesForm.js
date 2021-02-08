import { useEffect } from 'react';
import axios from 'axios';
import { MdClose, MdSearch } from 'react-icons/md';
import Icon from '@/components/Icon';
import { GET_MOVIES_SEARCH } from '@/utils/TMDbType';

const SearchMoviesForm = ({
  searchValue,
  setSearchValue,
  debouncedSearchValue,
  setCurrentPagination,
  setTotalPagination,
  setIsTyping,
  setMoviesSearchResult,
}) => {
  /**
   * Current value state of
   * search input element.
   */
  const isSearchInputFilled = searchValue.length > 0;

  useEffect(() => {
    if (!isSearchInputFilled || debouncedSearchValue !== searchValue) return;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    (async () => {
      try {
        const res = await axios.get('/api/movies', {
          params: {
            query: debouncedSearchValue,
            type: GET_MOVIES_SEARCH,
          },
          cancelToken: source.token,
        });
        const data = res.data;

        /**
         * Set pagination to one and
         * persist the value of total pagination
         * that retrieved from data TMDb API.
         */
        setTotalPagination(data.total_pages);
        setCurrentPagination(1);

        /**
         * Set a brand new movies to show
         * based on search value
         * and discard all movies from previous search.
         */
        setIsTyping(false);
        setMoviesSearchResult(data.results);
      } catch (err) {
        console.error({ err });
      }
    })();

    /**
     * Will cancel request if user suddenly
     * clear input while client requesting to API.
     */
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [debouncedSearchValue, searchValue]);

  /**
   * This useEffect will render
   * explore movies (trending, popular, etc)
   * if there is no value in search input.
   */
  useEffect(() => {
    if (!isSearchInputFilled) {
      setIsTyping(false);
      setMoviesSearchResult([]);
    }
  }, [searchValue]);

  /**
   * If input value changing,
   * it will remove all movies in array (react state),
   * so it will not display explore movies
   * (trending, top rated, etc).
   */
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setIsTyping(true);
    setMoviesSearchResult([]);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setSearchValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="md:flex md:items-end">
      <form
        className="flex items-center justify-center max-w-xs px-4 py-3 mt-6 bg-white rounded-md shadow-lg lg:px-3 lg:py-2"
        onSubmit={handleSubmit}
      >
        <Icon size="1.75rem" className="text-blue-300">
          <MdSearch />
        </Icon>
        <div className="w-full mx-3">
          <input
            className="w-full text-base font-medium tracking-wider text-gray-500 bg-white lg:text-sm focus:outline-none"
            value={searchValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Search"
            maxLength={30}
            id="searchMovieInput"
            aria-label="search"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <button
          className={(!isSearchInputFilled && 'cursor-default') + ' focus:outline-none'}
          onClick={handleButtonClick}
          disabled={!isSearchInputFilled}
          type="button"
          aria-label="Clear search input"
        >
          <Icon
            size="1.75rem"
            className={
              (isSearchInputFilled ? 'scale-100' : 'scale-0') +
              ' text-blue-300 hover:text-blue-400 transition-all transform'
            }
          >
            <MdClose />
          </Icon>
        </button>
      </form>
      <div
        className={
          (isSearchInputFilled ? 'scale-100' : 'scale-0') +
          ' hidden md:block mt-4 ml-6 px-3 py-1 w-max text-sm font-medium text-white tracking-wider bg-blue-400 rounded-2xl transform transition-transform shadow-sm'
        }
      >
        Search: {searchValue}
      </div>
    </div>
  );
};

export default SearchMoviesForm;
