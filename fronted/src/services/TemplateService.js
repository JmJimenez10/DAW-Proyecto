import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class TemplateService {
  static BASE_URL = `${PUBLIC_IP}/api/templates`;

  static async listTemplates(token) {
    const response = await axios.get(TemplateService.BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getTemplate(templateId, token) {
    const response = await axios.get(`${TemplateService.BASE_URL}/${templateId}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob",
    });
    return response.data;
  }

  static async uploadTemplate(templateData, sectionId, token) {
    const formData = new FormData();
    formData.append("template", templateData);
    const response = await axios.post(`${TemplateService.BASE_URL}/${sectionId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async deleteTemplate(templateId, token) {
    await axios.delete(`${TemplateService.BASE_URL}/${templateId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default TemplateService;
