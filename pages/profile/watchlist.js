import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import PosterPrimary from '@/components/PosterPrimary';
import LayoutWrapper from '@/components/LayoutWrapper';
import RemoveWatchlistButton from '@/components/RemoveWatchlistButton';
import ProfileFallback from '@/components/PageLoader/ProfileFallback';
import ProfileLayout from '@/components/ProfileLayout';
import TMDbInfiniteScroll from '@/components/TMDbInfiniteScroll';
import { useAuth } from '@/utils/auth';
import axiosTMDb from '@/utils/axiosTMDb';
import { TMDb_API_CONFIGURATION_ENDPOINT } from '@/utils/TMDbEndpoint';
import { GET_WATCHLIST } from '@/utils/TMDbType';
import parseToDashedString from '@/utils/parseToDashedString';

export default function Profile({ imagesTMDbAPIConfiguration }) {
  const { user } = useAuth();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState(null);
  const [watchlistCurrentPagination, setWatchlistCurrentPagination] = useState(1);
  const [watchlistTotalPagination, setWatchlistTotalPagination] = useState(0);

  useEffect(() => {
    if (user === null) return;

    if (!user) {
      sessionStorage.setItem('urlBeforeLogin', '/profile/watchlist');
      router.replace('/login');
      return;
    }

    (async () => {
      try {
        const res = await axios.get('/api/account', {
          params: {
            type: GET_WATCHLIST,
            accountId: user.id,
          },
        });
        setWatchlist(res.data.results);
        setWatchlistTotalPagination(res.data.total_pages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  if (!user) return <ProfileFallback />;

  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;

  return (
    <ProfileLayout page="Watchlist" imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}>
      <LayoutWrapper>
        <div className="p-4 mt-10 bg-white rounded sm:p-8">
          {!watchlist && (
            <div className="grid grid-cols-3 gap-5 sm:gap-7 md:gap-8 sm:grid-cols-4 lg:gap-10 md:grid-cols-5">
              {Array(10)
                .fill()
                .map((_, i) => (
                  <CSSTransition
                    key={i}
                    classNames="CSSTransitionScale"
                    timeout={300}
                    appear={true}
                    in={true}
                  >
                    <div
                      className="bg-blue-100 rounded-md animate-pulse"
                      style={{ maxWidth: '185px' }}
                    >
                      <div className="w-full aspect-w-2 aspect-h-3" />
                    </div>
                  </CSSTransition>
                ))}
            </div>
          )}
          {watchlist && !watchlist.length && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg font-medium tracking-wide text-center text-gray-500 font-poppins">
                No Watchlist
              </p>
              <Link href="/browse">
                <a className="px-6 py-3 text-lg text-white transition-colors bg-purple-500 shadow-md focus:ring-4 ring-blue-200 hover:text-gray-100 font-poppins text-semibold hover:bg-purple-600">
                  Find Your Movies
                </a>
              </Link>
            </div>
          )}
          {watchlist && Boolean(watchlist.length) && (
            <TMDbInfiniteScroll
              result={watchlist}
              setResult={setWatchlist}
              setCurrentPagination={setWatchlistCurrentPagination}
              infiniteScrollConfiguration={{
                type: GET_WATCHLIST,
                url: '/api/account',
                accountId: user.id,
                pagination: watchlistCurrentPagination,
                totalPagination: watchlistTotalPagination,
              }}
            >
              <div className="grid grid-cols-3 gap-5 sm:gap-7 md:gap-8 sm:grid-cols-4 lg:gap-10 md:grid-cols-5">
                {watchlist.map((movie) => (
                  <CSSTransition
                    key={movie.id}
                    classNames="CSSTransitionScale"
                    timeout={300}
                    appear={true}
                    in={true}
                  >
                    <div className="relative block transition-colors cursor-pointer">
                      <RemoveWatchlistButton movieId={movie.id} setMovies={setWatchlist} />
                      <Link
                        key={movie.id}
                        href={`/movie/${movie.id}-${parseToDashedString(movie.title)}`}
                      >
                        <a>
                          <PosterPrimary
                            maxWidth="185px"
                            path={movie.poster_path}
                            src={`${base_url}${poster_sizes[2]}${movie.poster_path}`}
                            alt={movie.title}
                          />
                        </a>
                      </Link>
                    </div>
                  </CSSTransition>
                ))}
              </div>
            </TMDbInfiniteScroll>
          )}
        </div>
      </LayoutWrapper>
    </ProfileLayout>
  );
}

export async function getStaticProps() {
  try {
    const response = await axiosTMDb.get(TMDb_API_CONFIGURATION_ENDPOINT);
    return {
      props: {
        imagesTMDbAPIConfiguration: response.data.images,
      },
      revalidate: 1 * 60 * 60 * 24 * 30,
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
