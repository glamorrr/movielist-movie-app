import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import LayoutWrapper from '@/components/LayoutWrapper';
import PersonCard from '@/components/PersonCard';
import MovieInformation from '@/components/MovieInformation';
import RecommendationMovieCard from '@/components/RecommmendationMovieCard';
import PosterPrimary from '@/components/PosterPrimary';
import MovieReviewCard from '@/components/MovieReviewCard';
import MovieDetailsTab from '@/components/MovieDetailsTab';
import TMDbInfiniteScroll from '@/components/TMDbInfiniteScroll';
import FavoriteButton from '@/components/FavoriteButton';
import { GET_MOVIE_ACCOUNT_STATES, GET_MOVIE_RECOMMENDATIONS } from '@/utils/TMDbType';

const MovieDetails = ({ movie, imagesTMDbAPIConfiguration }) => {
  const Tabs = ['Overview', 'Cast', 'Crew', 'Recommendations'];
  const {
    title,
    imdb_id,
    overview,
    poster_path,
    videos,
    recommendations,
    reviews,
    images: { posters, backdrops },
    credits: { cast, crew },
  } = movie;
  const director = crew.find((person) => person.job === 'Director')?.name;
  const trailer = videos.results.find((video) => video.type === 'Trailer')?.key
    ? `https://www.youtube.com/embed/${
        videos.results.find((video) => video.type === 'Trailer').key
      }?rel=0`
    : null;
  const isCast = cast.length > 0;
  const isCrew = crew.length > 0;
  const isPosters = posters.length > 0;
  const isBackdrops = backdrops.length > 0;
  const isRecommendations = recommendations.results.length > 0;
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;

  const router = useRouter();
  const [recommendationMovies, setRecommendationMovies] = useState(recommendations.results);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/api/movies', {
          params: { type: GET_MOVIE_ACCOUNT_STATES, movie_id: movie.id },
        });
        console.log({ accountState: res.data });
        setIsFavorite(res.data.favorite);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
      <div className="text-gray-700 bg-white">
        <LayoutWrapper>
          <div style={{ gridTemplateColumns: '14rem auto' }} className="md:grid">
            <CSSTransition classNames="CSSTransitionOpacity" timeout={300} appear={true} in={true}>
              <div className="flex items-end space-x-5 md:space-x-0">
                <div className="relative z-20 -mt-28 w-28 md:w-56">
                  <PosterPrimary
                    maxWidth="224px"
                    path={poster_path}
                    src={`${base_url}${poster_sizes[3]}${poster_path}`}
                    alt={title}
                  />
                </div>
                <div className="md:hidden">
                  <FavoriteButton
                    movieId={movie.id}
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                  />
                </div>
              </div>
            </CSSTransition>
            {/* Desktop view > 768px (md) */}
            <div className="hidden mt-6 md:block ml-7">
              <h1 className="text-2xl font-medium font-poppins">{title}</h1>
              <p className="mt-3">{overview}</p>
            </div>
            <div className="hidden mt-5 md:block justify-self-end">
              <FavoriteButton
                movieId={movie.id}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
              />
            </div>
            <ul className="hidden mt-10 space-x-8 ml-7 md:col-start-2 md:flex font-poppins">
              {Tabs.map((tab) => {
                if (tab === 'Cast' && !isCast) return;
                if (tab === 'Crew' && !isCrew) return;
                if (tab === 'Recommendations' && !isRecommendations) return;
                return (
                  <MovieDetailsTab
                    key={tab}
                    tab={tab}
                    isSelected={selectedTab === tab}
                    handleClick={() => setSelectedTab(tab)}
                  />
                );
              })}
            </ul>
          </div>
          {/* Mobile view < 768px (md) */}
          <h1 className="pb-6 mt-4 text-2xl font-medium md:hidden font-poppins">{title}</h1>
          <ul
            style={{ WebkitOverflowScrolling: 'touch' }}
            className="flex pb-4 space-x-6 overflow-x-scroll md:hidden font-poppins"
          >
            {Tabs.map((tab) => {
              if (tab === 'Cast' && !isCast) return;
              if (tab === 'Crew' && !isCrew) return;
              if (tab === 'Recommendations' && !isRecommendations) return;
              return (
                <MovieDetailsTab
                  key={tab}
                  tab={tab}
                  isSelected={selectedTab === tab}
                  handleClick={() => setSelectedTab(tab)}
                />
              );
            })}
          </ul>
        </LayoutWrapper>
      </div>
      <LayoutWrapper>
        <div className="items-start md:mt-10 md:flex">
          <div className="flex flex-col md:block">
            <div className="flex flex-col order-2 mt-6 space-y-4 md:mt-0">
              {(isPosters || isBackdrops) && (
                <Link href={`${router.asPath}/images`}>
                  <a className="order-2 block position">
                    <button
                      type="button"
                      className="w-full py-1 font-medium text-center text-white transition-colors bg-purple-500 shadow focus:ring-4 ring-blue-200 focus:outline-none md:w-56 hover:bg-purple-600 hover:text-gray-100 font-poppins"
                    >
                      See Images
                    </button>
                  </a>
                </Link>
              )}
              {imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${imdb_id}`}
                  target="_blank"
                  className="order-3 block"
                >
                  <button
                    type="button"
                    className="w-full py-1 font-medium text-center text-white transition-colors bg-yellow-500 shadow focus:ring-4 ring-blue-200 focus:outline-none md:w-56 hover:bg-yellow-600 hover:text-gray-100 font-poppins"
                  >
                    IMDb
                  </button>
                </a>
              )}
            </div>
            <MovieInformation movie={{ ...movie, director }} />
          </div>
          <div className="flex-grow mt-6 md:mt-0">
            {selectedTab === 'Overview' && (
              <div>
                <section className="mt-6 shadow-sm md:hidden">
                  <h2 className="text-lg font-medium tracking-wide font-poppins">Description</h2>
                  <div className="p-4 mt-3 bg-white rounded">
                    <p>{overview}</p>
                  </div>
                </section>
                <div className="mt-6 space-y-8 md:mt-0">
                  {isCast && (
                    <section>
                      <h2 className="text-lg font-medium tracking-wide font-poppins">Cast</h2>
                      <div className="grid grid-cols-1 gap-6 mt-3 lg:gap-x-8 md:grid-cols-2">
                        {cast.slice(0, 6).map((person) => (
                          <PersonCard
                            key={person.id}
                            person={person}
                            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {isCrew && (
                    <section>
                      <h2 className="text-lg font-medium tracking-wide font-poppins">Crew</h2>
                      <div className="grid grid-cols-1 gap-6 mt-3 lg:gap-x-8 md:grid-cols-2">
                        {crew.slice(0, 4).map((person) => (
                          <PersonCard
                            key={person.id}
                            person={person}
                            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {trailer && (
                    <section>
                      <h2 className="text-lg font-medium tracking-wide font-poppins">Trailer</h2>
                      <div className="max-w-2xl mt-3">
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            title={`${title} trailer`}
                            src={trailer}
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </section>
                  )}
                  {isRecommendations && (
                    <section>
                      <h2 className="text-lg font-medium tracking-wide font-poppins">
                        Recommendations
                      </h2>
                      <div
                        style={{ WebkitOverflowScrolling: 'touch' }}
                        className="flex pb-2 mt-3 space-x-6 overflow-x-scroll md:max-w-md lg:max-w-2xl xl:max-w-3xl"
                      >
                        {recommendations.results.map((movie) => (
                          <RecommendationMovieCard
                            key={movie.id}
                            movie={movie}
                            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {reviews.results.length > 0 && (
                    <section>
                      <h2 className="text-lg font-medium tracking-wide font-poppins">Reviews</h2>
                      <div className="mt-3 space-y-6">
                        {reviews.results.map((review) => (
                          <MovieReviewCard
                            key={review.id}
                            id={review.id}
                            author={review.author}
                            avatarPath={review.author_details.avatar_path}
                            content={review.content}
                            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            )}
            {selectedTab === 'Cast' && (
              <div className="grid flex-grow grid-cols-1 gap-6 lg:gap-x-8 md:grid-cols-2">
                {cast.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                  />
                ))}
              </div>
            )}
            {selectedTab === 'Crew' && (
              <div className="grid flex-grow grid-cols-1 gap-6 lg:gap-x-8 md:grid-cols-2">
                {crew.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                  />
                ))}
              </div>
            )}
            {selectedTab === 'Recommendations' && (
              <TMDbInfiniteScroll
                result={recommendationMovies}
                setResult={setRecommendationMovies}
                setCurrentPagination={setCurrentPagination}
                infiniteScrollConfiguration={{
                  type: GET_MOVIE_RECOMMENDATIONS,
                  url: '/api/movies',
                  movieId: movie.id,
                  pagination: currentPagination,
                  totalPagination: recommendations.total_pages,
                }}
              >
                <div className="grid flex-grow grid-cols-3 gap-4 sm:gap-6 sm:grid-cols-4 lg:grid-cols-5">
                  {recommendationMovies.map((recommendationMovie) => (
                    <RecommendationMovieCard
                      key={recommendationMovie.id}
                      movie={recommendationMovie}
                      imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                    />
                  ))}
                </div>
              </TMDbInfiniteScroll>
            )}
          </div>
        </div>
      </LayoutWrapper>
    </>
  );
};

export default MovieDetails;
