"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRightIcon,
  DocumentTextIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  MapPinIcon,
  DocumentDuplicateIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import { LegalDocument } from "@/lib/types";
import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

interface DocumentListProps {
  documents: LegalDocument[];
  isLoading?: boolean;
}

type SortOption = "recent" | "oldest" | "title-asc" | "title-desc";

const DocumentList: React.FC<DocumentListProps> = ({
  documents: initialDocuments,
  isLoading = false,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [documentType, setDocumentType] = useState<string>("");
  const [jurisdiction, setJurisdiction] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  console.log("Documents", initialDocuments);

  // Filter and sort documents
  const filteredDocuments = initialDocuments
    .filter((doc) => {
      const matchesSearch =
        searchTerm === "" ||
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.metadata.court &&
          doc.metadata.court
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (doc.metadata.jurisdiction &&
          doc.metadata.jurisdiction
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      const matchesType =
        documentType === "" || doc.documentType === documentType;
      const matchesJurisdiction =
        jurisdiction === "" ||
        (doc.metadata.jurisdiction &&
          doc.metadata.jurisdiction
            .toLowerCase()
            .includes(jurisdiction.toLowerCase()));

      return matchesSearch && matchesType && matchesJurisdiction;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-5 animate-pulse">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-neutral-200"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-neutral-200 rounded w-full"></div>
                <div className="h-3 bg-neutral-200 rounded w-full"></div>
                <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case "judgment":
        return <BuildingLibraryIcon className="h-6 w-6" />;
      case "statute":
        return <DocumentDuplicateIcon className="h-6 w-6" />;
      case "article":
        return <DocumentTextIcon className="h-6 w-6" />;
      default:
        return <DocumentTextIcon className="h-6 w-6" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "judgment":
        return "bg-blue-100 text-blue-700";
      case "statute":
        return "bg-emerald-100 text-emerald-700";
      case "article":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  // Extract unique jurisdictions for filter dropdown
  const uniqueJurisdictions = Array.from(
    new Set(
      initialDocuments
        .map((doc) => doc.metadata.jurisdiction)
        .filter(Boolean) as string[]
    )
  ).sort();

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <div className="flex space-x-2">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <ArrowsUpDownIcon className="h-4 w-4 mr-2" />
                  <span>Sort by</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
              {(documentType || jurisdiction) && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                  {(documentType ? 1 : 0) + (jurisdiction ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type-filter">Document Type</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger id="document-type-filter">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      <SelectItem value="judgment">Judgment</SelectItem>
                      <SelectItem value="statute">Statute</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jurisdiction-filter">Jurisdiction</Label>
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger id="jurisdiction-filter">
                      <SelectValue placeholder="All jurisdictions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All jurisdictions</SelectItem>
                      {uniqueJurisdictions.map((j) => (
                        <SelectItem key={j} value={j}>
                          {j}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm("");
                      setDocumentType("");
                      setJurisdiction("");
                      setSortBy("recent");
                    }}
                    className="text-neutral-600 hover:text-neutral-800"
                  >
                    Reset all filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-600">
          Showing{" "}
          <span className="font-medium">{filteredDocuments.length}</span> of{" "}
          <span className="font-medium">{initialDocuments.length}</span>{" "}
          documents
        </p>
        {(searchTerm || documentType || jurisdiction) && (
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setDocumentType("");
              setJurisdiction("");
            }}
            className="text-sm"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Empty state */}
      {filteredDocuments.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-8">
            <div className="text-center py-6">
              <DocumentTextIcon className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 text-lg mb-2">
                No documents found
              </p>
              <p className="text-neutral-500 text-sm">
                Try adjusting your filters or search terms.
              </p>
              {(searchTerm || documentType || jurisdiction) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setDocumentType("");
                    setJurisdiction("");
                  }}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Document list */}
      {filteredDocuments.length > 0 && (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredDocuments.map((document) => {
            const badgeVariant =
              document.documentType === "judgment"
                ? "default"
                : document.documentType === "statute"
                ? "info"
                : "secondary";

            const iconColorClass = getDocumentTypeColor(document.documentType);

            return (
              <motion.div
                key={document._id}
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <Card className="hover:shadow-md transition-all border-l-4 border-l-primary-500 overflow-hidden">
                  <Link
                    href={`/documents/${document._id}`}
                    className="block p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2.5 rounded-lg ${iconColorClass}`}>
                        {getDocumentTypeIcon(document.documentType)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900 mr-2 line-clamp-1">
                            {document.title}
                          </h3>
                          <Badge variant={badgeVariant}>
                            {document.documentType.charAt(0).toUpperCase() +
                              document.documentType.slice(1)}
                          </Badge>
                        </div>

                        <div className="mb-3 text-sm text-neutral-600 flex flex-wrap gap-x-6 gap-y-2">
                          {document.metadata.court && (
                            <div className="flex items-center">
                              <BuildingLibraryIcon className="h-4 w-4 mr-1.5 text-neutral-500" />
                              <span className="truncate">
                                {document.metadata.court}
                              </span>
                            </div>
                          )}
                          {document.metadata.judgmentDate && (
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-1.5 text-neutral-500" />
                              <span>
                                {format(
                                  new Date(document.metadata.judgmentDate),
                                  "PP"
                                )}
                              </span>
                            </div>
                          )}
                          {document.metadata.jurisdiction && (
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1.5 text-neutral-500" />
                              <span>{document.metadata.jurisdiction}</span>
                            </div>
                          )}
                        </div>

                        {document.metadata.subject && (
                          <p className="text-sm text-neutral-600 mb-3 line-clamp-1">
                            <span className="font-medium">Subject:</span>{" "}
                            {document.metadata.subject}
                          </p>
                        )}

                        <div className="flex justify-between items-center text-sm pt-1 mt-2 border-t border-neutral-100">
                          <div className="flex items-center text-primary-600 font-medium group">
                            View document
                            <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="text-neutral-500">
                            {format(new Date(document.createdAt), "PPP")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default DocumentList;
