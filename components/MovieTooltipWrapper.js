import dynamic from 'next/dynamic';
import BadgeGenre from '@/components/BadgeGenre';
import convertUnitNumberToPercentage from '@/utils/convertUnitNumberToPercentage';

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false,
});

const MovieTooltipWrapper = ({ movie, genres, children }) => {
  return (
    <div data-tip data-for={`${movie.id}`}>
      {children}
      <ReactTooltip
        place="right"
        effect="solid"
        className="tracking-wide shadow-lg movieBrowseTooltip font-poppins"
        backgroundColor="white"
        borderColor="transparent"
        id={`${movie.id}`}
      >
        <p className="text-base font-medium leading-5 text-gray-700">{movie.title || '-'}</p>
        <p className="mt-1 font-medium text-gray-400">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : '-'}
          <span className="mx-1 font-bold">•</span>
          {convertUnitNumberToPercentage(movie.vote_average || 0) || '-'} User Score
        </p>
        {Boolean(movie.genre_ids.length) && (
          <div className="flex flex-wrap mt-4">
            {movie.genre_ids.map((genreId) => (
              <div className="mb-1" key={genreId}>
                <BadgeGenre genre={genres[genreId]} />
              </div>
            ))}
          </div>
        )}
      </ReactTooltip>
      <style jsx global>{`
        .movieBrowseTooltip {
          padding: 1.5rem !important;
          padding-bottom: 1.5rem !important;
          border: none !important;
          border-radius: 4px !important;
          opacity: 1 !important;
          width: 280px !important;

          transition: opacity 200ms ease-in-out !important;
          opacity: 0 !important;
          visibility: visible !important;
        }

        .movieBrowseTooltip.show {
          visibility: visible !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default MovieTooltipWrapper;
