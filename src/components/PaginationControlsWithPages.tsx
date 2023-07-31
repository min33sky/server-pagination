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
  hasNextPage?: boolean; // ? 다음 페이지가 있는지
  hasPrevPage?: boolean; // ? 이전 페이지가 있는지
}

export default function PaginationControlsWithPages({
  total,
  perPage,
  query,
  currentPage,
}: PaginationControlsWithPagesProps) {
  const TMDB_MAX_PAGE = 500; // ? TMDB API의 최대 페이지 수는 500이다.
  const DISPLAY_PAGES = 5; // ? 보여줄 페이지 수

  console.log('total: ', total);
  console.log('perPage: ', perPage);

  const displayPageLength = Math.min(
    Math.ceil(total! / perPage!),
    DISPLAY_PAGES,
  );

  const lastPage = Math.ceil(total! / perPage!);

  return (
    <section className="py-2">
      <div className="flex flex-row gap-2 items-center">
        <Button
          variant={'ghost'}
          size={'sm'}
          className={cn('hidden', currentPage > 1 && 'inline-flex')}
          asChild
        >
          <Link
            href={{
              pathname: '/pagination',
              query: {
                ...(query ? { query } : {}),
                page: Math.max(currentPage - 1, 1),
              },
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            이전
          </Link>
        </Button>

        {currentPage >= DISPLAY_PAGES && (
          <>
            <Button
              size={'sm'}
              variant={'ghost'}
              // className={cn('hidden', currentPage > 1 && 'inline-flex')}
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
                1
              </Link>
            </Button>

            <div>...</div>
          </>
        )}

        {/* 페이지 링크 리스트 */}
        {Array.from({ length: DISPLAY_PAGES }, (_, i) => {
          /**
           * 1. 페이지가 5개 이하일 때 시작 페이지는 1이다.
           * 2. 페이지가 5개 이상일 때 시작 페이지는 현재 페이지 - 2이다.
           * 3. 시작 페이지가 1보다 작을 때는 1이다.
           */
          const startPage =
            lastPage <= displayPageLength
              ? 1
              : currentPage - Math.floor(displayPageLength / 2) < 1
              ? 1
              : currentPage - Math.floor(displayPageLength / 2);

          if (startPage + i > lastPage) return null;

          return (
            <Button
              key={i}
              variant={'ghost'}
              size={'sm'}
              className={cn(
                currentPage === startPage + i &&
                  'text-rose-500 cursor-default hover:bg-transparent hover:text-rose-500',
              )}
              asChild
            >
              <Link
                href={{
                  pathname: '/pagination',
                  query: {
                    ...(query ? { query } : {}),
                    page: startPage + i,
                  },
                }}
              >
                {startPage + i}
              </Link>
            </Button>
          );
        })}

        {total && perPage && (
          <>
            <div>...</div>
            <Button
              size={'sm'}
              variant={'ghost'}
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
                {lastPage}
              </Link>
            </Button>
          </>
        )}

        <Button
          aria-label="next page"
          variant={'ghost'}
          size={'sm'}
          className={cn('inline-flex', currentPage === lastPage && 'hidden')}
          asChild
        >
          <Link
            href={{
              pathname: '/pagination',
              query: {
                ...(query ? { query } : {}),
                page: Math.min(currentPage + 1, lastPage),
              },
            }}
          >
            다음
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
