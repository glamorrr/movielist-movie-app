import { useRouter } from 'next/router';
import Head from 'next/head';
import format from 'date-fns/format';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import MobileNavbar from '@/components/MobileNavbar';
import PersonDetails from '@/components/PersonDetails';
import Footer from '@/components/Footer';
import PersonFallback from '@/components/PageLoader/PersonFallback';
import LayoutWrapper from '@/components/LayoutWrapper';
import axiosTMDb from '@/utils/axiosTMDb';
import { PERSON_ENDPOINT, TMDb_API_CONFIGURATION_ENDPOINT } from '@/utils/TMDbEndpoint';
import setGender from '@/utils/setGender';
import getCreditsYear from '@/utils/getCreditsYear';

export default function Person({ person, imagesTMDbAPIConfiguration, error }) {
  const { isFallback } = useRouter();

  if (isFallback) return <PersonFallback />;

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

  const { name } = person;

  return (
    <>
      <Head>
        <title>{name} &middot; MovieList</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={`${name}'s movie and role.`} />
      </Head>
      <main>
        <MobileNavbar />
        <PersonDetails person={person} imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration} />
      </main>
      <LayoutWrapper>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  /**
   * TMDb person id.
   * from : 287-brad-pitt
   * to   : 287
   */
  const personId = slug.split('-')[0];

  try {
    const movieRequestConfig = {
      params: {
        /**
         * This makes it possible to make sub requests
         * within the same namespace in a single HTTP request.
         * You can issue multiple requests,
         * just comma separate the values.
         */
        append_to_response: 'movie_credits,external_ids',
      },
    };

    const response = await Promise.all([
      axiosTMDb.get(`${PERSON_ENDPOINT}/${personId}`, movieRequestConfig),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
    ]);
    const {
      birthday,
      gender,
      deathday,
      movie_credits: { cast, crew },
    } = response[0].data;

    let creditsYear = [];
    if (cast.length) creditsYear = [...getCreditsYear(cast)];
    if (crew.length) creditsYear = [...creditsYear, ...getCreditsYear(crew)];
    if (creditsYear.length) creditsYear = [...new Set(creditsYear)].sort((a, b) => b - a);

    let movieCredits = [...cast, ...crew];
    if (creditsYear.length) {
      movieCredits = creditsYear.map((year) => ({
        year,
        credits: year
          ? movieCredits.filter((credit) => new Date(credit.release_date).getFullYear() === year)
          : movieCredits.filter((credit) => !credit.release_date),
      }));
    }

    const data = {
      person: {
        ...response[0].data,
        gender: setGender(gender),
        birthday: birthday ? format(new Date(birthday), 'LLLL d, yyyy') : null,
        deathday: deathday ? format(new Date(deathday), 'LLLL d, yyyy') : null,
        movie_credits: movieCredits,
        age: birthday
          ? `${formatDistanceStrict(
              new Date(birthday),
              deathday ? new Date(deathday) : Date.now(),
              {
                unit: 'year',
              }
            )} old`
          : null,
      },
      imagesTMDbAPIConfiguration: response[1].data.images,
    };

    return {
      props: {
        person: data.person,
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
