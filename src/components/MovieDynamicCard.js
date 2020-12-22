import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdSentimentSatisfied } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import BadgeNumber from './BadgeNumber';
import MovieCard from './MovieCard';
import BadgeGenre from './BadgeGenre';
import Icon from './Icon';
import convertUnitNumberToPercentage from '../utils/convertUnitNumberToPercentage';
import parseToDashedString from '../utils/parseToDashedString';

/**
 * Used in /browse.
 */
const MovieDynamicCard = ({ movie, orderOfMovie, genres, imagesTMDbAPIConfiguration }) => {
  const router = useRouter();

  const { title, id, poster_path, release_date, vote_average, vote_count, genre_ids } = movie;
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;

  // Duration in miliseconds.
  const animationDuration = 300;

  const handleClick = (e) => {
    e.preventDefault();
    const dashedMovieTitle = parseToDashedString(title);

    router.push(`/movie/${id}-${dashedMovieTitle}`).then(() => window.scrollTo(0, 0));
  };

  return (
    <>
      {/* View on mobile width size < 1024 */}
      <div className="lg:hidden">
        <MovieCard movie={movie} imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}>
          <BadgeNumber order={orderOfMovie} />
        </MovieCard>
      </div>

      {/* View on Desktop	*/}
      <CSSTransition classNames="movieLongCard" timeout={animationDuration} appear={true} in={true}>
        <article className="hidden mt-6 lg:flex relative justify-center items-center text-gray-500 transition-colors ">
          <div className="flex w-20 justify-center items-center font-poppins font-semibold text-2xl text-blue-300">
            <span className="font-light text-base">#</span>
            {orderOfMovie}
          </div>

          <div className="flex w-full ml-4 p-2 bg-white shadow-lg rounded-sm">
            <div className="relative flex bg-blue-100 rounded-sm shadow-sm overflow-hidden">
              <Image
                src={
                  poster_path
                    ? `${base_url}${poster_sizes[2]}${poster_path}`
                    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                }
                alt={title}
                width={185 / 4}
                height={278 / 4}
              />
            </div>

            <div className="ml-4 py-2 w-full grid grid-cols-4">
              <div className="col-span-2 pr-4">
                <h2
                  className="font-poppins font-semibold hover:text-blue-400 tracking-wide	truncate cursor-pointer transition-colors"
                  onClick={handleClick}
                >
                  {title}
                </h2>

                <div className="flex mt-1">
                  {genre_ids.length !== 0 &&
                    genre_ids.map((id) => <BadgeGenre genre={genres[id]} key={id} />)}
                </div>
              </div>

              <div className="flex col-span-1">
                <Icon size="1.3rem" className="text-green-500">
                  <MdSentimentSatisfied />
                </Icon>

                <div className="ml-2">
                  <p className="font-poppins font-medium">
                    {convertUnitNumberToPercentage(vote_average)}
                  </p>

                  <p className="mt-1 font-poppins font-medium text-gray-400 text-sm tracking-wider leading-3 truncate">
                    {vote_count} users
                  </p>
                </div>
              </div>

              <div className="col-span-1">
                <p className="font-poppins font-medium tracking-wide">Released</p>

                <p className="mt-1 font-poppins font-medium text-gray-400 text-sm tracking-wider leading-3 truncate">
                  {new Date(release_date).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </article>
      </CSSTransition>

      <style jsx>{`
        .movieLongCard-appear {
          opacity: 0;
        }

        .movieLongCard-appear-active {
          opacity: 1;
          transition: opacity ${animationDuration}ms ease-in-out;
        }
      `}</style>
    </>
  );
};

export default MovieDynamicCard;
