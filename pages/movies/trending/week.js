import { useState } from 'react';
import Head from 'next/head';
import MoviesGrid from '@/components/MoviesGrid';
import LayoutWrapper from '@/components/LayoutWrapper';
import MobileNavbar from '@/components/MobileNavbar';
import Footer from '@/components/Footer';
import Dropdown from '@/components/Dropdown';
import axiosTMDb from '@/utils/axiosTMDb';
import { GET_MOVIES_TRENDING } from '@/utils/TMDbType';
import {
  MOVIES_GENRE_LIST_ENDPOINT,
  MOVIES_TRENDING_ENDPOINT,
  TMDb_API_CONFIGURATION_ENDPOINT,
} from '@/utils/TMDbEndpoint';
import formatGenres from '@/utils/formatGenres';

/**
 * This file is not too diffrent with
 * another time span trending movies.
 */
export default function Week({ trendingMovies, imagesTMDbAPIConfiguration, movieGenres, error }) {
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
          <div className="flex items-baseline pt-6 space-x-2">
            <h1 className="inline text-2xl font-semibold tracking-wide text-gray-600 font-poppins">
              Trending
            </h1>
            <Dropdown buttonText="Week" dropdownText="Now" linkToPage="/movies/trending/now" />
          </div>
          <MoviesGrid
            mt="mt-6"
            genres={movieGenres}
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

export async function getServerSideProps() {
  try {
    const response = await Promise.all([
      axiosTMDb.get(`${MOVIES_TRENDING_ENDPOINT}/week`),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
      axiosTMDb.get(MOVIES_GENRE_LIST_ENDPOINT),
    ]);
    const data = {
      trendingMovies: response[0].data,
      imagesTMDbAPIConfiguration: response[1].data.images,
      movieGenres: formatGenres(response[2].data.genres),
    };

    return {
      props: {
        trendingMovies: {
          movies: data.trendingMovies.results,
          totalPagination: data.trendingMovies.total_pages,
        },
        imagesTMDbAPIConfiguration: data.imagesTMDbAPIConfiguration,
        movieGenres: data.movieGenres,
      },
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
