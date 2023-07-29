'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

interface InfinityScrollTriggerProps {
  page: number;
}

export default function InfinityScrollTrigger({
  page,
}: InfinityScrollTriggerProps) {
  const router = useRouter();

  const triggerRef = useCallback(
    (node: any) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log('triggered');
              router.push(`?page=${page + 1}`, {
                scroll: false,
              });
              observer.disconnect();
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5,
        },
      );

      observer.observe(node);
    },
    [page, router],
  );

  return (
    <div
      aria-label="Infinity Scroll Trigger"
      ref={triggerRef}
      className="h-1 w-1 bg-red-400"
    >
      <p className="sr-only">InfinityScrollTrigger</p>
    </div>
  );
}
