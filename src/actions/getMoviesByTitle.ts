import { TrendingMovies } from '@/types/movie';

const url = 'https://api.themoviedb.org/3/search/movie?language=ko';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
  },
};

/**
 * Search for movies by their original, translated and alternative titles.
 * https://developer.themoviedb.org/reference/search-movie
 */
export default async function getMoviesByTitle(
  query: string,
  page: number = 1,
) {
  // console.log('#### URL: ', `${url}&query=${query}&page=${page}`);

  return fetch(`${url}&query=${query}&page=${page}`, options)
    .then((res) => res.json())
    .then((json) => json as TrendingMovies)
    .catch((err) => console.error('error:' + err));
}
