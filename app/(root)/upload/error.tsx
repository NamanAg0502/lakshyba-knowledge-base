'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function UploadError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Upload page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-red-500">Error in Upload Process</h2>
      <p className="mb-8 max-w-md text-gray-600">
        We encountered an issue with the file upload process. This could be due to file size limitations, network issues, or server problems.
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
