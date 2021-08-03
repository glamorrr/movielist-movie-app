import { useState } from 'react';
import Head from 'next/head';
import MoviesGrid from '@/components/MoviesGrid';
import LayoutWrapper from '@/components/LayoutWrapper';
import MobileNavbar from '@/components/MobileNavbar';
import Footer from '@/components/Footer';
import axiosTMDb from '@/utils/axiosTMDb';
import { GET_MOVIES_POPULAR } from '@/utils/TMDbType';
import {
  MOVIES_GENRE_LIST_ENDPOINT,
  MOVIES_POPULAR_ENDPOINT,
  TMDb_API_CONFIGURATION_ENDPOINT,
} from '@/utils/TMDbEndpoint';
import formatGenres from '@/utils/formatGenres';

export default function Popular({ popularMovies, imagesTMDbAPIConfiguration, movieGenres, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>Popular Movies &middot; MovieList</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  const [movies, setMovies] = useState(popularMovies.movies);
  const [moviesCurrentPagination, setMoviesCurrentPagination] = useState(1);

  return (
    <>
      <Head>
        <title>Popular Movies &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <MobileNavbar />
        <main>
          <h1 className="pt-6 text-3xl font-semibold tracking-wide text-gray-600 font-poppins">
            What's Popular
          </h1>
          <MoviesGrid
            mt="mt-6"
            genres={movieGenres}
            movies={movies}
            setMovies={setMovies}
            shouldInfiniteScroll={true}
            setCurrentPagination={setMoviesCurrentPagination}
            infiniteScrollConfiguration={{
              type: GET_MOVIES_POPULAR,
              url: '/api/movies',
              pagination: moviesCurrentPagination,
              totalPagination: popularMovies.totalPagination,
            }}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
        </main>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await Promise.all([
      axiosTMDb.get(MOVIES_POPULAR_ENDPOINT),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
      axiosTMDb.get(MOVIES_GENRE_LIST_ENDPOINT),
    ]);
    const data = {
      popularMovies: response[0].data,
      imagesTMDbAPIConfiguration: response[1].data.images,
      movieGenres: formatGenres(response[2].data.genres),
    };

    return {
      props: {
        popularMovies: {
          movies: data.popularMovies.results,
          totalPagination: data.popularMovies.total_pages,
        },
        imagesTMDbAPIConfiguration: data.imagesTMDbAPIConfiguration,
        movieGenres: data.movieGenres,
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
