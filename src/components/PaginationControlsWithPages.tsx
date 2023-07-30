import React from 'react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationControlsWithPagesProps {
  total?: number; // ? 전체 아이템 수
  perPage?: number; // ? 한 페이지에 보여줄 아이템 수
  query?: string; // ? 검색어
  currentPage: number; // ? 현재 페이지
  hasNextPage: boolean; // ? 다음 페이지가 있는지
  hasPrevPage: boolean; // ? 이전 페이지가 있는지
}

export default function PaginationControlsWithPages({
  total,
  perPage,
  query,
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
          <Link
            href={{
              pathname: '/pagination',
              query: {
                ...(query ? { query } : {}),
                page: 1,
              },
            }}
          >
            맨 앞
          </Link>
        </Button>

        <Button
          disabled={!hasPrevPage}
          variant={'ghost'}
          size={'icon'}
          className={cn('hidden', currentPage > 1 && 'inline-flex')}
          asChild
        >
          {/* ?page=${Math.max(Number(currentPage) - SKIP_PAGE, 1)} */}
          <Link
            href={{
              pathname: '/pagination',
              query: {
                ...(query ? { query } : {}),
                page: Math.max(Number(currentPage) - SKIP_PAGE, 1),
              },
            }}
          >
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
              <Link
                href={{
                  pathname: '/pagination',
                  query: {
                    ...(query ? { query } : {}),
                    page: targetPage,
                  },
                }}
              >
                {targetPage}
              </Link>
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
          <Link
            href={{
              pathname: '/pagination',
              query: {
                ...(query ? { query } : {}),
                page: Math.min(Number(currentPage) + SKIP_PAGE, TMDB_MAX_PAGE),
              },
            }}
          >
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
              href={{
                pathname: '/pagination',
                query: {
                  ...(query ? { query } : {}),
                  page: Math.min(Math.ceil(total / perPage), TMDB_MAX_PAGE),
                },
              }}
            >
              맨 뒤
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
