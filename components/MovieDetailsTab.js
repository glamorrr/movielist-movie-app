const MovieDetailsTab = ({ tab, isSelected, handleClick }) => {
  return (
    <li
      className={
        (isSelected ? 'text-blue-500 hover:text-blue-500' : '') +
        ' px-2 py-1 md:pb-5 hover:text-blue-300 cursor-pointer transition-colors'
      }
      onClick={handleClick}
    >
      {tab}
    </li>
  );
};

export default MovieDetailsTab;
