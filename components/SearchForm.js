import { useEffect } from 'react';
import axios from 'axios';
import { MdClose, MdSearch } from 'react-icons/md';
import Icon from '@/components/Icon';
import { GET_MOVIES_SEARCH } from '@/utils/TMDbType';

const SearchForm = ({
  type,
  searchValue,
  setSearchValue,
  debouncedSearchValue,
  setCurrentPagination,
  setTotalPagination,
  setIsTyping,
  setSearchResult,
}) => {
  // Current value state of search input element.
  const isSearchInputFilled = searchValue.length > 0;

  useEffect(() => {
    if (!isSearchInputFilled || debouncedSearchValue !== searchValue) return;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    (async () => {
      const url = type === GET_MOVIES_SEARCH ? '/api/movies' : '/api/people';

      try {
        const res = await axios.get(url, {
          params: {
            query: debouncedSearchValue,
            type,
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
         * Set a new search result to show
         * based on search value
         * and discard all search result from previous search.
         */
        setIsTyping(false);
        setSearchResult(data.results);
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
   * explore (trending, popular, etc)
   * if there is no value in search input.
   */
  useEffect(() => {
    if (!isSearchInputFilled) {
      setIsTyping(false);
      setSearchResult([]);
    }
  }, [searchValue]);

  /**
   * If input value changing,
   * it will remove all movies in array (react state),
   * so it will not display explore
   * (popular, trending, top rated, etc).
   */
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    setIsTyping(true);
    setSearchResult([]);
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

export default SearchForm;
