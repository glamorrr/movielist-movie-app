import axios from 'axios';

const axiosTMDb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${process.env.TMDb_API_KEY}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export default axiosTMDb;
