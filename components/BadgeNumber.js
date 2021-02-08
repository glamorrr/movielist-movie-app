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
        `${setTextColorBadgeNumber(order)} ${setBackgroundColorBadgeNumber(order)}` +
        ' absolute top-0 left-0 z-10 flex items-center justify-center text-sm font-semibold transform rounded-full shadow-md w-9 h-9 font-poppins -translate-x-1/4 -translate-y-1/4'
      }
    >
      <span className="text-xs font-light">#</span>
      {order}
    </span>
  );
};

export default BadgeNumber;
