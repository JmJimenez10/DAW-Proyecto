import axios from "axios";
import { PUBLIC_IP } from "../modules/core/components/utils/Constants";

class UserService {
  static BASE_URL = `${PUBLIC_IP}/api/users`;

  static async login(email, password) {
    const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  }

  static async register(userData, token) {
    const response = await axios.post(`${UserService.BASE_URL}/admin/register`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getAllUsers(token) {
    const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getYourProfile(token) {
    const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async getUserById(userId, token) {
    const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async deleteUser(userId, token) {
    const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async updateUser(userId, userData, token) {
    const response = await axios.put(`${UserService.BASE_URL}/adminuser/update/${userId}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  static async changePasswordUser(email, newPassword, token) {
    const response = await axios.post(
      `${UserService.BASE_URL}/adminuser/change-password`,
      {
        email: email,
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Indica que el cuerpo es JSON
        },
      }
    );
    return response.data;
  }

  static async changePassword(email, newPassword) {
    const response = await axios.post(
      `${UserService.BASE_URL}/adminuser/change-password`,
      {
        email: email,
        password: newPassword,
      }
    );
    return response.data;
  }

  static async forgotPassword(email, dni, newPassword) {
    try {
      const response = await axios.post(`${UserService.BASE_URL}/auth/forgot-password`, {
        email: email,
        dni: dni,
        password: newPassword,
      });
      // Almacena el token JWT en localStorage si la solicitud tiene éxito
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      throw new Error("Error al restablecer la contraseña: " + error.message);
    }
  }

  static async verifyEmailUser(dni, password) {
    const response = await axios.post(`${UserService.BASE_URL}/verify-email`, {
      dni: dni,
      password: password,
    });
    return response.data;
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}

export default UserService;
