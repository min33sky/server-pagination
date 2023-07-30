import React from 'react';
import { ModeToggle } from './ModeToggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 bg-background w-full z-50">
      <div className="flex items-center justify-between h-20 px-4 md:mx-0">
        <p>MovieDB</p>
        <ModeToggle />
      </div>
    </header>
  );
}
