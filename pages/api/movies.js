import axiosTMDb from '@/utils/axiosTMDb';
import {
  MOVIES_POPULAR_ENDPOINT,
  MOVIES_SEARCH_ENDPOINT,
  MOVIES_TRENDING_ENDPOINT,
  MOVIES_UPCOMING_ENDPOINT,
  MOVIES_TOP_RATED_ENDPOINT,
  MOVIE_ENDPOINT,
  KEYWORD_ENDPOINT,
} from '@/utils/TMDbEndpoint';
import {
  GET_MOVIES_POPULAR,
  GET_MOVIES_SEARCH,
  GET_MOVIES_TOP_RATED,
  GET_MOVIES_TRENDING,
  GET_MOVIES_UPCOMING,
  GET_MOVIE_RECOMMENDATIONS,
  GET_MOVIES_BY_KEYWORDS,
  GET_MOVIE_ACCOUNT_STATES,
} from '@/utils/TMDbType';

export default async (req, res) => {
  const { page = 1, keyword_id, movie_id, query, time_span, type } = req.query;

  try {
    let response;

    /**
     * Server request to TMDb API endpoint
     * based on type that retrieved from
     * the client request.
     */
    switch (type) {
      case GET_MOVIES_SEARCH:
        response = await axiosTMDb.get(MOVIES_SEARCH_ENDPOINT, { params: { query, page } });
        break;
      case GET_MOVIES_TRENDING:
        response = await axiosTMDb.get(`${MOVIES_TRENDING_ENDPOINT}/${time_span}`, {
          params: { page },
        });
        break;
      case GET_MOVIES_POPULAR:
        response = await axiosTMDb.get(MOVIES_POPULAR_ENDPOINT, {
          params: { page },
        });
        break;
      case GET_MOVIES_UPCOMING:
        response = await axiosTMDb.get(MOVIES_UPCOMING_ENDPOINT, {
          params: { page },
        });
        break;
      case GET_MOVIES_TOP_RATED:
        response = await axiosTMDb.get(MOVIES_TOP_RATED_ENDPOINT, {
          params: { page },
        });
        break;
      case GET_MOVIE_RECOMMENDATIONS:
        response = await axiosTMDb.get(`${MOVIE_ENDPOINT}/${movie_id}/recommendations`, {
          params: { page },
        });
        break;
      case GET_MOVIES_BY_KEYWORDS:
        response = await axiosTMDb.get(`${KEYWORD_ENDPOINT}/${keyword_id}/movies`, {
          params: { page },
        });
        break;
      case GET_MOVIE_ACCOUNT_STATES:
        const { session_id } = req.cookies;
        response = await axiosTMDb.get(`${MOVIE_ENDPOINT}/${movie_id}/account_states`, {
          params: { session_id },
        });
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
