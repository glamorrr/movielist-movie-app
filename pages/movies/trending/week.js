import { useState } from 'react';
import Head from 'next/head';
import MoviesGrid from '@/components/MoviesGrid';
import LayoutWrapper from '@/components/LayoutWrapper';
import MobileNavbar from '@/components/MobileNavbar';
import Footer from '@/components/Footer';
import SelectDropdownTrendingMovies from '@/components/SelectDropdownTrendingMovies';
import axiosTMDb from '@/utils/axiosTMDb';
import { GET_MOVIES_TRENDING } from '@/utils/TMDbType';
import { MOVIES_TRENDING_ENDPOINT, TMDb_API_CONFIGURATION_ENDPOINT } from '@/utils/TMDbEndpoint';

/**
 * This file is not too diffrent with
 * another time span trending movies.
 */
export default function Week({ trendingMovies, imagesTMDbAPIConfiguration, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>Trending Movies &middot; Week</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  const [movies, setMovies] = useState(trendingMovies.movies);
  const [moviesCurrentPagination, setMoviesCurrentPagination] = useState(1);

  return (
    <>
      <Head>
        <title>Trending Movies &middot; Week</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <MobileNavbar />
        <main>
          <div className="pt-6">
            <h1 className="inline text-3xl font-semibold tracking-wide text-gray-600 font-poppins">
              Trending
            </h1>
            <SelectDropdownTrendingMovies
              buttonText="Week"
              dropdownText="Now"
              linkToPage="/movies/trending/now"
            />
          </div>
          <MoviesGrid
            mt="mt-6"
            movies={movies}
            setMovies={setMovies}
            shouldInfiniteScroll={true}
            setCurrentPagination={setMoviesCurrentPagination}
            infiniteScrollConfiguration={{
              type: GET_MOVIES_TRENDING,
              timeSpan: 'week',
              url: '/api/movies',
              pagination: moviesCurrentPagination,
              totalPagination: trendingMovies.totalPagination,
            }}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
          <Footer />
        </main>
      </LayoutWrapper>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await Promise.all([
      axiosTMDb.get(`${MOVIES_TRENDING_ENDPOINT}/week`),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
    ]);
    const data = {
      trendingMovies: response[0].data,
      imagesTMDbAPIConfiguration: response[1].data.images,
    };

    return {
      props: {
        trendingMovies: {
          movies: data.trendingMovies.results,
          totalPagination: data.trendingMovies.total_pages,
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
