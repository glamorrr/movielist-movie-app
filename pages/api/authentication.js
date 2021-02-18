import axiosTMDb from '@/utils/axiosTMDb';
import parseCookies from '@/utils/parseCookies';
import {
  AUTH_CREATE_SESSION_ENDPOINT,
  AUTH_DELETE_SESSION_ENDPOINT,
  CREATE_REQUEST_TOKEN_ENDPOINT,
} from '@/utils/TMDbEndpoint';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const response = await axiosTMDb.get(CREATE_REQUEST_TOKEN_ENDPOINT);
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
    try {
      const response = await axiosTMDb.post(AUTH_CREATE_SESSION_ENDPOINT, {
        request_token: req.body.approvedRequestToken,
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

  if (req.method === 'DELETE') {
    try {
      const { session_id } = parseCookies(req);
      const response = await axiosTMDb.delete(AUTH_DELETE_SESSION_ENDPOINT, {
        data: { session_id },
      });
      const data = response.data;
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Oops! Something went wrong.' });
    }
  }
};
