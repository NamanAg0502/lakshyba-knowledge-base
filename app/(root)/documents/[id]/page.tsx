"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { LegalDocument } from "@/lib/types";
import { documentApi } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

// Dynamically import the DocumentViewer component
const DocumentViewer = dynamic(
  () => import("@/components/documents/DocumentViewer"),
  {
    suspense: true,
    loading: () => <DocumentSkeleton />,
  }
);

// Skeleton component for loading state
const DocumentSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-neutral-200 rounded w-1/3 mb-4"></div>
    <div className="h-64 bg-neutral-100 rounded mb-4"></div>
    <div className="flex space-x-2 mb-4">
      <div className="h-5 bg-neutral-200 rounded w-24"></div>
      <div className="h-5 bg-neutral-200 rounded w-24"></div>
      <div className="h-5 bg-neutral-200 rounded w-24"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-neutral-100 rounded w-full"></div>
      <div className="h-4 bg-neutral-100 rounded w-full"></div>
      <div className="h-4 bg-neutral-100 rounded w-3/4"></div>
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="bg-red-50 p-4 rounded-md text-red-800 mt-4">
    <p className="font-medium">Error</p>
    <p>{message}</p>
  </div>
);

export default function DocumentPage() {
  const params = useParams();
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [citingDocuments, setCitingDocuments] = useState<LegalDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when document ID changes
    setIsLoading(true);
    setError(null);
    setDocument(null);
    setCitingDocuments([]);

    const fetchDocument = async () => {
      if (!params.id) return;

      try {
        // Fetch main document data
        const documentData = await documentApi.getDocumentById(
          params.id as string
        );
        setDocument(documentData);
      } catch (err: any) {
        console.error("Error fetching document:", err);
        setError(
          err.response?.data?.error ||
            "Failed to load document. Please try again."
        );
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, [params.id]);

  return (
    <div>
      <div className="mb-4">
        <Link href="/documents">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Documents
          </Button>
        </Link>
      </div>

      {error ? (
        <ErrorDisplay message={error || "Document not found"} />
      ) : (
        <>
          {isLoading ? (
            <DocumentSkeleton />
          ) : document ? (
            <Suspense fallback={<DocumentSkeleton />}>
              <DocumentViewer
                document={document}
                citingDocuments={citingDocuments}
              />
            </Suspense>
          ) : (
            <ErrorDisplay message="Document not found" />
          )}
        </>
      )}
    </div>
  );
}
