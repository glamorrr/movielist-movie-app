import { useRouter } from 'next/router';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';
import { toast } from 'react-toastify';
import Icon from '@/components/Icon';
import Success from '@/components/ToastContent/Success';
import { useAuth } from '@/utils/auth';

const WatchlistButton = ({ isWatchlist, setIsWatchlist, movieId }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (isWatchlist === null && user) {
    return <div className="w-10 h-10 bg-blue-200 rounded animate-pulse" />;
  }

  const handleClick = () => {
    if (!user) {
      sessionStorage.setItem('urlBeforeLogin', router.asPath);
      router.push('/login');
      return;
    }

    axios.post('/api/account', {
      accountId: user.id,
      movieId,
      watchlist: !isWatchlist,
    });

    setIsWatchlist((prev) => {
      ReactTooltip.hide();
      const newState = !prev;
      const message = newState ? 'Added to watchlist' : 'Removed from watchlist';
      toast.success(<Success message={message} />, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return !prev;
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="focus:outline-none focus:ring-4 ring-blue-200 p-2.5 bg-blue-400 rounded"
        data-tip={isWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      >
        <Icon size="1.25rem" className="text-white">
          {isWatchlist ? <MdPlaylistAddCheck /> : <MdPlaylistAdd />}
        </Icon>
      </button>
      <ReactTooltip place="top" effect="solid" className="text-base tracking-wide font-poppins" />
    </div>
  );
};

export default WatchlistButton;
