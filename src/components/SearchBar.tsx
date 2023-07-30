'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  keyword?: string;
}

export default function SearchBar({ keyword }: SearchBarProps) {
  const router = useRouter();

  const initialRender = useRef(true); //? 새로 고침했을 때 키워드가 초기화되는 것을 막기 위해

  const [text, setText] = useState(keyword);
  const [query] = useDebounce(text, 750);

  console.log('쿼리 입력: ', query);

  useEffect(() => {
    // if (initialRender.current) {
    //   initialRender.current = false;
    //   return;
    // }

    if (!query) {
      router.push('/pagination');
    } else {
      router.push(`/pagination?query=${query}`);
    }
  }, [query, router]);

  return (
    <section className="relative">
      <SearchIcon className="absolute h-[1.2rem] w-[1.2rem] text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
      <Input
        className="pl-10"
        placeholder='Search "Avengers"'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </section>
  );
}