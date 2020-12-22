/**
 * Used in /browse.
 */
const BadgeGenre = ({ genre }) => {
  return (
    <span className="mr-2 px-2 font-poppins text-xs text-white font-medium tracking-wider bg-blue-400 rounded-lg">
      {genre}
    </span>
  );
};

export default BadgeGenre;
