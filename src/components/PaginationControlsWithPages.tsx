import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationControlsWithPagesProps {
  total?: number;
  perPage?: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function PaginationControlsWithPages({
  total,
  perPage,
  currentPage,
  hasNextPage,
  hasPrevPage,
}: PaginationControlsWithPagesProps) {
  /**
   * TODO: 페이지 뒷부분 아직 버그 있음
   */

  const TMDB_MAX_PAGE = 500; // ? TMDB API의 최대 페이지 수는 500이다.
  const SKIP_PAGE = 5; // ? 페이지 버튼을 10개씩 스킵한다.

  return (
    <section className="py-2">
      <div className="flex flex-row gap-2 items-center">
        <Button
          size={'sm'}
          className={cn('hidden', currentPage > 1 && 'inline-flex')}
          asChild
        >
          <Link href={`?page=1`}>맨 앞</Link>
        </Button>

        <Button
          disabled={!hasPrevPage}
          variant={'ghost'}
          size={'icon'}
          className={cn('hidden', currentPage > 1 && 'inline-flex')}
          asChild
        >
          <Link href={`?page=${Math.max(Number(currentPage) - SKIP_PAGE, 1)}`}>
            <ArrowLeft />
          </Link>
        </Button>

        {Array.from({ length: SKIP_PAGE }, (_, i) => {
          const targetPage = Number(currentPage) + i;

          if (targetPage > TMDB_MAX_PAGE) return null;

          return (
            <Button
              key={i}
              disabled={targetPage > TMDB_MAX_PAGE}
              size={'sm'}
              className={cn(
                currentPage === targetPage && 'bg-muted-foreground',
              )}
              asChild
            >
              <Link href={`?page=${targetPage}`}>{targetPage}</Link>
            </Button>
          );
        })}

        <Button
          disabled={!hasNextPage}
          variant={'ghost'}
          size={'icon'}
          className={cn(
            currentPage <
              Math.ceil((total || TMDB_MAX_PAGE) / (perPage || 20)) &&
              'inline-flex',
          )}
          asChild
        >
          <Link href={`?page=${Number(currentPage) + SKIP_PAGE}`}>
            <ArrowRight />
          </Link>
        </Button>

        {total && perPage && (
          <Button
            size={'sm'}
            className={cn(
              'hidden',
              currentPage < Math.ceil(total / perPage) && 'inline-flex',
            )}
            asChild
          >
            <Link
              href={`?page=${Math.min(
                Math.ceil(total / perPage),
                TMDB_MAX_PAGE,
              )}`}
            >
              맨 뒤
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
