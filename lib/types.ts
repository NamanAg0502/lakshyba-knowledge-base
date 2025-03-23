// Document types
export type DocumentType = "judgment" | "statute" | "article";

export interface Citation {
  text: string;
  normalized: string;
  referencedDocId?: string;
}

export interface LegalDocumentMetadata {
  court?: string;
  judges?: string[];
  judgmentDate?: string;
  caseNumber?: string;
  parties?: {
    petitioners: string[];
    respondents: string[];
  };
  jurisdiction: string;
  subject: string[];
  citationString?: string;
  author?: string;
  publicationDate?: string;
  effectiveDate?: string;
}

export interface LegalDocument {
  _id: string;
  title: string;
  documentType: DocumentType;
  content: string;
  metadata: LegalDocumentMetadata;
  citations: Citation[];
  createdAt: string;
  updatedAt: string;
  fileId?: string;
  originalFilename?: string;
  contentType?: string;
  fileSize?: number;
}

// Court rule types
export interface CourtRule {
  id: string;
  court: string;
  jurisdiction: string;
  ruleType: string;
  content: string;
  effectiveFrom: string;
  effectiveTo?: string;
}

// Search types
export interface SearchFilters {
  documentType?: DocumentType;
  court?: string;
  jurisdiction?: string;
  startDate?: string;
  endDate?: string;
  subject?: string[];
}

export interface SearchHighlight {
  field: string;
  snippet: string;
}

export interface SearchResult {
  document: LegalDocument;
  score: number;
  highlights?: SearchHighlight[];
}

// Form types
export interface DocumentUploadForm {
  documentType: DocumentType;
  jurisdiction: string;
  title?: string;
  court?: string;
  judgmentDate?: string;
  caseNumber?: string;
  subject?: string;
  citationString?: string;
  file: File | null;
}

export interface CourtRuleForm {
  court: string;
  jurisdiction: string;
  ruleType: string;
  content: string;
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface SearchForm {
  query: string;
  searchType: "semantic" | "keyword" | "combined";
  semanticWeight?: number;
  keywordWeight?: number;
  filters: SearchFilters;
}

// UI States
export interface DocumentViewState {
  documentId?: string;
  citation?: string;
  loading: boolean;
  document?: LegalDocument;
  error?: string;
}

export interface SearchState {
  query: string;
  searchType: "semantic" | "keyword" | "combined";
  filters: SearchFilters;
  loading: boolean;
  results: SearchResult[];
  error?: string;
}
