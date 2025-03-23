import axios from "axios";

// API client configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api/knowledge";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Document API
export const documentApi = {
  // Get all documents
  getAllDocuments: async () => {
    const response = await apiClient.get("/documents");
    return response.data;
  },

  // Get document by ID
  getDocumentById: async (id: string) => {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
  },

  // Get document by citation
  getDocumentByCitation: async (citation: string) => {
    const response = await apiClient.get(
      `/documents/citation/${encodeURIComponent(citation)}`
    );
    return response.data;
  },

  // Upload document
  uploadDocument: async (formData: FormData) => {
    const response = await apiClient.post("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update document metadata
  updateDocumentMetadata: async (id: string, metadata: any) => {
    const response = await apiClient.patch(`/documents/${id}`, metadata);
    return response.data;
  },

  // Delete document
  deleteDocument: async (id: string) => {
    await apiClient.delete(`/documents/${id}`);
    return true;
  },
  
  // Download document
  downloadDocument: async (id: string) => {
    const response = await apiClient.get(`/documents/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
