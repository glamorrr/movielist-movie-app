import setBackgroundColorBadgeNumber from '../helper/setBackgroundColorBadgeNumber';
import setTextColorBadgeNumber from '../helper/setTextColorBadgeNumber';

/**
 * Used in /browse and /movies/top-100.
 */
const BadgeNumber = ({ order }) => {
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
