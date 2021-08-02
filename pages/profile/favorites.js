import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import PosterPrimary from '@/components/PosterPrimary';
import LayoutWrapper from '@/components/LayoutWrapper';
import RemoveFavoriteButton from '@/components/RemoveFavoriteButton';
import MovieSimpleTooltipWrapper from '@/components/MovieSimpleTooltipWrapper';
import ProfileFallback from '@/components/PageLoader/ProfileFallback';
import ProfileLayout from '@/components/ProfileLayout';
import TMDbInfiniteScroll from '@/components/TMDbInfiniteScroll';
import { useAuth } from '@/utils/auth';
import axiosTMDb from '@/utils/axiosTMDb';
import { TMDb_API_CONFIGURATION_ENDPOINT } from '@/utils/TMDbEndpoint';
import { GET_FAVORITE_MOVIES } from '@/utils/TMDbType';
import parseToDashedString from '@/utils/parseToDashedString';

export default function Profile({ imagesTMDbAPIConfiguration }) {
  const { user } = useAuth();
  const router = useRouter();
  const [favoriteMovies, setFavoriteMovies] = useState(null);
  const [favoriteMoviesCurrentPagination, setFavoriteMoviesCurrentPagination] = useState(1);
  const [favoriteMoviesTotalPagination, setFavoriteMoviesTotalPagination] = useState(0);

  useEffect(() => {
    if (user === null) return;

    if (!user) {
      sessionStorage.setItem('urlBeforeLogin', '/profile/favorites');
      router.replace('/login');
      return;
    }

    (async () => {
      try {
        const res = await axios.get('/api/account', {
          params: {
            type: GET_FAVORITE_MOVIES,
            accountId: user.id,
          },
        });
        setFavoriteMovies(res.data.results);
        setFavoriteMoviesTotalPagination(res.data.total_pages);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  if (!user) return <ProfileFallback />;

  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;

  return (
    <ProfileLayout page="Favorites" imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}>
      <LayoutWrapper>
        <div className="p-4 mt-10 bg-white rounded sm:p-8">
          {!favoriteMovies && (
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
          {favoriteMovies && !favoriteMovies.length && (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg font-medium tracking-wide text-center text-gray-500 font-poppins">
                No Favorites
              </p>
              <Link href="/browse">
                <a className="px-6 py-3 text-lg text-white transition-colors bg-purple-500 shadow-md focus:ring-4 ring-blue-200 hover:text-gray-100 font-poppins text-semibold hover:bg-purple-600">
                  Find Your Favorite Movies
                </a>
              </Link>
            </div>
          )}
          {favoriteMovies && Boolean(favoriteMovies.length) && (
            <TMDbInfiniteScroll
              result={favoriteMovies}
              setResult={setFavoriteMovies}
              setCurrentPagination={setFavoriteMoviesCurrentPagination}
              infiniteScrollConfiguration={{
                type: GET_FAVORITE_MOVIES,
                url: '/api/account',
                accountId: user.id,
                pagination: favoriteMoviesCurrentPagination,
                totalPagination: favoriteMoviesTotalPagination,
              }}
            >
              <div className="grid grid-cols-3 gap-5 sm:gap-7 md:gap-8 sm:grid-cols-4 lg:gap-10 md:grid-cols-5">
                {favoriteMovies.map((movie) => (
                  <MovieSimpleTooltipWrapper movie={movie} key={movie.id}>
                    <CSSTransition
                      classNames="CSSTransitionScale"
                      timeout={300}
                      appear={true}
                      in={true}
                    >
                      <div className="relative block transition-colors cursor-pointer">
                        <RemoveFavoriteButton movieId={movie.id} setMovies={setFavoriteMovies} />
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
                  </MovieSimpleTooltipWrapper>
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
