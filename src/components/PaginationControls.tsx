'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

interface Props {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControls({
  hasNextPage,
  hasPrevPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '5';

  return (
    <div className="flex gap-2">
      <Button
        className="bg-blue-500 text-white p-1"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        prev page
      </Button>

      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <Button
        className="bg-blue-500 text-white p-1"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        next page
      </Button>
    </div>
  );
}
