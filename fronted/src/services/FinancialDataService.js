import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class FinancialDataService {
  static BASE_URL = `${PUBLIC_IP}/api/financial-data`;

  static async getFinancialDataById(id) {
    const response = await axios.get(`${FinancialDataService.BASE_URL}/${id}`);
    return response.data;
  }

  static async getFinancialDataByCompanyId(companyId, token) {
    const response = await axios.get(`${FinancialDataService.BASE_URL}/company/${companyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async createFinancialData(financialData, token) {
    const response = await axios.post(FinancialDataService.BASE_URL, financialData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async updateFinancialData(id, financialData, token) {
    const response = await axios.put(`${FinancialDataService.BASE_URL}/${id}`, financialData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteFinancialData(id, token) {
    await axios.delete(`${FinancialDataService.BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default FinancialDataService;
