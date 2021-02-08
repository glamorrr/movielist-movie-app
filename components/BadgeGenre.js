const BadgeGenre = ({ genre }) => {
  return (
    <span className="px-2 mr-2 text-xs font-medium tracking-wider text-white bg-blue-400 rounded-lg font-poppins">
      {genre}
    </span>
  );
};

export default BadgeGenre;
