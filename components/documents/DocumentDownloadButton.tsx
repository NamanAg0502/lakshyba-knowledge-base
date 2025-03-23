"use client";

import React, { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { documentApi } from "@/lib/api";
import { Button } from "../ui/Button";
import { toast } from "sonner";

interface DocumentDownloadButtonProps {
  documentId: string;
  filename?: string;
}

const DocumentDownloadButton: React.FC<DocumentDownloadButtonProps> = ({
  documentId,
  filename = "document",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const blob = await documentApi.downloadDocument(documentId);
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      
      // Append to the document and trigger the download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Download started");
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
      ) : (
        <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
      )}
      Download
    </Button>
  );
};

export default DocumentDownloadButton;
