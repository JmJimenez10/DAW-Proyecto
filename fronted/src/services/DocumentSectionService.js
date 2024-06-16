import axios from 'axios';
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class DocumentSectionsService {
  static BASE_URL = `${PUBLIC_IP}/api/documentSections`;

  static async listDocumentSections(token) {
    const response = await axios.get(`${DocumentSectionsService.BASE_URL}/adminuser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async createDocumentSection(documentSection, token) {
    const response = await axios.post(`${DocumentSectionsService.BASE_URL}/admin`, documentSection, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getDocumentSection(documentSectionId, token) {
    const response = await axios.get(`${DocumentSectionsService.BASE_URL}/adminuser/${documentSectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async updateDocumentSection(documentSectionId, documentSection, token) {
    const response = await axios.put(`${DocumentSectionsService.BASE_URL}/admin/${documentSectionId}`, documentSection, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteDocumentSection(documentSectionId, token) {
    await axios.delete(`${DocumentSectionsService.BASE_URL}/admin/${documentSectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default DocumentSectionsService;
