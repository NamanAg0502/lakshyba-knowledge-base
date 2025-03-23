import React from 'react';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute h-16 w-16 rounded-full border-4 border-solid border-gray-200"></div>
        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div>
    </div>
  );
}
