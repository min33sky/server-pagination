import { cn } from '@/lib/utils';
import React from 'react';

export default function Spinner() {
  return (
    <div className="h-full flex justify-center items-center space-x-1">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
            className={cn('h-5 w-5 bg-teal-500 rounded-full animate-bounce')}
          />
        ))}
    </div>
  );
}
