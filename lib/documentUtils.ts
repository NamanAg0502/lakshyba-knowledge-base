/**
 * Utility functions for document handling and metadata extraction
 */

import { format } from 'date-fns';

// Document type definitions
export type DocumentType = 'judgment' | 'statute' | 'article' | 'rule' | 'other';

export interface DocumentMetadata {
  title?: string;
  authors?: string[];
  court?: string;
  judgmentDate?: string;
  jurisdiction?: string;
  judges?: string[];
  citationCount?: number;
  keywords?: string[];
  category?: string;
  fileType?: string;
  fileSize?: number;
  pageCount?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // Allow for additional custom metadata
}

export interface Citation {
  id: string;
  title: string;
  year?: number;
  court?: string;
  citationText?: string;
}

/**
 * Format document file size in a human-readable way
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format date with fallback for invalid dates
 */
export const formatDate = (dateString: string | undefined, fallback = 'N/A'): string => {
  if (!dateString) return fallback;
  
  try {
    return format(new Date(dateString), 'PPP');
  } catch (e) {
    console.error('Invalid date format:', dateString);
    return fallback;
  }
};

/**
 * Get appropriate icon and color for document type
 */
export const getDocumentTypeInfo = (documentType: DocumentType | string) => {
  switch (documentType.toLowerCase()) {
    case 'judgment':
      return { color: 'primary', icon: 'ScaleIcon' };
    case 'statute':
      return { color: 'info', icon: 'DocumentTextIcon' };
    case 'article':
      return { color: 'warning', icon: 'BookOpenIcon' };
    case 'rule':
      return { color: 'success', icon: 'ClipboardDocumentCheckIcon' };
    default:
      return { color: 'secondary', icon: 'DocumentIcon' };
  }
};

/**
 * Extract text content from PDF data buffer
 * This is a placeholder - in a real implementation, 
 * you would use a proper PDF parsing library
 */
export const extractTextFromPdf = async (pdfData: ArrayBuffer): Promise<string> => {
  // This is where you would implement PDF text extraction
  // using a library like pdf.js or pdfjs-dist
  
  // Placeholder implementation
  return "PDF text content would be extracted here...";
};

/**
 * Parse citations from document text
 * This is a basic implementation - a real one would be more sophisticated
 */
export const parseCitations = (text: string): Citation[] => {
  // Simple regex to detect citation patterns
  // This is a very basic implementation and would need to be enhanced for real use
  const citationRegex = /([A-Za-z]+)\s+v\.\s+([A-Za-z]+)\s+\((\d{4})\)/g;
  const citations: Citation[] = [];
  
  let match;
  while ((match = citationRegex.exec(text)) !== null) {
    citations.push({
      id: `cite-${citations.length + 1}`,
      title: `${match[1]} v. ${match[2]}`,
      year: parseInt(match[3], 10),
      citationText: match[0]
    });
  }
  
  return citations;
};

/**
 * Detect language of document text
 * This is a basic implementation - a real one would use a language detection library
 */
export const detectDocumentLanguage = (text: string): string => {
  // This is a placeholder - in a real implementation, 
  // you would use a language detection library
  
  // Very simplistic check for Hindi characters (Devanagari script)
  const devanagariPattern = /[\u0900-\u097F]/;
  if (devanagariPattern.test(text)) {
    return 'hi'; // Hindi
  }
  
  // Default to English
  return 'en';
};

/**
 * Check if a document is searchable (contains real text vs. just scanned images)
 */
export const isSearchablePdf = (text: string): boolean => {
  // If we can extract more than a certain amount of text, assume it's searchable
  return text.length > 100;
};