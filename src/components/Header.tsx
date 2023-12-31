import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import SearchBar from './SearchBar';
import Link from 'next/link';

interface HeaderProps {
  keyword?: string;
}

export default function Header({ keyword }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 bg-background w-full z-50">
      <div className="flex items-center justify-between h-20 px-4 md:mx-0">
        <Link href="/">MovieDB</Link>
        <SearchBar keyword={keyword} />
        <ThemeToggle />
      </div>
    </header>
  );
}
