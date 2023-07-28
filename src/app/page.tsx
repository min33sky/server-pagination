import getTrendingMovies from '@/actions/getTrendingMovies';
import PaginationControls from '@/components/PaginationControls';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  // console.log('유행하는 영화들:', trendingMovies);

  const page = searchParams['page'] ?? '1';
  const perPage = searchParams['perPage'] ?? '20';

  console.log('페이지 ::::::::::::::: ', page);

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(perPage); // 0, 20, 40, 60, ...
  const end = start + Number(perPage); // 20, 40, 60, 80, ...

  const trendingMovies = await getTrendingMovies(Number(page));

  if (!trendingMovies) return <div>로딩중...</div>;

  return (
    <div className="flex flex-col gap-2 items-center">
      <PaginationControls
        total={trendingMovies.total_results}
        hasNextPage={end < trendingMovies.total_results}
        hasPrevPage={start > 0}
      />

      {trendingMovies?.results?.map((movie, index) => (
        <div key={index}>
          {movie.title}
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>
      ))}
    </div>
  );
}
