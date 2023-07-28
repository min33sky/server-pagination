import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';

const data = [
  'entry 1',
  'entry 2',
  'entry 3',
  'entry 4',
  'entry 5',
  'entry 6',
  'entry 7',
  'entry 8',
  'entry 9',
  'entry 10',
];

export default function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const page = searchParams['page'] ?? '1';
  const perPage = searchParams['perPage'] ?? '5';

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(perPage); // 0, 5, 10, 15, ...
  const end = start + Number(perPage); // 5, 10, 15, 20, ...

  const entries = data.slice(start, end);

  return (
    <div className="flex flex-col gap-2 items-center">
      {entries.map((entry, index) => (
        <div key={index}>{entry}</div>
      ))}

      <PaginationControls
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
}
