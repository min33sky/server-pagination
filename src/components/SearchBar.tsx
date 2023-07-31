'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
// import { useDebounce } from 'use-debounce';
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';

interface SearchBarProps {
  keyword?: string;
}

export default function SearchBar({ keyword }: SearchBarProps) {
  const router = useRouter();

  const initialRender = useRef(true);

  const [text, setText] = useState(keyword || '');
  // const textRef = useRef<HTMLInputElement | null>(null);

  const query = useDebounce(text, 1000);

  // console.log('하하: ', textRef.current?.value);

  console.log('query: ', query);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    /**
     * 1. 검색어와 페이지가 포함된 링크로 들어왔을 때 초기화되는 것을 막기 위해
     * 2. 새로 고침했을 때 키워드가 초기화되는 것을 막기 위해
     */
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push('/pagination');
    } else {
      router.push(`/pagination?query=${encodeURIComponent(query)}`);
      inputRef.current?.blur(); //! 한글의 경우 마지막 글자가 지워지면서 다시 호출이 되는 경우가 있다.
    }
  }, [query, router]);

  return (
    <section className="relative">
      <SearchIcon className="absolute h-[1.2rem] w-[1.2rem] text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
      <Input
        ref={inputRef}
        className="pl-10"
        placeholder='검색  "미션 임파서블"'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </section>
  );
}
