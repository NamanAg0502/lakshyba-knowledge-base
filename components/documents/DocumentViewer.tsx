import React, { useState, useCallback, useMemo, useEffect } from "react";
import DocumentDownloadButton from "./DocumentDownloadButton";
import { format } from "date-fns";
import {
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ScaleIcon,
  CalendarIcon,
  MapPinIcon,
  HashtagIcon,
  LinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { LegalDocument } from "@/lib/types";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

// Constants
const PARAGRAPHS_PER_PAGE = 15;

interface DocumentViewerProps {
  document: LegalDocument;
  citingDocuments?: LegalDocument[];
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document: initialDocument,
  citingDocuments = [],
}) => {
  const [activeTab, setActiveTab] = useState<
    "content" | "metadata" | "citations"
  >("content");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // For text search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);

  // Splitting the content into paragraphs for pagination
  const documentParagraphs = useMemo(() => {
    return initialDocument.content
      .split("\n")
      .filter((para) => para.trim() !== "");
  }, [initialDocument.content]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(documentParagraphs.length / PARAGRAPHS_PER_PAGE);
  }, [documentParagraphs.length]);

  // Get current page's paragraphs
  const currentParagraphs = useMemo(() => {
    const startIndex = (currentPage - 1) * PARAGRAPHS_PER_PAGE;
    return documentParagraphs.slice(
      startIndex,
      startIndex + PARAGRAPHS_PER_PAGE
    );
  }, [documentParagraphs, currentPage]);

  // Search functionality
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results: number[] = [];
    const lowerCaseQuery = searchQuery.toLowerCase();

    documentParagraphs.forEach((paragraph, index) => {
      if (paragraph.toLowerCase().includes(lowerCaseQuery)) {
        results.push(index);
      }
    });

    setSearchResults(results);
    setCurrentSearchIndex(0);

    // If results found, navigate to the page containing the first result
    if (results.length > 0) {
      const pageForFirstResult =
        Math.floor(results[0] / PARAGRAPHS_PER_PAGE) + 1;
      setCurrentPage(pageForFirstResult);
    }
  }, [searchQuery, documentParagraphs]);

  // Handle pagination
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);

        // Scroll to top of document content when page changes
        const contentElement = document.getElementById("document-content");
        if (contentElement) {
          contentElement.scrollTop = 0;
        }
      }
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [goToPage, currentPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [goToPage, currentPage]);

  // Move through search results
  const navigateSearchResults = useCallback(
    (direction: "next" | "prev") => {
      if (searchResults.length === 0) return;

      let newIndex;
      if (direction === "next") {
        newIndex = (currentSearchIndex + 1) % searchResults.length;
      } else {
        newIndex =
          (currentSearchIndex - 1 + searchResults.length) %
          searchResults.length;
      }

      setCurrentSearchIndex(newIndex);
      const resultParaIndex = searchResults[newIndex];
      const pageForResult =
        Math.floor(resultParaIndex / PARAGRAPHS_PER_PAGE) + 1;
      setCurrentPage(pageForResult);
    },
    [searchResults, currentSearchIndex]
  );

  // Use keyboard shortcuts for pagination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "content") return;

      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextPage, prevPage, activeTab]);

  // Copy to clipboard with visual feedback
  const [copySuccess, setCopySuccess] = useState(false);
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(initialDocument.content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  }, [initialDocument.content]);

  // Lazy-loaded metadata tab
  const renderMetadata = useCallback(() => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialDocument?.metadata?.court && (
            <div>
              <div className="flex items-center text-sm font-medium text-neutral-500 mb-1">
                <ScaleIcon className="h-4 w-4 mr-1" />
                Court
              </div>
              <p>{initialDocument?.metadata?.court}</p>
            </div>
          )}

          {initialDocument.metadata.judgmentDate && (
            <div>
              <div className="flex items-center text-sm font-medium text-neutral-500 mb-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                Judgment Date
              </div>
              <p>
                {format(new Date(initialDocument.metadata.judgmentDate), "PPP")}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialDocument.metadata.jurisdiction && (
            <div>
              <div className="flex items-center text-sm font-medium text-neutral-500 mb-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                Jurisdiction
              </div>
              <p>{initialDocument.metadata.jurisdiction}</p>
            </div>
          )}

          {initialDocument.metadata.caseNumber && (
            <div>
              <div className="flex items-center text-sm font-medium text-neutral-500 mb-1">
                <HashtagIcon className="h-4 w-4 mr-1" />
                Case Number
              </div>
              <p>{initialDocument.metadata.caseNumber}</p>
            </div>
          )}
        </div>

        {initialDocument.metadata.parties && (
          <div>
            <div className="text-sm font-medium text-neutral-500 mb-1">
              Parties
            </div>
            <div className="bg-neutral-50 p-3 rounded-md">
              {initialDocument.metadata.parties.petitioners &&
                initialDocument.metadata.parties.petitioners.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium">Petitioners:</p>
                    <ul className="list-disc list-inside">
                      {initialDocument.metadata.parties.petitioners.map(
                        (petitioner, index) => (
                          <li key={index} className="text-sm">
                            {petitioner}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {initialDocument.metadata.parties.respondents &&
                initialDocument.metadata.parties.respondents.length > 0 && (
                  <div>
                    <p className="text-sm font-medium">Respondents:</p>
                    <ul className="list-disc list-inside">
                      {initialDocument.metadata.parties.respondents.map(
                        (respondent, index) => (
                          <li key={index} className="text-sm">
                            {respondent}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}

        {initialDocument.metadata.subject &&
          initialDocument.metadata.subject.length > 0 && (
            <div>
              <div className="text-sm font-medium text-neutral-500 mb-1">
                Subject
              </div>
              <div className="flex flex-wrap gap-2">
                {initialDocument.metadata.subject.map((subject, index) => (
                  <Badge key={index} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {initialDocument.metadata.citationString && (
          <div>
            <div className="flex items-center text-sm font-medium text-neutral-500 mb-1">
              <LinkIcon className="h-4 w-4 mr-1" />
              Citation
            </div>
            <p>{initialDocument.metadata.citationString}</p>
          </div>
        )}

        {initialDocument.metadata.judges &&
          initialDocument.metadata.judges.length > 0 && (
            <div>
              <div className="text-sm font-medium text-neutral-500 mb-1">
                Judges
              </div>
              <ul className="list-disc list-inside">
                {initialDocument.metadata.judges.map((judge, index) => (
                  <li key={index} className="text-sm">
                    {judge}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }, [initialDocument]);

  // Lazy-loaded citations tab
  const renderCitations = useCallback(() => {
    return (
      <div className="space-y-4">
        {initialDocument?.citations?.length === 0 ? (
          <p className="text-neutral-500">
            No citations found in this initialDocument.
          </p>
        ) : (
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-2">
              Citations in this document
            </h3>
            <ul className="divide-y divide-neutral-200">
              {initialDocument.citations.map((citation, index) => (
                <li key={index} className="py-2">
                  <p className="text-sm font-medium">{citation.text}</p>
                  {citation.referencedDocId && (
                    <a
                      href={`/documents/${citation.referencedDocId}`}
                      className="text-xs text-primary-600 hover:text-primary-800"
                    >
                      View referenced document
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {citingDocuments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">
              Documents citing this document
            </h3>
            <ul className="divide-y divide-neutral-200">
              {citingDocuments.map((doc) => (
                <li key={doc._id} className="py-2">
                  <a
                    href={`/documents/${doc._id}`}
                    className="text-sm font-medium text-primary-600 hover:text-primary-800"
                  >
                    {doc.title}
                  </a>
                  <p className="text-xs text-neutral-500">
                    {doc.metadata.court},{" "}
                    {doc.metadata.judgmentDate &&
                      format(new Date(doc.metadata.judgmentDate), "PP")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }, [citingDocuments, initialDocument.citations]);

  // Render pagination controls
  const renderPagination = () => (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6 mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-neutral-700">
            Showing page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="rounded-l-md"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Logic to show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    currentPage === pageNum
                      ? "bg-primary-100 text-primary-700 z-10"
                      : "bg-white text-neutral-500 hover:bg-neutral-50"
                  } border border-neutral-300`}
                >
                  {pageNum}
                </button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="rounded-r-md"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-neutral-900">
                {initialDocument.title}
              </h1>
              <Badge
                variant={
                  initialDocument.documentType === "judgment"
                    ? "default"
                    : initialDocument.documentType === "statute"
                    ? "info"
                    : "secondary"
                }
              >
                {initialDocument.documentType.charAt(0).toUpperCase() +
                  initialDocument.documentType.slice(1)}
              </Badge>
            </div>

            <div className="text-sm text-neutral-500">
              {initialDocument.metadata.court && (
                <span className="mr-3">{initialDocument.metadata.court}</span>
              )}
              {initialDocument.metadata.judgmentDate && (
                <span className="mr-3">
                  {format(
                    new Date(initialDocument.metadata.judgmentDate),
                    "PP"
                  )}
                </span>
              )}
              {initialDocument.metadata.jurisdiction && (
                <span>{initialDocument.metadata.jurisdiction}</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copySuccess ? "Copied!" : "Copy Text"}
            </Button>
            <DocumentDownloadButton
              documentId={initialDocument._id}
              filename={
                initialDocument.originalFilename ||
                `${initialDocument.title}.pdf`
              }
            />
          </div>
        </div>

        <div className="border-b border-neutral-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("content")}
              className={`border-b-2 py-2 px-1 text-sm font-medium ${
                activeTab === "content"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              }`}
            >
              <DocumentTextIcon className="h-5 w-5 inline-block mr-1" />
              Content
            </button>
            <button
              onClick={() => setActiveTab("metadata")}
              className={`border-b-2 py-2 px-1 text-sm font-medium ${
                activeTab === "metadata"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              }`}
            >
              <ClipboardDocumentListIcon className="h-5 w-5 inline-block mr-1" />
              Metadata
            </button>
            <button
              onClick={() => setActiveTab("citations")}
              className={`border-b-2 py-2 px-1 text-sm font-medium ${
                activeTab === "citations"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              }`}
            >
              <LinkIcon className="h-5 w-5 inline-block mr-1" />
              Citations{" "}
              {initialDocument.citations.length > 0 &&
                `(${initialDocument.citations.length})`}
            </button>
          </nav>
        </div>

        {/* Search bar - Only visible in content tab */}
        {activeTab === "content" && (
          <div className="flex items-center space-x-2">
            {searchResults.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateSearchResults("prev")}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateSearchResults("next")}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}

        <div>
          {activeTab === "content" && (
            <>
              <div
                id="document-content"
                className="prose prose-neutral max-w-none overflow-y-auto p-4"
                style={{ maxHeight: "70vh" }}
              >
                {currentParagraphs.map((paragraph, index) => {
                  // Highlight search results
                  if (searchQuery && searchResults.length > 0) {
                    const globalParaIndex =
                      (currentPage - 1) * PARAGRAPHS_PER_PAGE + index;
                    const isHighlighted =
                      searchResults.includes(globalParaIndex);

                    if (isHighlighted) {
                      // Split text to highlight search terms
                      const parts = [];
                      let lastIndex = 0;
                      const lowerText = paragraph.toLowerCase();
                      const lowerQuery = searchQuery.toLowerCase();

                      let searchIndex = lowerText.indexOf(
                        lowerQuery,
                        lastIndex
                      );
                      while (searchIndex !== -1) {
                        parts.push(paragraph.substring(lastIndex, searchIndex));
                        parts.push(
                          <mark
                            key={searchIndex}
                            className="bg-yellow-200 px-0.5"
                          >
                            {paragraph.substring(
                              searchIndex,
                              searchIndex + searchQuery.length
                            )}
                          </mark>
                        );
                        lastIndex = searchIndex + searchQuery.length;
                        searchIndex = lowerText.indexOf(lowerQuery, lastIndex);
                      }
                      parts.push(paragraph.substring(lastIndex));

                      return (
                        <p
                          key={index}
                          className="border-l-4 border-yellow-400 pl-2"
                        >
                          {parts}
                        </p>
                      );
                    }
                  }

                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
              {renderPagination()}
            </>
          )}

          {activeTab === "metadata" && renderMetadata()}

          {activeTab === "citations" && renderCitations()}
        </div>
      </Card>
    </div>
  );
};

export default DocumentViewer;
