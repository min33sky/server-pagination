import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const metadata = {
  title: '서버 페이지네이션 연습',
  description: '서버 페이지네이션 구현하기',
};

export default function Home({}: {}) {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-8">
      <h1 className="font-bold text-xl">서버 페이지네이션 구현</h1>
      <Link
        href="/pagination"
        className={cn(
          buttonVariants({
            variant: 'secondary',
            className: 'w-48',
          }),
        )}
      >
        들어가기
      </Link>
    </div>
  );
}
