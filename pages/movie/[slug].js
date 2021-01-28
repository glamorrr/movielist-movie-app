import { useEffect } from 'react';
import Head from 'next/head';
import MovieBackdrop from '@/components/MovieBackdrop';
import MovieDetails from '@/components/MovieDetails';
import MobileNavbar from '@/components/MobileNavbar';
import Footer from '@/components/Footer';
import LayoutWrapper from '@/components/LayoutWrapper';
import axiosTMDb from '@/utils/axiosTMDb';
import { MOVIE_ENDPOINT, TMDb_API_CONFIGURATION_ENDPOINT } from '@/utils/TMDbEndpoint';

export default function Movie({ movie, imagesTMDbAPIConfiguration, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>Oops! Something went wrong &middot; MovieList</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <p>{error.message}</p>
        </main>
      </>
    );
  }

  const { title, release_date, backdrop_path } = movie;

  // for development purpose
  useEffect(() => {
    console.log({ movie });
  }, []);

  return (
    <>
      <Head>
        <title>
          {title} ({new Date(release_date).getFullYear()}) &middot; MovieList
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MobileNavbar />
        <MovieBackdrop
          backdropPath={backdrop_path}
          imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
        />
        <MovieDetails movie={movie} imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration} />
      </main>
      <LayoutWrapper>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { slug } = query;

  /**
   * TMDb movie id.
   * from : 726739-cats-dogs-3-paws-unite
   * to   : 726739
   * @type {number}
   */
  const movieId = slug.split('-')[0];

  try {
    const movieRequestConfig = {
      params: {
        /**
         * This makes it possible to make sub requests
         * within the same namespace in a single HTTP request.
         * You can issue multiple requests,
         * just comma separate the values.
         *
         */
        append_to_response: 'credits',
        // TODO?: get movie reviews, recommedations movies, videos (trailers)
      },
    };

    const response = await Promise.all([
      axiosTMDb.get(`${MOVIE_ENDPOINT}/${movieId}`, movieRequestConfig),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
    ]);
    const data = {
      movie: response[0].data,
      imagesTMDbAPIConfiguration: response[1].data.images,
    };

    return {
      props: {
        movie: data.movie,
        imagesTMDbAPIConfiguration: data.imagesTMDbAPIConfiguration,
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
