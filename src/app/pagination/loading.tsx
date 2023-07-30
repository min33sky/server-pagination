import React from 'react';
import { BeatLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <BeatLoader color="#36d7b7" />
    </div>
  );
}
