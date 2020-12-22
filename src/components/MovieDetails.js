import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import LayoutWrapper from './LayoutWrapper';
import MovieCastCard from './MovieCastCard';

/**
 * Used in /movie/[slug].
 */
const MovieDetails = ({ movie, imagesTMDbAPIConfiguration }) => {
  const {
    title,
    overview,
    poster_path,
    credits: { cast },
  } = movie;
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;

  // Duration in miliseconds.
  const animationDuration = 300;

  return (
    <>
      <div className="bg-white md:pb-16">
        <LayoutWrapper>
          <div style={{ gridTemplateColumns: '14rem auto' }} className="md:grid">
            <CSSTransition
              classNames="movieCard"
              timeout={animationDuration}
              appear={true}
              in={true}
            >
              <div className="relative justify-center md:w-56 h-12 md:h-52">
                <div className="absolute z-20 -top-28 w-28 md:w-56 h-40 md:h-80 bg-blue-100 rounded shadow-lg md:shadow-xl overflow-hidden">
                  <Image
                    src={
                      poster_path
                        ? `${base_url}${poster_sizes[3]}${poster_path}`
                        : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2393C5FD' fill-opacity='0.31'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                    }
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </CSSTransition>

            {/* Desktop view > 768px (md) */}
            <div className="hidden md:block mt-6 ml-7">
              <h1 className="font-poppins font-medium text-2xl text-gray-700">{title}</h1>

              <p className="mt-3">{overview}</p>
            </div>
          </div>

          {/* Mobile view < 768px (md) */}
          <h1 className="md:hidden mt-4 pb-6 font-poppins font-medium text-2xl text-gray-700">
            {title}
          </h1>
        </LayoutWrapper>
      </div>

      <LayoutWrapper>
        <div className="md:hidden shadow-sm">
          <h2 className="mt-6 font-poppins text-lg text-gray-700 font-medium tracking-wide">
            Description
          </h2>

          <div className="mt-3 p-4 text-gray-700 bg-white rounded">
            <p>{overview}</p>
          </div>
        </div>

        <div>
          <h2 className="mt-6 font-poppins text-lg text-gray-700 font-medium tracking-wide">
            Cast
          </h2>

          <div className="mt-3 grid gap-x-8 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {cast.map((person) => (
              <MovieCastCard
                key={person.id}
                person={person}
                imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
              />
            ))}
          </div>
        </div>
      </LayoutWrapper>

      <style jsx>{`
        .movieCard-appear {
          opacity: 0;
        }

        .movieCard-appear-active {
          opacity: 1;
          transition: opacity ${animationDuration}ms ease-in-out;
        }
      `}</style>
    </>
  );
};

export default MovieDetails;
