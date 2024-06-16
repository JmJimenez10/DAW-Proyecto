import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class NotificationService {
  static BASE_URL = `${PUBLIC_IP}/api/notifications`;

  static async listNotifications(token) {
    const response = await axios.get(NotificationService.BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async createNotification(notification, token) {
    const response = await axios.post(NotificationService.BASE_URL, notification, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getNotification(notificationId, token) {
    const response = await axios.get(`${NotificationService.BASE_URL}/${notificationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async updateNotification(notificationId, notification, token) {
    const response = await axios.put(`${NotificationService.BASE_URL}/${notificationId}`, notification, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteNotification(notificationId, token) {
    await axios.delete(`${NotificationService.BASE_URL}/${notificationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default NotificationService;
