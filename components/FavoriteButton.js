import { useRouter } from 'next/router';
import axios from 'axios';
import { MdFavorite } from 'react-icons/md';
import { toast } from 'react-toastify';
import Icon from '@/components/Icon';
import { useAuth } from '@/utils/auth';

const FavoriteButton = ({ isFavorite, setIsFavorite, movieId }) => {
  if (isFavorite === null) {
    return <div className="w-10 h-10 bg-blue-200 rounded animate-pulse" />;
  }

  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      sessionStorage.setItem('urlBeforeLogin', router.asPath);
      router.push('/login');
      return;
    }

    axios.post('/api/account', {
      accountId: user.id,
      movieId,
      favorite: !isFavorite,
    });

    setIsFavorite((prev) => {
      const newState = !prev;
      const message = newState ? '✓ Added to favorites' : '✓ Removed from favorites';
      toast.success(message, {
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
    <button
      onClick={handleClick}
      type="button"
      className="focus:outline-none focus:ring-4 ring-blue-200 p-2.5 bg-pink-500 rounded"
    >
      <Icon size="1.25rem" className={isFavorite ? 'text-pink-200' : 'text-white'}>
        <MdFavorite />
      </Icon>
    </button>
  );
};

export default FavoriteButton;
