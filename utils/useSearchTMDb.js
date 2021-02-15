import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const useSearchTMDb = () => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 1 * 1000);
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultCurrentPagination, setSearchResultCurrentPagination] = useState(1);
  const [searchResultTotalPagination, setSearchResultTotalPagination] = useState(0);

  return {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
    searchResult,
    setSearchResult,
    searchResultCurrentPagination,
    setSearchResultCurrentPagination,
    searchResultTotalPagination,
    setSearchResultTotalPagination,
  };
};

export default useSearchTMDb;
