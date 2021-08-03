import ReactTooltip from 'react-tooltip';

const MovieSimpleTooltipWrapper = ({ movie, children }) => {
  return (
    <div data-tip data-for={`${movie.id}`}>
      {children}
      <ReactTooltip
        place="top"
        effect="solid"
        className="text-base tracking-wide movieSimpleTooltip font-poppins"
        backgroundColor="rgba(31, 38, 49, 0.85)"
        borderColor="transparent"
        id={`${movie.id}`}
      >
        <div className="overflow-hidden rounded">
          <p
            className="px-3 py-1 overflow-hidden font-medium"
            style={{ backgroundColor: 'rgba(31, 38, 49, 0.75)' }}
          >
            {movie.title}
          </p>
          <p className="px-3 py-1 text-gray-100">{new Date(movie.release_date).getFullYear()}</p>
        </div>
      </ReactTooltip>
      <style jsx global>{`
        .movieSimpleTooltip {
          padding: 0 !important;
          border: none !important;
          border-radius: 4px !important;
        }
      `}</style>
    </div>
  );
};

export default MovieSimpleTooltipWrapper;
