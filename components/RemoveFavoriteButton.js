import { toast } from 'react-toastify';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import Icon from '@/components/Icon';
import { useAuth } from '@/utils/auth';

const RemoveFavoriteButton = ({ movieId, setMovies }) => {
  const { user } = useAuth();

  const handleClick = () => {
    axios.post('/api/account', {
      accountId: user.id,
      movieId,
      favorite: false,
    });

    toast.success('✓ Removed from favorites', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });

    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute z-10 p-1 transition-colors bg-red-600 rounded shadow-md focus:outline-none ring-blue-200 focus:ring-4 -top-2 -right-2 hover:bg-red-700"
    >
      <Icon className="text-white" size="1.25rem">
        <MdClose />
      </Icon>
    </button>
  );
};

export default RemoveFavoriteButton;
