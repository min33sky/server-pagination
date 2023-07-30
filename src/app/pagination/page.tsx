import getMoviesByTitle from '@/actions/getMoviesByTitle';
import getTrendingMovies from '@/actions/getTrendingMovies';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import PaginationControlsWithPages from '@/components/PaginationControlsWithPages';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PaginationPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const page = searchParams['page'] ?? '1';
  const perPage = searchParams['perPage'] ?? '20';
  const keyword = searchParams['query'];

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(perPage); // 0, 20, 40, 60, ...
  const end = start + Number(perPage); // 20, 40, 60, 80, ...

  let movieList = null;

  if (keyword === undefined) {
    const trendingMovies = await getTrendingMovies(Number(page));
    movieList = trendingMovies;
  } else {
    movieList = await getMoviesByTitle(String(keyword), Number(page));
  }

  if (!movieList) return <div>찾는 영화가 없습니다.....</div>;

  return (
    <>
      <Header keyword={String(keyword)} />

      <div className="flex flex-col gap-2 items-center pb-10">
        <div className="mt-24 mb-10 px-4 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full max-w-6xl ">
          {movieList?.results?.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <PaginationControlsWithPages
          total={movieList.total_results}
          perPage={Number(perPage)}
          currentPage={Number(page)}
          query={String(keyword)}
          hasNextPage={end < movieList.total_results}
          hasPrevPage={start > 0}
        />
      </div>
    </>
  );
}
