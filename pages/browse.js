import { useState } from 'react';
import Head from 'next/head';
import LayoutWrapper from '@/components/LayoutWrapper';
import Footer from '@/components/Footer';
import MoviesGridSection from '@/components/MoviesGridSection';
import MoviesDynamicSection from '@/components/MoviesDynamicSection';
import MobileNavbar from '@/components/MobileNavbar';
import Dropdown from '@/components/Dropdown';
import SearchForm from '@/components/SearchForm';
import MoviesGrid from '@/components/MoviesGrid';
import SquareLoader from '@/components/SquareLoader';
import axiosTMDb from '@/utils/axiosTMDb';
import { GET_MOVIES_SEARCH } from '@/utils/TMDbType';
import {
  MOVIES_POPULAR_ENDPOINT,
  MOVIES_TOP_RATED_ENDPOINT,
  MOVIES_TRENDING_ENDPOINT,
  MOVIES_UPCOMING_ENDPOINT,
  TMDb_API_CONFIGURATION_ENDPOINT,
  MOVIES_GENRE_LIST_ENDPOINT,
} from '@/utils/TMDbEndpoint';
import useSearchTMDb from '@/utils/useSearchTMDb';

export default function Browse({
  popularMovies,
  trendingMovies,
  upcomingMovies,
  topRatedMovies,
  imagesTMDbAPIConfiguration,
  movieGenres,
  error,
}) {
  if (error) {
    return (
      <>
        <Head>
          <title>Browse Movies &middot; MovieList</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  const {
    searchValue,
    setSearchValue,
    debouncedSearchValue,
    searchResult,
    setSearchResult,
    searchResultCurrentPagination,
    setSearchResultCurrentPagination,
    searchResultTotalPagination,
    setSearchResultTotalPagination,
  } = useSearchTMDb();
  const [isTyping, setIsTyping] = useState(false);

  const shouldShowLoader = isTyping;
  const isSearchNoResults = !isTyping && searchValue.length > 0 && searchResult.length === 0;
  const shouldShowSearchResults = !isTyping && searchResult.length > 0;
  const shouldShowExploreMovies =
    !isTyping && searchValue.length === 0 && searchResult.length === 0;

  return (
    <>
      <Head>
        <title>Browse Movies &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Search and discover movies." />
      </Head>
      <LayoutWrapper>
        <MobileNavbar />
        <main>
          <div className="flex items-baseline space-x-4">
            <h1 className="pt-6 text-4xl font-semibold tracking-wide text-gray-600 font-poppins">
              Browse
            </h1>
            <Dropdown
              fontSize="text-3xl"
              buttonText="Movies"
              dropdownText="People"
              linkToPage="/person"
            />
          </div>
          <SearchForm
            type={GET_MOVIES_SEARCH}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            debouncedSearchValue={debouncedSearchValue}
            currentPagination={searchResultCurrentPagination}
            setCurrentPagination={setSearchResultCurrentPagination}
            setTotalPagination={setSearchResultTotalPagination}
            setIsTyping={setIsTyping}
            setSearchResult={setSearchResult}
          />
          {shouldShowLoader && <SquareLoader additionalClassName="mt-28 mb-16 w-10 h-10" />}
          {isSearchNoResults && (
            <h2 className="mx-auto mt-24 mb-32 text-2xl font-medium text-center text-gray-500 font-poppins tracking wide">
              No Results
            </h2>
          )}
          {shouldShowSearchResults && (
            <>
              <MoviesGrid
                mt="mt-12"
                movies={searchResult}
                setMovies={setSearchResult}
                shouldInfiniteScroll={true}
                setCurrentPagination={setSearchResultCurrentPagination}
                infiniteScrollConfiguration={{
                  type: GET_MOVIES_SEARCH,
                  url: '/api/movies',
                  query: debouncedSearchValue,
                  pagination: searchResultCurrentPagination,
                  totalPagination: searchResultTotalPagination,
                }}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
            </>
          )}
          {shouldShowExploreMovies && (
            <>
              <MoviesGridSection
                headingTitle="Trending Now"
                linkToPage="/movies/trending/now"
                movies={trendingMovies}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
              <MoviesGridSection
                headingTitle="What's Popular"
                linkToPage="/movies/popular"
                movies={popularMovies}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
              <MoviesGridSection
                headingTitle="Upcoming"
                linkToPage="/movies/upcoming"
                movies={upcomingMovies}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
              <MoviesDynamicSection
                headingTitle="Top 100 Movies"
                linkToPage="/movies/top-100"
                movies={topRatedMovies}
                genres={movieGenres}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
            </>
          )}
        </main>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getStaticProps() {
  const NUMBER_OF_MOVIES_TO_SHOW = 6;
  const TOP_RATED_MOVIES_TO_SHOW = 10;

  try {
    // [i] -> index
    const response = await Promise.all([
      axiosTMDb.get(`${MOVIES_TRENDING_ENDPOINT}/day`), // [0]
      axiosTMDb.get(MOVIES_POPULAR_ENDPOINT), // [1]
      axiosTMDb.get(MOVIES_UPCOMING_ENDPOINT), // [2]
      axiosTMDb.get(MOVIES_TOP_RATED_ENDPOINT), // [3]
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT), // [4]
      axiosTMDb.get(MOVIES_GENRE_LIST_ENDPOINT), // [5]
    ]);
    const data = {
      trendingMovies: response[0].data.results,
      popularMovies: response[1].data.results,
      upcomingMovies: response[2].data.results,
      topRatedMovies: response[3].data.results,
      imagesTMDbAPIConfiguration: response[4].data.images,
      /**
       * Convert movie genres array of objects
       * to key (id) value (name) pair.
       */
      movieGenres: (() => {
        let movieGenres = {};
        response[5].data.genres.forEach((movieGenre) => {
          movieGenres[movieGenre.id] = movieGenre.name;
        });
        return movieGenres;
      })(),
    };
    data.trendingMovies.length = NUMBER_OF_MOVIES_TO_SHOW;
    data.popularMovies.length = NUMBER_OF_MOVIES_TO_SHOW;
    data.upcomingMovies.length = NUMBER_OF_MOVIES_TO_SHOW;
    data.topRatedMovies.length = TOP_RATED_MOVIES_TO_SHOW;

    return {
      props: {
        trendingMovies: data.trendingMovies,
        popularMovies: data.popularMovies,
        upcomingMovies: data.upcomingMovies,
        topRatedMovies: data.topRatedMovies,
        imagesTMDbAPIConfiguration: data.imagesTMDbAPIConfiguration,
        movieGenres: data.movieGenres,
      },
      /**
       * Next.js will attempt to re-generate the page
       * every 1 minutes (revalidate: 1 * 60).
       */
      revalidate: 1 * 60,
    };
  } catch (err) {
    console.error(err);

    return {
      props: {
        error: {
          message: 'Oops! Something went wrong.',
        },
      },
    };
  }
}
