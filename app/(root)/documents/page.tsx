"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlusIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import DocumentList from "@/components/documents/DocumentList";
import { LegalDocument } from "@/lib/types";
import { documentApi } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        damping: 12,
        stiffness: 100,
      },
    },
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        const response = await documentApi.getAllDocuments();
        console.log("Documents", response);
        setDocuments(response);
      } catch (err) {
        setError("Failed to load documents");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Counters for document types
  const judgmentCount = documents?.filter(
    (doc) => doc.documentType === "judgment"
  ).length;
  const statuteCount = documents?.filter(
    (doc) => doc.documentType === "statute"
  ).length;
  const articleCount = documents?.filter(
    (doc) => doc.documentType === "article"
  ).length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Legal Documents
          </h1>
          <p className="text-neutral-600">
            Browse and search through our collection of legal documents
          </p>
        </div>
      </motion.div>

      {error ? (
        <motion.div
          className="bg-red-50 p-4 rounded-md text-red-800 mb-6 border border-red-200"
          variants={itemVariants}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading documents
              </h3>
              <div className="mt-1 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="bg-white text-red-600 border-red-300 hover:bg-red-50"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-1" />
                  Retry
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        !isLoading && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            variants={itemVariants}
          >
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <ClipboardDocumentListIcon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Judgments
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {judgmentCount}
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  View all
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                    <DocumentTextIcon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      Statutes
                    </p>
                    <p className="text-2xl font-bold text-emerald-900">
                      {statuteCount}
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-emerald-600 text-sm font-medium hover:text-emerald-800"
                >
                  View all
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-100">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-amber-100 rounded-lg mr-3">
                    <DocumentTextIcon className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Articles
                    </p>
                    <p className="text-2xl font-bold text-amber-900">
                      {articleCount}
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-amber-600 text-sm font-medium hover:text-amber-800"
                >
                  View all
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )
      )}

      <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
        <DocumentList documents={documents} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
}
