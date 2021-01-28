const BadgeNumber = ({ order }) => {
  const setTextColorBadgeNumber = (order) => {
    if (order === 1 || order === 3) return 'text-yellow-900';
    if (order === 2) return 'text-gray-800';
    return 'text-gray-700';
  };

  const setBackgroundColorBadgeNumber = (order) => {
    if (order === 1) return 'bg-yellow-300';
    if (order === 2) return 'bg-gray-200';
    if (order === 3) return 'bg-yellow-500';
    return 'bg-blue-200';
  };

  return (
    <span
      className={
        'absolute flex justify-center items-center top-0 left-0 w-9 h-9 font-poppins font-semibold text-sm ' +
        `${setTextColorBadgeNumber(order)} ${setBackgroundColorBadgeNumber(order)}` +
        ' z-10 -translate-x-1/4 -translate-y-1/4 transform rounded-full shadow-md'
      }
    >
      <span className="font-light text-xs">#</span>
      {order}
    </span>
  );
};

export default BadgeNumber;
