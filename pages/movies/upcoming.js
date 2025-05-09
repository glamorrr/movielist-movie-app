import { useState } from 'react';
import Head from 'next/head';
import MoviesGrid from '@/components/MoviesGrid';
import LayoutWrapper from '@/components/LayoutWrapper';
import MobileNavbar from '@/components/MobileNavbar';
import Footer from '@/components/Footer';
import axiosTMDb from '@/utils/axiosTMDb';
import { GET_MOVIES_UPCOMING } from '@/utils/TMDbType';
import {
  MOVIES_GENRE_LIST_ENDPOINT,
  MOVIES_UPCOMING_ENDPOINT,
  TMDb_API_CONFIGURATION_ENDPOINT,
} from '@/utils/TMDbEndpoint';
import formatGenres from '@/utils/formatGenres';

export default function Upcoming({
  upcomingMovies,
  imagesTMDbAPIConfiguration,
  movieGenres,
  error,
}) {
  if (error) {
    return (
      <>
        <Head>
          <title>Upcoming Movies &middot; MovieList</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  const [movies, setMovies] = useState(upcomingMovies.movies);
  const [moviesCurrentPagination, setMoviesCurrentPagination] = useState(1);

  return (
    <>
      <Head>
        <title>Upcoming Movies &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <MobileNavbar />
        <main>
          <div className="pt-6">
            <h1 className="inline text-3xl font-semibold tracking-wide text-gray-600 font-poppins">
              Upcoming Movies
            </h1>
          </div>
          <MoviesGrid
            mt="mt-6"
            movies={movies}
            genres={movieGenres}
            setMovies={setMovies}
            shouldInfiniteScroll={true}
            setCurrentPagination={setMoviesCurrentPagination}
            infiniteScrollConfiguration={{
              type: GET_MOVIES_UPCOMING,
              url: '/api/movies',
              pagination: moviesCurrentPagination,
              totalPagination: upcomingMovies.totalPagination,
            }}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
        </main>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await Promise.all([
      axiosTMDb.get(MOVIES_UPCOMING_ENDPOINT),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
      axiosTMDb.get(MOVIES_GENRE_LIST_ENDPOINT),
    ]);
    const data = {
      upcomingMovies: response[0].data,
      imagesTMDbAPIConfiguration: response[1].data.images,
      movieGenres: formatGenres(response[2].data.genres),
    };

    return {
      props: {
        upcomingMovies: {
          movies: data.upcomingMovies.results,
          totalPagination: data.upcomingMovies.total_pages,
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
