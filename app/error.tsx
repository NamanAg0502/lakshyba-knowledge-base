'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log the error to an error reporting service
  React.useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold text-red-500">Something went wrong</h1>
      <p className="mb-8 max-w-md text-gray-600">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="flex space-x-4">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button onClick={() => window.location.href = '/'} variant="outline">
          Go back home
        </Button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 max-w-2xl overflow-auto rounded-md bg-gray-100 p-4 text-left">
          <p className="font-mono text-sm text-red-600">{error.message}</p>
        </div>
      )}
    </div>
  );
}
