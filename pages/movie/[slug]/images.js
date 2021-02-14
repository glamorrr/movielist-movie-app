import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import MovieBackdrop from '@/components/MovieBackdrop';
import MobileNavbar from '@/components/MobileNavbar';
import MovieImagesFallback from '@/components/PageLoader/MovieImagesFallback';
import MovieImagesDetails from '@/components/MovieImagesDetails';
import Footer from '@/components/Footer';
import LayoutWrapper from '@/components/LayoutWrapper';
import axiosTMDb from '@/utils/axiosTMDb';
import { MOVIE_ENDPOINT, TMDb_API_CONFIGURATION_ENDPOINT } from '@/utils/TMDbEndpoint';
import formatReleaseDate from '@/utils/formatReleaseDate';
import parseToDashedString from '@/utils/parseToDashedString';

export default function Images({ movie, imagesTMDbAPIConfiguration, error }) {
  const { isFallback } = useRouter();

  if (isFallback) return <MovieImagesFallback />;

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
  const releaseYear = release_date ? new Date(release_date).getFullYear() : '';

  return (
    <>
      <Head>
        <title>
          {title} {releaseYear && `(${releaseYear}) `}Images &middot; MovieList
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={`${title} ${releaseYear} Images`} />
      </Head>
      <main>
        <MobileNavbar />
        <MovieBackdrop
          backdropPath={backdrop_path}
          imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
        />
        <div className="relative z-10">
          <LayoutWrapper>
            <div className="max-w-3xl p-6 mx-auto -mt-8 text-center text-gray-800 bg-white shadow-md font-poppins">
              <h1 className="text-3xl font-medium tracking-wide md:text-4xl">
                <Link href={`/movie/${movie.id}-${parseToDashedString(title)}`}>
                  <a className="transition-colors hover:text-blue-400">{title}</a>
                </Link>
              </h1>
              {releaseYear && (
                <p className="mt-2 text-2xl text-gray-400 md:mt-3 md:text-3xl">{releaseYear}</p>
              )}
            </div>
          </LayoutWrapper>
          <MovieImagesDetails
            movie={movie}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
        </div>
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
   * TMDb movie id.
   * from : 726739-cats-dogs-3-paws-unite
   * to   : 726739
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
         */
        append_to_response: 'images',
      },
    };

    const response = await Promise.all([
      axiosTMDb.get(`${MOVIE_ENDPOINT}/${movieId}`, movieRequestConfig),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
    ]);

    const data = {
      movie: {
        ...response[0].data,
        release_date: formatReleaseDate(response[0].data.release_date || ''),
      },
      imagesTMDbAPIConfiguration: response[1].data.images,
    };

    return {
      props: {
        movie: data.movie,
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
