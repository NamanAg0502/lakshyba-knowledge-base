"use client";

import React from "react";
import { motion } from "framer-motion";
import DocumentUploadForm from "@/components/documents/DocumentUploadForm";

export default function UploadPage() {
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

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 mb-3">
          Upload Legal Document
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Contribute to our legal knowledge base by uploading legal documents.
          Your contributions help build a comprehensive resource for legal
          professionals.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DocumentUploadForm />
      </motion.div>
    </motion.div>
  );
}
