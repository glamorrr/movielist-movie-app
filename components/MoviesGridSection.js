import Link from 'next/link';
import MoviesGrid from '@/components/MoviesGrid';

const MoviesGridSection = ({ headingTitle, linkToPage, movies, imagesTMDbAPIConfiguration }) => {
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
      <MoviesGrid
        movies={movies}
        shouldCountOrder={true}
        imagesTMDbAPIConfiguration={imagesTMDbAPIConfiguration}
      />
    </section>
  );
};

export default MoviesGridSection;
