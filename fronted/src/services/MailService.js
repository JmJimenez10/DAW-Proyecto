import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class MailService {
  static BASE_URL = `${PUBLIC_IP}/api/mail/send`;

  static async sendMailVerifyMail(mailTo, name, subject, message, token) {
    try {
      const response = await axios.post(`${MailService.BASE_URL}`, {
        mailTo,
        name,
        subject,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error desconocido');
    }
  }

  static async sendMailNotification(mailTo, subject, message, token) {
    try {
      const response = await axios.post(`${MailService.BASE_URL + "-all"}`, {
        mailTo,
        subject,
        message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error desconocido');
    }
  }

  static async sendMailResetPassword(mailTo, name, subject, temporalUrl) {
    try {
      const response = await axios.post(`${PUBLIC_IP}/api/mail/reset-password`, {
        mailTo,
        name,
        subject,
        temporalUrl
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error desconocido');
    }
  }
}

export default MailService;
