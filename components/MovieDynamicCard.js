import Image from 'next/image';
import Link from 'next/link';
import { MdSentimentSatisfied } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import BadgeNumber from '@/components/BadgeNumber';
import MovieCard from '@/components/MovieCard';
import BadgeGenre from '@/components/BadgeGenre';
import Icon from '@/components/Icon';
import convertUnitNumberToPercentage from '@/utils/convertUnitNumberToPercentage';
import parseToDashedString from '@/utils/parseToDashedString';

const MovieDynamicCard = ({ movie, orderOfMovie, genres, imagesTMDbAPIConfiguration }) => {
  const { title, id, poster_path, release_date, vote_average, vote_count, genre_ids } = movie;
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;
  const animationDuration = 300;

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
        <article className="relative items-center justify-center hidden mt-6 text-gray-500 transition-colors lg:flex ">
          <div className="flex items-center justify-center w-20 text-2xl font-semibold text-blue-300 font-poppins">
            <span className="text-base font-light">#</span>
            {orderOfMovie}
          </div>
          <div className="flex w-full p-2 ml-4 bg-white rounded-sm shadow-lg">
            <div className="relative flex overflow-hidden bg-blue-100 rounded-sm shadow-sm">
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
            <div className="grid w-full grid-cols-4 py-2 ml-4">
              <div className="col-span-2 pr-4">
                <Link href={`/movie/${id}-${parseToDashedString(title)}`}>
                  <a className="block font-semibold tracking-wide truncate transition-colors cursor-pointer font-poppins hover:text-blue-400">
                    {title}
                  </a>
                </Link>
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
                  <p className="font-medium font-poppins">
                    {convertUnitNumberToPercentage(vote_average)}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-3 tracking-wider text-gray-400 truncate font-poppins">
                    {vote_count} users
                  </p>
                </div>
              </div>
              <div className="col-span-1">
                <p className="font-medium tracking-wide font-poppins">Released</p>
                <p className="mt-1 text-sm font-medium leading-3 tracking-wider text-gray-400 truncate font-poppins">
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
