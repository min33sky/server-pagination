import getTrendingMovies from '@/actions/getTrendingMovies';
import MovieCard from '@/components/MovieCard';
import PaginationControlsWithPages from '@/components/PaginationControlsWithPages';
import Image from 'next/image';

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

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(perPage); // 0, 20, 40, 60, ...
  const end = start + Number(perPage); // 20, 40, 60, 80, ...

  const trendingMovies = await getTrendingMovies(Number(page));

  if (!trendingMovies) return <div>로딩중...</div>;

  return (
    <div className="flex flex-col gap-2 items-center">
      <PaginationControlsWithPages
        total={trendingMovies.total_results}
        perPage={Number(perPage)}
        hasNextPage={end < trendingMovies.total_results}
        hasPrevPage={start > 0}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full max-w-6xl mb-10">
        {trendingMovies?.results?.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
