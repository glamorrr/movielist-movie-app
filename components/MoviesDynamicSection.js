import Link from 'next/link';
import MovieDynamicCard from '@/components/MovieDynamicCard';

/**
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
      <header className="flex items-baseline justify-between">
        <h1 className="text-lg font-semibold tracking-wide text-gray-600 uppercase font-poppins md:tracking-wider">
          {headingTitle}
        </h1>
        <Link href={linkToPage}>
          <a className="text-xs font-semibold tracking-wider text-gray-400 transition-colors font-poppins hover:text-gray-500 lg:tracking-widest">
            View All
          </a>
        </Link>
      </header>
      <div className="grid grid-cols-3 mx-auto mt-5 lg:block sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-5">
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
