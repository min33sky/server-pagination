'use client';

import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsWithPagesProps {
  total?: number;
  perPage?: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControlsWithPages({
  total,
  perPage,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsWithPagesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const TMDB_MAX_PAGE = 500; // ? TMDB API의 최대 페이지 수는 500이다.
  const SKIP_PAGE = 10; // ? 페이지 버튼을 10개씩 스킵한다.

  const page = searchParams.get('page') ?? '1';

  const handleClick = (targetPage: number) => {
    router.push(`?page=${targetPage}`);
  };

  return (
    <section className="py-2">
      <div className="flex flex-row gap-2 items-center">
        <Button onClick={() => handleClick(1)} size={'sm'}>
          맨 앞으로 가기
        </Button>

        <Button
          disabled={!hasPrevPage}
          variant={'ghost'}
          size={'icon'}
          onClick={() => handleClick(Math.max(Number(page) - SKIP_PAGE, 1))}
        >
          <ArrowLeft />
        </Button>

        {Array.from({ length: 10 }, (_, i) => {
          const targetPage = Number(page) + i;
          return (
            <Button
              key={i}
              disabled={targetPage > TMDB_MAX_PAGE}
              size={'sm'}
              onClick={() => handleClick(targetPage)}
            >
              {targetPage}
            </Button>
          );
        })}

        <Button
          disabled={!hasNextPage}
          variant={'ghost'}
          size={'icon'}
          onClick={() => handleClick(Number(page) + SKIP_PAGE)}
        >
          <ArrowRight />
        </Button>

        {total && perPage && (
          <Button
            onClick={() =>
              handleClick(Math.min(Math.ceil(total / perPage), TMDB_MAX_PAGE))
            }
            size={'sm'}
          >
            맨 뒤로 가기
          </Button>
        )}
      </div>
    </section>
  );
}
