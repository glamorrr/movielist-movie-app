import cookie from 'cookie';
import axiosTMDb from '@/utils/axiosTMDb';
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
      if (data.success) {
        const maybeOneYear = 31557600;
        const sessionIdCookie = cookie.serialize('session_id', data.session_id, {
          httpOnly: true,
          maxAge: maybeOneYear,
        });
        res.setHeader('Set-Cookie', sessionIdCookie);
      }
      res.status(200).json({ success: data.success });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        msg: 'Oops! Something went wrong.',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { session_id } = req.cookies;
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
