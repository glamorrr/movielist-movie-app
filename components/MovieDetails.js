import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import LayoutWrapper from '@/components/LayoutWrapper';
import PersonCard from '@/components/PersonCard';
import MovieInformation from '@/components/MovieInformation';

const MovieDetails = ({ movie, imagesTMDbAPIConfiguration }) => {
  const {
    title,
    overview,
    poster_path,
    videos,
    credits: { cast, crew },
  } = movie;
  const director = crew.find((person) => person.job === 'Director')?.name;
  const trailer = videos.results.find((video) => video.type === 'Trailer')?.key
    ? `https://www.youtube.com/embed/${
        videos.results.find((video) => video.type === 'Trailer').key
      }?rel=0`
    : null;
  const { base_url, poster_sizes } = imagesTMDbAPIConfiguration;
  const animationDuration = 300;

  return (
    <>
      <div className="md:pb-16 bg-white text-gray-700">
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
              <h1 className="font-poppins font-medium text-2xl">{title}</h1>
              <p className="mt-3">{overview}</p>
            </div>
          </div>
          {/* Mobile view < 768px (md) */}
          <h1 className="md:hidden mt-4 pb-6 font-poppins font-medium text-2xl">{title}</h1>
        </LayoutWrapper>
      </div>
      <LayoutWrapper>
        <div className="md:mt-4 md:flex items-start">
          <MovieInformation movie={{ ...movie, director }} />
          <div className="mt-6 md:hidden shadow-sm">
            <h2 className="font-poppins text-lg font-medium tracking-wide">Description</h2>
            <div className="mt-3 p-4 bg-white rounded">
              <p>{overview}</p>
            </div>
          </div>
          <div className="mt-6 flex-grow">
            <div>
              <h2 className="font-poppins text-lg font-medium tracking-wide">Cast</h2>
              <div className="mt-3 grid gap-6 lg:gap-x-8 grid-cols-1 md:grid-cols-2">
                {cast.slice(0, 6).map((person) => (
                  <PersonCard
                    key={person.credit_id}
                    name={person.name}
                    role={person.character}
                    profilePath={person.profile_path}
                    imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="font-poppins text-lg font-medium tracking-wide">Crew</h2>
              <div className="mt-3 grid gap-6 lg:gap-x-8 grid-cols-1 md:grid-cols-2">
                {crew.slice(0, 4).map((person) => (
                  <PersonCard
                    key={person.credit_id}
                    name={person.name}
                    role={person.job}
                    profilePath={person.profile_path}
                    imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
                  />
                ))}
              </div>
            </div>
            {trailer && (
              <div className="mt-8">
                <h2 className="font-poppins text-lg font-medium tracking-wide">Trailer</h2>
                <div className="mt-3 max-w-2xl">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe src={trailer} frameBorder="0" allowFullScreen />
                  </div>
                </div>
              </div>
            )}
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
