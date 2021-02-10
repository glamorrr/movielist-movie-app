import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import MobileNavbar from '@/components/MobileNavbar';
import MoviesGrid from '@/components/MoviesGrid';
import Footer from '@/components/Footer';
import KeywordFallback from '@/components/PageLoader/KeywordFallback';
import LayoutWrapper from '@/components/LayoutWrapper';
import axiosTMDb from '@/utils/axiosTMDb';
import { KEYWORD_ENDPOINT, TMDb_API_CONFIGURATION_ENDPOINT } from '@/utils/TMDbEndpoint';
import { GET_MOVIES_BY_KEYWORDS } from '@/utils/TMDbType';

export default function Keyword({ moviesByKeyword, imagesTMDbAPIConfiguration, error }) {
  const { isFallback } = useRouter();

  if (isFallback) return <KeywordFallback />;

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

  const [movies, setMovies] = useState(moviesByKeyword.results);
  const [moviesCurrentPagination, setMoviesCurrentPagination] = useState(1);

  // for development purpose
  useEffect(() => {
    console.log({ movies, imagesTMDbAPIConfiguration });
  }, []);

  return (
    <>
      <Head>
        <title>"{moviesByKeyword.name}" Movies &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileNavbar />
      <main>
        <div className="pt-8 bg-white pb-7">
          <LayoutWrapper>
            <h1 className="text-3xl font-semibold tracking-wide text-gray-700 font-poppins">
              {moviesByKeyword.name}
            </h1>
          </LayoutWrapper>
        </div>
        <LayoutWrapper>
          <MoviesGrid
            mt="mt-8"
            movies={movies}
            setMovies={setMovies}
            shouldInfiniteScroll={true}
            setCurrentPagination={setMoviesCurrentPagination}
            infiniteScrollConfiguration={{
              type: GET_MOVIES_BY_KEYWORDS,
              url: '/api/movies',
              keywordId: moviesByKeyword.id,
              pagination: moviesCurrentPagination,
              totalPagination: moviesByKeyword.total_pages,
            }}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
        </LayoutWrapper>
      </main>
      <LayoutWrapper>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  /**
   * Keyword  id.
   * from : 10508-teacher
   * to   : 10508
   */
  const keywordId = slug.split('-')[0];

  try {
    const response = await Promise.all([
      axiosTMDb.get(`${KEYWORD_ENDPOINT}/${keywordId}/movies`),
      axiosTMDb.get(`${KEYWORD_ENDPOINT}/${keywordId}`),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
    ]);
    const data = {
      movies: response[0].data,
      imagesTMDbAPIConfiguration: response[2].data.images,
    };

    return {
      props: {
        moviesByKeyword: {
          name: response[1].data.name,
          ...data.movies,
        },
        imagesTMDbAPIConfiguration: data.imagesTMDbAPIConfiguration,
      },
      revalidate: 1 * 60,
    };
  } catch (err) {
    console.error({ err });
    return {
      props: {
        error: {
          message: 'Oops! Something went wrong.',
        },
      },
    };
  }
}
