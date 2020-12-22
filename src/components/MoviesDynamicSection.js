import Link from 'next/link';
import MovieDynamicCard from './MovieDynamicCard';

/**
 * Used in /browse.
 *
 * MoviesDynamicSection used in
 * Top Rated movies component.
 * If user in mobile it will display grid,
 * if user in desktop it will display block.
 */
const MoviesDynamicSection = ({
  headingTitle,
  linkToPage,
  movies,
  genres,
  imagesTMDbAPIConfiguration,
}) => {
  return (
    <section className="mt-10">
      <header className="flex justify-between items-baseline">
        <h1 className="font-poppins font-semibold uppercase text-lg text-gray-600 tracking-wide md:tracking-wider">
          {headingTitle}
        </h1>

        <Link href={linkToPage}>
          <a className="font-poppins font-semibold text-xs text-gray-400 hover:text-gray-500 tracking-wider lg:tracking-widest transition-colors">
            View All
          </a>
        </Link>
      </header>

      <div className="lg:block mt-5 mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5">
        {movies.map((movie, i) => (
          <MovieDynamicCard
            key={movie.id}
            movie={movie}
            orderOfMovie={i + 1}
            genres={genres}
            imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
          />
        ))}
      </div>
    </section>
  );
};

export default MoviesDynamicSection;
