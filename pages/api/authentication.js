import axiosTMDb from '@/utils/axiosTMDb';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axiosTMDb.post('/authentication/session/new', {
        request_token: req.body.approvedRequestToken,
      });
      const data = response.data;

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        msg: 'Oops! Something went wrong.',
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const response = await axiosTMDb.delete('/authentication/session');
      const data = response.data;
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Oops! Something went wrong.' });
    }
  }
};
