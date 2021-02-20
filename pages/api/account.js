import axiosTMDb from '@/utils/axiosTMDb';
import { ACCOUNT_ENDPOINT } from '@/utils/TMDbEndpoint';
import { GET_FAVORITE_MOVIES } from '@/utils/TMDbType';

export default async (req, res) => {
  const { accountId, page, type } = req.query;
  const { session_id } = req.cookies;

  if (req.method === 'GET') {
    try {
      let response;

      switch (type) {
        case GET_FAVORITE_MOVIES:
          response = await axiosTMDb.get(`${ACCOUNT_ENDPOINT}/${accountId}/favorite/movies`, {
            params: { session_id, page, sort_by: 'created_at.desc' },
          });
          break;
        default:
          response = await axiosTMDb.get(ACCOUNT_ENDPOINT, { params: { session_id } });
      }

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
    const { accountId, movieId, favorite } = req.body;
    const { session_id } = req.cookies;

    try {
      const response = await axiosTMDb.post(
        `${ACCOUNT_ENDPOINT}/${accountId}/favorite`,
        {
          media_type: 'movie',
          media_id: movieId,
          favorite,
        },
        { params: { session_id } }
      );
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
