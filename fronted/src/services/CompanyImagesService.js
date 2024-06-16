import axios from 'axios';
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class CompanyImagesService {
  static BASE_URL = `${PUBLIC_IP}/api/images`;

  static async getCompanyImage(companyId, token) {
    const response = await axios.get(`${CompanyImagesService.BASE_URL}/adminuser/${companyId}`, {
      responseType: 'blob',  // Necessary to handle binary image data
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async uploadCompanyImage(companyId, imageData, token) {
    let formData = new FormData();
    formData.append("image", imageData);
    const response = await axios.post(`${CompanyImagesService.BASE_URL}/admin/${companyId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  static async deleteCompanyImage(companyId, token) {
    await axios.delete(`${CompanyImagesService.BASE_URL}/admin/${companyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default CompanyImagesService;
