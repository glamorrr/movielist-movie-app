import axiosTMDb from '@/utils/axiosTMDb';
import parseCookies from '@/utils/parseCookies';
import { ACCOUNT_ENDPOINT } from '@/utils/TMDbEndpoint';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { session_id } = parseCookies(req);
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
};
