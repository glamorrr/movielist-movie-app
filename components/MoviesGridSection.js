import Link from 'next/link';
import MoviesGrid from '@/components/MoviesGrid';

const MoviesGridSection = ({ headingTitle, linkToPage, movies, imagesTMDbAPIConfiguration }) => {
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
      <MoviesGrid
        movies={movies}
        shouldCountOrder={true}
        imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
      />
    </section>
  );
};

export default MoviesGridSection;
