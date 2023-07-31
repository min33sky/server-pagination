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
  /**
   * TODO: 페이지 뒷부분 아직 버그 있음
   */

  const TMDB_MAX_PAGE = 500; // ? TMDB API의 최대 페이지 수는 500이다.
  const DISPLAY_PAGES = 5; // ? 보여줄 페이지 수

  console.log('total: ', total);
  console.log('perPage: ', perPage);

  const displayPageLength = Math.min(
    Math.ceil(total! / perPage!),
    DISPLAY_PAGES,
  );

  console.log('displayPageLength: ', displayPageLength);

  const lastPage = Math.ceil(total! / perPage!);

  console.log('라스트 페이지: ', lastPage);

  return (
    <section className="py-2">
      <div className="flex flex-row gap-2 items-center">
        <Button
          variant={'ghost'}
          size={'sm'}
          className={cn('hidden', currentPage > 1 && 'inline-flex')}
          asChild
        >
          {/* ?page=${Math.max(Number(currentPage) - DISPLAY_PAGES, 1)} */}
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

        <Button
          size={'sm'}
          variant={'ghost'}
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

        {/* 페이지 링크 리스트 */}
        {Array.from({ length: DISPLAY_PAGES }, (_, i) => {
          // const targetPage = Number(currentPage) + i;
          // const targetPage =
          //   currentPage - (currentPage % DISPLAY_PAGES) + i + 1;

          // if (targetPage > lastPage) return null;

          // const startPage =
          //   currentPage - Math.floor((currentPage - 1) / DISPLAY_PAGES) <
          //   DISPLAY_PAGES
          //     ? 1
          //     : currentPage - Math.floor((currentPage - 1) / DISPLAY_PAGES);

          const startPage =
            currentPage - Math.floor(displayPageLength / 2) < 1
              ? 1
              : currentPage - Math.floor(displayPageLength / 2);

          console.log('현제 페이지: ', currentPage);
          console.log('스타트 페이지: ', startPage);

          if (startPage + i > lastPage) return null;

          return (
            <Button
              key={i}
              // disabled={targetPage > TMDB_MAX_PAGE}
              variant={'ghost'}
              size={'sm'}
              className={cn(currentPage === startPage + i && 'text-rose-500')}
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
              맨 뒤
            </Link>
          </Button>
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
