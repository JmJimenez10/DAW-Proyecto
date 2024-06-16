import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";

export const ProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [emailNotifications, setEmailNotifications] = useState(false);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  // Función asincrónica para obtener la información del perfil del usuario
  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
      setEmailNotifications(response.ourUsers.emailNotifications);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  // Función para manejar el cambio del checkbox
  const handleCheckboxChange = async (e) => {
    const newValue = e.target.checked;
    setEmailNotifications(newValue);
    try {
      const token = localStorage.getItem("token");
      await UserService.updateUser(profileInfo.id, { ...profileInfo, emailNotifications: newValue }, token);
    } catch (error) {
      console.error("Error updating email notifications preference:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 pt-5">
        <div className="col-span-1 flex gap-5 flex-col items-end">
          <p className="text-xl">DNI:</p>
          <p className="text-xl">Email:</p>
          <p className="text-xl">Nombre:</p>
          <p className="text-xl">Apellidos:</p>
        </div>
        <div className="col-span-1 flex gap-5 flex-col items-start">
          <p className="text-xl font-bold">{profileInfo.dni}</p>
          <p className="text-xl font-bold">{profileInfo.email}</p>
          <p className="text-xl font-bold">{profileInfo.name}</p>
          <p className="text-xl font-bold">{profileInfo.surnames}</p>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <label className="inline-flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleCheckboxChange}
            className="sr-only peer"
          />
          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-dark-blue"></div>
          <span className="ms-3 text-lg font-medium">Deseo recibir notificaciones electrónicas (NO SPAM)</span>
        </label>
      </div>
    </>
  );
};
