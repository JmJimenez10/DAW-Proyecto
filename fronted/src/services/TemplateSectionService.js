import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class TemplateSectionService {
  static BASE_URL = `${PUBLIC_IP}/api/templateSections`;

  static async listTemplateSections(token) {
    const response = await axios.get(TemplateSectionService.BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async createTemplateSection(templateSection, token) {
    const response = await axios.post(TemplateSectionService.BASE_URL, templateSection, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getTemplateSection(templateSectionId, token) {
    const response = await axios.get(`${TemplateSectionService.BASE_URL}/${templateSectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async updateTemplateSection(templateSectionId, templateSection, token) {
    const response = await axios.put(`${TemplateSectionService.BASE_URL}/${templateSectionId}`, templateSection, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteTemplateSection(templateSectionId, token) {
    await axios.delete(`${TemplateSectionService.BASE_URL}/${templateSectionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default TemplateSectionService;

