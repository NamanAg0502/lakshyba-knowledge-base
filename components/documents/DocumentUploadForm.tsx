"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { DocumentUploadForm as DocumentUploadFormType } from "@/lib/types";
import { documentApi } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Label } from "../ui/label";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

const DocumentUploadForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DocumentUploadFormType>({
    documentType: "judgment",
    jurisdiction: "",
    file: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData({
        ...formData,
        file: e.dataTransfer.files[0],
      });
    }
  };

  const removeFile = () => {
    setFormData({
      ...formData,
      file: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.documentType || !formData.jurisdiction || !formData.file) {
      toast.error("Please fill in all required fields and select a file.");
      return;
    }

    setIsLoading(true);

    try {
      const uploadFormData = new FormData();

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "file") {
          if (value) {
            uploadFormData.append("file", value);
          }
        } else {
          if (value) {
            uploadFormData.append(key, value.toString());
          }
        }
      });

      // Upload document
      const response = await documentApi.uploadDocument(uploadFormData);

      toast.success("Document uploaded successfully!");

      setFormData({
        documentType: "judgment",
        jurisdiction: "",
        file: null,
      });

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Redirect to the document page after 2 seconds
      setTimeout(() => {
        router.push(`/documents/${response.id}`);
      }, 2000);
    } catch (err: any) {
      toast.error(
        err.response?.data?.error ||
          "Failed to upload document. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fileTypes = [".pdf", ".docx", ".txt"];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const isFileSizeValid = formData.file
    ? formData.file.size <= maxFileSize
    : true;

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold">Upload Document</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 bg-neutral-50 p-6 rounded-md">
            <h3 className="text-lg font-medium text-neutral-900">
              Document Information
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Please provide the basic information about the document you are
              uploading
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="documentType" className="text-neutral-700">
                  Document Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value) =>
                    handleSelectChange(value, "documentType")
                  }
                >
                  <SelectTrigger id="documentType" className="w-full">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="judgment">Judgment</SelectItem>
                    <SelectItem value="statute">Statute</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jurisdiction" className="text-neutral-700">
                  Jurisdiction <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jurisdiction"
                  name="jurisdiction"
                  placeholder="e.g., Delhi"
                  value={formData.jurisdiction || ""}
                  onChange={handleInputChange}
                  className="focus:border-primary-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-neutral-700">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Document title"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  className="focus:border-primary-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="court" className="text-neutral-700">
                  Court
                </Label>
                <Input
                  id="court"
                  name="court"
                  placeholder="e.g., Supreme Court of India"
                  value={formData.court || ""}
                  onChange={handleInputChange}
                  className="focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="judgmentDate" className="text-neutral-700">
                  Judgment Date
                </Label>
                <Input
                  id="judgmentDate"
                  name="judgmentDate"
                  type="date"
                  value={formData.judgmentDate || ""}
                  onChange={handleInputChange}
                  className="focus:border-primary-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caseNumber" className="text-neutral-700">
                  Case Number
                </Label>
                <Input
                  id="caseNumber"
                  name="caseNumber"
                  placeholder="e.g., CA 1234/2023"
                  value={formData.caseNumber || ""}
                  onChange={handleInputChange}
                  className="focus:border-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-neutral-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Comma-separated subjects"
                  value={formData.subject || ""}
                  onChange={handleInputChange}
                  className="focus:border-primary-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="citationString" className="text-neutral-700">
                  Citation
                </Label>
                <Input
                  id="citationString"
                  name="citationString"
                  placeholder="e.g., (2023) 5 SCC 123"
                  value={formData.citationString || ""}
                  onChange={handleInputChange}
                  className="focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-neutral-900">
              Document File
            </h3>
            <p className="text-sm text-neutral-600">
              Upload your legal document in PDF, DOCX, or TXT format (max 10MB)
            </p>

            <motion.div
              className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 rounded-md ${
                dragActive
                  ? "border-primary-500 bg-primary-50"
                  : "border-neutral-300 border-dashed hover:border-primary-400 hover:bg-neutral-50"
              } transition-colors duration-200`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="space-y-3 text-center">
                {!formData.file ? (
                  <>
                    <CloudArrowUpIcon className="mx-auto h-12 w-12 text-neutral-400" />
                    <div className="flex flex-col text-sm text-neutral-600">
                      <label
                        htmlFor="file"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none p-2"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          className="sr-only"
                          ref={fileInputRef}
                          accept={fileTypes.join(",")}
                          onChange={handleFileChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500">
                      {fileTypes.join(", ")} up to 10MB
                    </p>
                  </>
                ) : (
                  <AnimatePresence>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <DocumentTextIcon className="h-10 w-10 text-primary-500" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-neutral-700 truncate max-w-xs">
                            {formData.file.name}
                          </p>
                          <p
                            className={`text-xs ${
                              isFileSizeValid
                                ? "text-neutral-500"
                                : "text-red-500"
                            }`}
                          >
                            {getFileSize(formData.file.size)}
                            {!isFileSizeValid && " - File too large"}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 rounded-full text-neutral-400 hover:text-red-500 hover:bg-neutral-100 transition-colors"
                        >
                          <XMarkIcon className="h-5 w-5" />
                          <span className="sr-only">Remove file</span>
                        </button>
                      </div>
                      {isFileSizeValid ? (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckIcon className="h-4 w-4 mr-1" />
                          <span>File ready to upload</span>
                        </div>
                      ) : (
                        <div className="text-sm text-red-500">
                          Please select a file smaller than 10MB
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={
                (isLoading || (formData.file && !isFileSizeValid)) ?? false
              }
              className="px-6 py-2"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DocumentUploadForm;
