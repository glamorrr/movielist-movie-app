import Link from 'next/link';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import parseToDashedString from '@/utils/parseToDashedString';

const MovieCard = ({
  movie,
  orderOfMovie,
  imagesTMDbAPIConfiguration: { base_url, poster_sizes },
  children,
}) => {
  const { title, id, poster_path } = movie;
  const animationDuration = 300;

  return (
    <>
      <CSSTransition classNames="movieCard" timeout={animationDuration} appear={true} in={true}>
        <Link href={`/movie/${id}-${parseToDashedString(title)}`}>
          <a
            className={
              `${orderOfMovie && orderOfMovie >= 5 ? 'sm:hidden' : ''} ${
                orderOfMovie && orderOfMovie <= 5 ? 'md:block' : ''
              }` +
              ' block relative text-gray-500 hover:text-blue-400 cursor-pointer transition-colors'
            }
            // onClick={handleClick}
          >
            {children}
            <div style={{ maxWidth: '185px' }}>
              <div className="overflow-hidden bg-blue-100 rounded-md shadow-lg aspect-w-2 aspect-h-3 lg:rounded lg:shadow-xl">
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
            <h2 className="mt-2 text-sm font-medium leading-5 md:mt-3 font-poppins sm:text-base md:font-semibold line-clamp-2">
              {title}
            </h2>
          </a>
        </Link>
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
