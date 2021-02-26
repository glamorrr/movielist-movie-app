import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/utils/auth';
import { GET_MOVIE_ACCOUNT_STATES } from '@/utils/TMDbType';

const useAccountMovieStates = (movieId) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(null);
  const [isWatchlist, setIsWatchlist] = useState(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await axios.get('/api/movies', {
          params: { type: GET_MOVIE_ACCOUNT_STATES, movie_id: movieId },
        });
        setIsFavorite(res.data.favorite);
        setIsWatchlist(res.data.watchlist);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  return { isFavorite, setIsFavorite, isWatchlist, setIsWatchlist };
};

export default useAccountMovieStates;
