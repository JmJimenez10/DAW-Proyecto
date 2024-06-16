import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class CompanyUserService {
  static BASE_URL = `${PUBLIC_IP}/api/companyUser`;

  static async listUserCompany(token) {
    const response = await axios.get(`${CompanyUserService.BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async usersByCompanyId(companyId, token) {
    const response = await axios.get(`${CompanyUserService.BASE_URL}/admin/users/${companyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async companiesByUserId(userId, token) {
    const response = await axios.get(`${CompanyUserService.BASE_URL}/adminuser/companies/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteUserFromCompany(companyId, userId, token) {
    await axios.delete(`${CompanyUserService.BASE_URL}/admin/${companyId}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default CompanyUserService;
