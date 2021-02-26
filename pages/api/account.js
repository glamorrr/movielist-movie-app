import axiosTMDb from '@/utils/axiosTMDb';
import { ACCOUNT_ENDPOINT } from '@/utils/TMDbEndpoint';
import { GET_FAVORITE_MOVIES, GET_WATCHLIST, POST_FAVORITE_MOVIE } from '@/utils/TMDbType';

export default async (req, res) => {
  const { accountId, page, type } = req.query;
  const { session_id } = req.cookies;

  if (req.method === 'GET') {
    try {
      const axiosRequest = { url: '', config: {} };

      switch (type) {
        case GET_FAVORITE_MOVIES:
          axiosRequest.url = `${ACCOUNT_ENDPOINT}/${accountId}/favorite/movies`;
          axiosRequest.config.params = {
            params: { page, sort_by: 'created_at.desc' },
          };
          break;
        case GET_WATCHLIST:
          axiosRequest.url = `${ACCOUNT_ENDPOINT}/${accountId}/watchlist/movies`;
          axiosRequest.config.params = {
            params: { page, sort_by: 'created_at.desc' },
          };
          break;
        default:
          axiosRequest.url = ACCOUNT_ENDPOINT;
      }

      const response = await axiosTMDb.get(axiosRequest.url, {
        params: { session_id, ...axiosRequest.config?.params },
      });
      const data = response.data;
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        msg: 'Oops! Something went wrong.',
      });
    }
  }

  if (req.method === 'POST') {
    const { type } = req.query;
    const { accountId, movieId, favorite, watchlist } = req.body;
    const { session_id } = req.cookies;

    try {
      const axiosRequest = {};

      switch (type) {
        case POST_FAVORITE_MOVIE:
          axiosRequest.url = `${ACCOUNT_ENDPOINT}/${accountId}/favorite`;
          axiosRequest.data = {
            media_type: 'movie',
            media_id: movieId,
            favorite,
          };
          break;
        default:
          axiosRequest.url = `${ACCOUNT_ENDPOINT}/${accountId}/watchlist`;
          axiosRequest.data = {
            media_type: 'movie',
            media_id: movieId,
            watchlist,
          };
      }

      const response = await axiosTMDb.post(axiosRequest.url, axiosRequest.data, {
        params: { session_id },
      });
      const data = response.data;
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        msg: 'Oops! Something went wrong.',
      });
    }
  }
};
