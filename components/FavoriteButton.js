import { useRouter } from 'next/router';
import axios from 'axios';
import { MdFavorite } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';
import Icon from '@/components/Icon';
import Success from '@/components/ToastContent/Success';
import { useAuth } from '@/utils/auth';
import { POST_FAVORITE_MOVIE } from '@/utils/TMDbType';

const FavoriteButton = ({ isFavorite, setIsFavorite, movieId }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (isFavorite === null && user) {
    return <div className="w-10 h-10 bg-blue-200 rounded animate-pulse" />;
  }

  const handleClick = () => {
    if (!user) {
      sessionStorage.setItem('urlBeforeLogin', router.asPath);
      router.push('/login');
      return;
    }

    axios.post(
      '/api/account',
      {
        accountId: user.id,
        movieId,
        favorite: !isFavorite,
      },
      { params: { type: POST_FAVORITE_MOVIE } }
    );

    setIsFavorite((prev) => {
      ReactTooltip.hide();
      const newState = !prev;
      const message = newState ? 'Added to favorites' : 'Removed from favorites';
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
        className="focus:outline-none focus:ring-4 ring-blue-200 p-2.5 bg-pink-500 rounded"
        data-tip={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        <Icon size="1.25rem" className={isFavorite ? 'text-pink-200' : 'text-white'}>
          <MdFavorite />
        </Icon>
      </button>
      <ReactTooltip
        place="top"
        effect="solid"
        className="text-base tracking-wide font-poppins"
        type="dark"
      />
    </div>
  );
};

export default FavoriteButton;
