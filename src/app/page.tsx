import getTrendingMovies from '@/actions/getTrendingMovies';
import PaginationControls from '@/components/PaginationControls';
import Image from 'next/image';

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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full max-w-6xl">
        {trendingMovies?.results?.map((movie, index) => (
          // TODO: Card Component로 분리
          <div key={index} className="mx-auto px-2 lg:px-0 overflow-hidden">
            {/* <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} /> */}

            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              width={500}
              height={500}
              alt="movie poster"
              className="hover:scale-105 transition rounded-lg"
            />
            <p className="mt-2 text-center text-lg font-bold">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
