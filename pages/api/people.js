import axiosTMDb from '@/utils/axiosTMDb';
import { PERSON_SEARCH_ENDPOINT, PERSON_POPULAR_ENDPOINT } from '@/utils/TMDbEndpoint';
import { GET_PERSON_SEARCH, GET_PERSON_POPULAR } from '@/utils/TMDbType';

export default async (req, res) => {
  const { page = 1, query, type } = req.query;

  try {
    let response;

    switch (type) {
      case GET_PERSON_SEARCH:
        response = await axiosTMDb.get(PERSON_SEARCH_ENDPOINT, { params: { query, page } });
        break;
      case GET_PERSON_POPULAR:
        response = await axiosTMDb.get(PERSON_POPULAR_ENDPOINT, {
          params: { page },
        });
        break;
    }

    const data = response.data;
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: 'Oops! Something went wrong.',
    });
  }
};
