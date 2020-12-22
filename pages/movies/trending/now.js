import { useState } from 'react';
import Head from 'next/head';
import MoviesGrid from '../../../src/components/MoviesGrid';
import LayoutWrapper from '../../../src/components/LayoutWrapper';
import SelectDropdownTrendingMovies from '../../../src/components/SelectDropdownTrendingMovies';
import MobileNavbar from '../../../src/components/MobileNavbar';
import Footer from '../../../src/components/Footer';
import axiosTMDb from '../../../src/utils/axiosTMDb';
import { GET_MOVIES_TRENDING } from '../../../src/utils/TMDbType';
import {
  MOVIES_TRENDING_ENDPOINT,
  TMDb_API_CONFIGURATION_ENDPOINT,
} from '../../../src/utils/TMDbEndpoint';

/**
 * This file is not too diffrent with
 * another time span trending movies.
 */
export default function Now({ trendingMovies, imagesTMDbAPIConfiguration, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>Trending Movies &middot; Now</title>
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
        <title>Trending Movies &middot; Now</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutWrapper>
        <MobileNavbar />

        <main>
          <div className="pt-6" />
          <h1 className="inline font-poppins font-semibold text-3xl text-gray-600 tracking-wide">
            Trending
          </h1>

          <SelectDropdownTrendingMovies
            buttonText="Now"
            dropdownText="Week"
            linkToPage="/movies/trending/week"
          />

          <div className="mt-6" />
          <MoviesGrid
            movies={movies}
            setMovies={setMovies}
            shouldInfiniteScroll={true}
            setCurrentPagination={setMoviesCurrentPagination}
            infiniteScrollConfiguration={{
              type: GET_MOVIES_TRENDING,
              timeSpan: 'day',
              url: '/api/movies',
              pagination: moviesCurrentPagination,
              totalPagination: trendingMovies.totalPagination,
            }}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
        </main>

        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const response = await Promise.all([
      axiosTMDb.get(`${MOVIES_TRENDING_ENDPOINT}/day`),
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
