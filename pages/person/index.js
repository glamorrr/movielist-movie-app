import { useEffect, useState } from 'react';
import Head from 'next/head';
import MobileNavbar from '@/components/MobileNavbar';
import SearchForm from '@/components/SearchForm';
import LayoutWrapper from '@/components/LayoutWrapper';
import SquareLoader from '@/components/SquareLoader';
import TMDbInfiniteScroll from '@/components/TMDbInfiniteScroll';
import PersonCard from '@/components/Person';
import Dropdown from '@/components/Dropdown';
import Footer from '@/components/Footer';
import { GET_PERSON_SEARCH, GET_PERSON_POPULAR } from '@/utils/TMDbType';
import { TMDb_API_CONFIGURATION_ENDPOINT, PERSON_POPULAR_ENDPOINT } from '@/utils/TMDbEndpoint';
import axiosTMDb from '@/utils/axiosTMDb';
import useSearchTMDb from '@/utils/useSearchTMDb';

export default function Person({ popularPeople, imagesTMDbAPIConfiguration, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>Search People &middot; MovieList</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  const [people, setPeople] = useState(popularPeople.people);
  const [peopleCurrentPagination, setPeopleCurrentPagination] = useState(1);

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
  const shouldShowExplore = !isTyping && searchValue.length === 0 && searchResult.length === 0;

  useEffect(() => {
    console.log({ searchResult, imagesTMDbAPIConfiguration });
  }, [searchResult]);

  return (
    <>
      <Head>
        <title>Search People &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Search and discover people." />
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
              buttonText="People"
              dropdownText="Movies"
              linkToPage="/browse"
            />
          </div>
          <SearchForm
            type={GET_PERSON_SEARCH}
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
            <div className="mt-12">
              <TMDbInfiniteScroll
                result={searchResult}
                setResult={setSearchResult}
                setCurrentPagination={setSearchResultCurrentPagination}
                infiniteScrollConfiguration={{
                  type: GET_PERSON_SEARCH,
                  url: '/api/people',
                  query: debouncedSearchValue,
                  pagination: searchResultCurrentPagination,
                  totalPagination: searchResultTotalPagination,
                }}
              >
                <div className="grid grid-cols-3 mx-auto sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
                  {searchResult.map((person) => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                    />
                  ))}
                </div>
              </TMDbInfiniteScroll>
            </div>
          )}
          {shouldShowExplore && (
            <section className="mt-10">
              <h2 className="text-lg font-semibold tracking-wide text-gray-600 uppercase font-poppins md:tracking-wider">
                Popular People
              </h2>
              <div className="mt-5">
                <TMDbInfiniteScroll
                  result={people}
                  setResult={setPeople}
                  setCurrentPagination={setPeopleCurrentPagination}
                  infiniteScrollConfiguration={{
                    type: GET_PERSON_POPULAR,
                    url: '/api/people',
                    query: debouncedSearchValue,
                    pagination: peopleCurrentPagination,
                    totalPagination: popularPeople.totalPagination,
                  }}
                >
                  <div className="grid grid-cols-3 mx-auto sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5 lg:gap-10">
                    {people.map((person) => (
                      <PersonCard
                        key={person.id}
                        person={person}
                        imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                      />
                    ))}
                  </div>
                </TMDbInfiniteScroll>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await Promise.all([
      axiosTMDb.get(PERSON_POPULAR_ENDPOINT),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
    ]);
    const data = {
      popularPeople: response[0].data,
      imagesTMDbAPIConfiguration: response[1].data.images,
    };

    return {
      props: {
        popularPeople: {
          people: data.popularPeople.results,
          totalPagination: data.popularPeople.total_pages,
        },
        imagesTMDbAPIConfiguration: data.imagesTMDbAPIConfiguration,
      },
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
