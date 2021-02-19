import axiosTMDb from '@/utils/axiosTMDb';
import { ACCOUNT_ENDPOINT } from '@/utils/TMDbEndpoint';

export default async (req, res) => {
  const { session_id } = req.cookies;

  if (req.method === 'GET') {
    try {
      const response = await axiosTMDb.get(ACCOUNT_ENDPOINT, { params: { session_id } });
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
