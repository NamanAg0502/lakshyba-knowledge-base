'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function DocumentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Documents page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-red-500">Error Loading Documents</h2>
      <p className="mb-8 max-w-md text-gray-600">
        We encountered an issue while loading your documents. This could be due to a network issue or a temporary server problem.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => window.location.href = '/'} variant="outline">
          Go back home
        </Button>
      </div>
    </div>
  );
}
