import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import marked from 'marked';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import MovieBackdrop from '@/components/MovieBackdrop';
import MobileNavbar from '@/components/MobileNavbar';
import ReviewFallback from '@/components/PageLoader/ReviewFallback';
import Footer from '@/components/Footer';
import LayoutWrapper from '@/components/LayoutWrapper';
import axiosTMDb from '@/utils/axiosTMDb';
import {
  REVIEW_ENDPOINT,
  MOVIE_ENDPOINT,
  TMDb_API_CONFIGURATION_ENDPOINT,
} from '@/utils/TMDbEndpoint';
import DOMPurify from '@/utils/DOMPurify';
import parseToDashedString from '@/utils/parseToDashedString';

export default function Review({ review, imagesTMDbAPIConfiguration, error }) {
  const { isFallback } = useRouter();

  if (isFallback) return <ReviewFallback />;

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

  const { media_backdrop_path } = review;

  return (
    <>
      <Head>
        <title>
          {review.author}'s review of {review.media_title} &middot; MovieList
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`${review.author}'s review of ${review.media_title} movie.`}
        />
      </Head>
      <main>
        <MobileNavbar />
        <MovieBackdrop
          type="banner"
          backdropPath={media_backdrop_path}
          imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
        />
        <div className="relative z-10">
          <LayoutWrapper>
            <p className="pt-5 text-sm text-right text-gray-400 font-poppins">
              {review.updated_at}
            </p>
            <div className="mt-8 text-center md:mt-24 font-poppins text-gray-50">
              <h1 className="text-4xl font-medium tracking-wide">
                <Link
                  legacyBehavior
                  href={`/movie/${review.media_id}-${parseToDashedString(review.media_title)}`}
                >
                  <a className="transition-colors hover:text-blue-400">{review.media_title}</a>
                </Link>
              </h1>
              <p className="mt-2 italic text-gray-300">a review by {review.author}</p>
            </div>
            <article
              className="w-full p-8 mx-auto mt-8 overflow-hidden prose bg-white rounded shadow-md md:mt-12"
              dangerouslySetInnerHTML={{ __html: review.content }}
            />
          </LayoutWrapper>
        </div>
      </main>
      <LayoutWrapper>
        <Footer />
      </LayoutWrapper>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const reviewId = slug;

  try {
    const responseReview = await axiosTMDb.get(`${REVIEW_ENDPOINT}/${reviewId}`);
    const movieId = responseReview.data.media_id;
    const responseMovie = await Promise.all([
      axiosTMDb.get(`${MOVIE_ENDPOINT}/${movieId}`),
      axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT),
    ]);

    const data = {
      review: {
        ...responseReview.data,
        content: DOMPurify.sanitize(marked(responseReview.data.content)),
        media_backdrop_path: responseMovie[0].data.backdrop_path,
        updated_at: formatDistanceToNow(new Date(responseReview.data.updated_at), {
          addSuffix: true,
        }),
      },
      imagesTMDbAPIConfiguration: responseMovie[1].data.images,
    };

    return {
      props: {
        review: data.review,
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
