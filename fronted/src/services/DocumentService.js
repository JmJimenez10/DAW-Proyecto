import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class DocumentsService {
  static BASE_URL = `${PUBLIC_IP}/api/documents`;

  static async listDocuments(token) {
    const response = await axios.get(`${DocumentsService.BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getDocument(documentId, token) {
    const response = await axios.get(`${DocumentsService.BASE_URL}/adminuser/${documentId}`, {
      responseType: "blob", // Necessary to handle binary image data
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async listDocumentsByCompanyId(companyId, token) {
    const response = await axios.get(`${DocumentsService.BASE_URL}/adminuser/company/${companyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async listDocumentsByCompanyIdCreatedBy(companyId, createdBy, token) {
    const response = await axios.get(`${DocumentsService.BASE_URL}/adminuser/company/${companyId}/createdBy/${createdBy}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async uploadDocument(documentData, createdBy, companyId, sectionId, token) {
    let formData = new FormData();
    formData.append("document", documentData);
    const response = await axios.post(`${DocumentsService.BASE_URL}/adminuser/${createdBy}/${companyId}/${sectionId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async deleteDocument(documentId, token) {
    await axios.delete(`${DocumentsService.BASE_URL}/adminuser/${documentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default DocumentsService;
