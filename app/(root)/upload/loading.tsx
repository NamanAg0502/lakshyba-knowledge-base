import React from 'react';

export default function UploadLoading() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 h-10 w-64 animate-pulse rounded bg-gray-200"></div>
      
      <div className="mb-8 rounded-lg border border-dashed border-gray-300 p-12">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-16 w-16 animate-pulse rounded-full bg-gray-200"></div>
          <div className="mb-2 h-6 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <div className="h-10 w-24 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
