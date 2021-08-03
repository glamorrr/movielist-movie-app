import { useState } from 'react';
import Head from 'next/head';
import MoviesGrid from '@/components/MoviesGrid';
import LayoutWrapper from '@/components/LayoutWrapper';
import MobileNavbar from '@/components/MobileNavbar';
import Footer from '@/components/Footer';
import axiosTMDb from '@/utils/axiosTMDb';
import { GET_MOVIES_TOP_RATED } from '@/utils/TMDbType';
import {
  MOVIES_GENRE_LIST_ENDPOINT,
  MOVIES_TOP_RATED_ENDPOINT,
  TMDb_API_CONFIGURATION_ENDPOINT,
} from '@/utils/TMDbEndpoint';
import formatGenres from '@/utils/formatGenres';

export default function TopRated({
  topRatedMovies,
  imagesTMDbAPIConfiguration,
  movieGenres,
  error,
}) {
  if (error) {
    return (
      <>
        <Head>
          <title>Top 100 Movies &middot; MovieList</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  const [movies, setMovies] = useState(topRatedMovies.movies);
  const [moviesCurrentPagination, setMoviesCurrentPagination] = useState(1);

  return (
    <>
      <Head>
        <title>Top 100 Movies &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <MobileNavbar />
        <main>
          <div className="pt-6">
            <h1 className="inline text-3xl font-semibold tracking-wide text-gray-600 font-poppins">
              Top 100 Movies
            </h1>
          </div>
          <MoviesGrid
            mt="mt-6"
            genres={movieGenres}
            movies={movies}
            setMovies={setMovies}
            shouldInfiniteScroll={true}
            setCurrentPagination={setMoviesCurrentPagination}
            infiniteScrollConfiguration={{
              type: GET_MOVIES_TOP_RATED,
              url: '/api/movies',
              pagination: moviesCurrentPagination,
              totalPagination: topRatedMovies.totalPagination,
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
      axiosTMDb.get(MOVIES_TOP_RATED_ENDPOINT),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
      axiosTMDb.get(MOVIES_GENRE_LIST_ENDPOINT),
    ]);
    const data = {
      topRatedMovies: response[0].data,
      imagesTMDbAPIConfiguration: response[1].data.images,
      movieGenres: formatGenres(response[2].data.genres),
    };

    return {
      props: {
        topRatedMovies: {
          movies: data.topRatedMovies.results,
          totalPagination: data.topRatedMovies.total_pages,
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
