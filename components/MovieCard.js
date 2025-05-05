import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import PosterPrimary from '@/components/PosterPrimary';
import parseToDashedString from '@/utils/parseToDashedString';

const MovieCard = ({
  movie,
  orderOfMovie,
  imagesTMDbAPIConfiguration: { base_url, poster_sizes },
  children,
}) => {
  const { title, id, poster_path } = movie;

  return (
    <CSSTransition classNames="CSSTransitionScale" timeout={300} appear={true} in={true}>
      <Link legacyBehavior href={`/movie/${id}-${parseToDashedString(title)}`}>
        <a
          className={
            `${orderOfMovie && orderOfMovie >= 5 ? 'sm:hidden' : ''} ${
              orderOfMovie && orderOfMovie <= 5 ? 'md:block' : ''
            }` +
            ' block relative text-gray-500 hover:text-blue-400 cursor-pointer transition-colors'
          }
        >
          {children}
          <PosterPrimary
            maxWidth="185px"
            path={poster_path}
            src={`${base_url}${poster_sizes[2]}${poster_path}`}
            alt={title}
          />
          <h2 className="mt-2 text-sm font-medium leading-5 md:mt-3 font-poppins sm:text-base md:font-semibold line-clamp-2">
            {title}
          </h2>
        </a>
      </Link>
    </CSSTransition>
  );
};

export default MovieCard;
