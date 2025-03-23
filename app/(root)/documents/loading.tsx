import React from 'react';

export default function DocumentsLoading() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-gray-200 shadow">
            <div className="h-40 animate-pulse bg-gray-200"></div>
            <div className="p-4">
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
              <div className="flex justify-between">
                <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
                <div className="h-8 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
