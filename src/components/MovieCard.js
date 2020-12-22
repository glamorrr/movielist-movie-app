import { useRouter } from 'next/router';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import parsedToDashedString from '../utils/parseToDashedString';

/**
 * Used in /browse, /movies/popular, /movies/trending/now,
 * /movies/trending/week, /movies/upcoming, and /movies/top-100.
 */
const MovieCard = ({
  movie,
  orderOfMovie,
  imagesTMDbAPIConfiguration: { base_url, poster_sizes },
  children,
}) => {
  const { title, id, poster_path } = movie;

  const router = useRouter();

  // Duration in miliseconds.
  const animationDuration = 300;

  const handleClick = (e) => {
    e.preventDefault();
    const dashedMovieTitle = parsedToDashedString(title);

    router.push(`/movie/${id}-${dashedMovieTitle}`).then(() => window.scrollTo(0, 0));
  };

  return (
    <>
      <CSSTransition classNames="movieCard" timeout={animationDuration} appear={true} in={true}>
        <article
          className={
            `${orderOfMovie && orderOfMovie >= 5 ? 'sm:hidden' : ''} ${
              orderOfMovie && orderOfMovie <= 5 ? 'md:block' : ''
            }` + ' relative text-gray-500 hover:text-blue-400 cursor-pointer transition-colors'
          }
          onClick={handleClick}
        >
          {children}

          {/* Some responsive image haxxx */}
          <div style={{ maxWidth: '185px' }} className="relative">
            <div
              style={{ width: '100%', paddingTop: '150%' }}
              className="bg-blue-100 relative flex justify-center items-center rounded-md lg:rounded shadow-lg lg:shadow-xl overflow-hidden"
            >
              <Image
                src={
                  poster_path
                    ? `${base_url}${poster_sizes[2]}${poster_path}`
                    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                }
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <h2
            style={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
            className="mt-2 md:mt-3 font-poppins text-sm sm:text-base font-medium md:font-semibold overflow-ellipsis overflow-hidden whitespace-pre-wrap leading-5"
          >
            {title}
          </h2>
        </article>
      </CSSTransition>

      <style jsx>{`
        .movieCard-appear {
          opacity: 0;
          transform: scale(0.9);
        }

        .movieCard-appear-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity ${animationDuration - 100}ms ease-in-out,
            transform ${animationDuration}ms ease-in-out;
        }
      `}</style>
    </>
  );
};

export default MovieCard;
