import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class CompanyService {
  static BASE_URL = `${PUBLIC_IP}/api/companies`;

  static async listCompanies(token) {
    const response = await axios.get(`${CompanyService.BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async createCompany(company, token) {
    const response = await axios.post(`${CompanyService.BASE_URL}/admin`, company, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getCompany(companyId, token) {
    const response = await axios.get(`${CompanyService.BASE_URL}/adminuser/${companyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async updateCompany(companyId, company, token) {
    const response = await axios.put(`${CompanyService.BASE_URL}/admin/${companyId}`, company, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteCompany(companyId, token) {
    await axios.delete(`${CompanyService.BASE_URL}/admin/${companyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static async addUserToCompany(companyId, userId, token) {
    const response = await axios.post(
      `${CompanyService.BASE_URL}/admin/addUserToCompany/${companyId}/${userId}`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
}

export default CompanyService;
