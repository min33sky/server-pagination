import { TrendingMovies } from '@/types/movie';

const url = 'https://api.themoviedb.org/3/trending/movie/week?language=ko';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
  },
};

/**
 * 이 주의 트렌딩 영화 목록을 가져옵니다.
 */
export default async function getTrendingMovies(page: number = 1) {
  // console.log('#### URL: ', `${url}&page=${page}`);

  return fetch(`${url}&page=${page}`, options)
    .then((res) => res.json())
    .then((json) => json as TrendingMovies)
    .catch((err) => console.error('error:' + err));
}
