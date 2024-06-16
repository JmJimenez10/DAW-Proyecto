import { useEffect, useState } from "react";
import IconBellRinging from "../../../../../assets/icons/bell-ringing.svg";
import IconBell from "../../../../../assets/icons/bell.svg";
import IconCirclePlus from "../../../../../assets/icons/circle-plus.svg";
import IconTrash from "../../../../../assets/icons/trash-white.svg";
import "../../../../../css/animations.css";
import NotificationService from "../../../../../services/NotificationService";
import UserService from "../../../../../services/UserService";
import { Modal } from "../../utils/Modal";
import { AddNotification } from "./AddNotification";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [profileInfo, setProfileInfo] = useState({}); // Estado para almacenar la información del perfil del usuario
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfileInfo(); // Cargar la información del perfil al montar el componente
  }, []);

  // Función asincrónica para obtener la información del perfil del usuario
  const fetchProfileInfo = async () => {
    try {
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers); // Actualizar el estado con la información del perfil
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const getAllNotifications = async () => {
    try {
      const response = await NotificationService.listNotifications(token);
      const sortedNotifications = response.sort((a, b) => {
        const dateA = new Date(a.creationDate);
        const dateB = new Date(b.creationDate);
        return dateB - dateA;
      });
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error(error);
    }
  };

  const removeNotification = async (id) => {
    try {
      await NotificationService.deleteNotification(id, token);
      getAllNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  function isNewNotification(creationDate) {
    const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
    const now = new Date();
    const notificationDate = new Date(creationDate);

    const timeDifference = now.getTime() - notificationDate.getTime();

    return timeDifference < ONE_DAY_IN_MILLISECONDS;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedDay} / ${formattedMonth} / ${year} - ${formattedHours}:${formattedMinutes}`;
  }

  const [openAdd, setOpenAdd] = useState(false);
  const [modalStates, setModalStates] = useState({});

  const toggleDetailsModal = (userId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        openDetails: !prevState[userId]?.openDetails,
      },
    }));
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  let areNotifications;
  notifications.length === 0
    ? (areNotifications = false)
    : (areNotifications = true);

  const [animateBell, setAnimateBell] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimateBell((prevState) => !prevState);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <aside className="bg-gray-50 rounded-xl h-1/2 py-4 px-8 flex flex-col justify-between">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <img
          src={
            areNotifications
              ? animateBell
                ? IconBellRinging
                : IconBell
              : IconBell
          }
          alt="icono campanita"
          className={
            areNotifications
              ? `bg-red-600 p-1 rounded-full ${
                  animateBell ? "shake-animation" : ""
                }`
              : "bg-gray-600 p-1 rounded-full"
          }
        />
        <p>Notificaciones</p>
      </div>

      <div className="flex flex-col py-5 h-[200px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="italic text-center text-gray-400">
            No tienes notificaciones
          </p>
        ) : (
          notifications.map((not) => (
            <div
              key={not.id}
              className="border-y py-1 flex justify-start items-center my-1"
            >
              {isNewNotification(not.creationDate) && (
                <span className="text-sm text-red-600 bg-red-200 px-1 rounded-md border border-red-600 mr-2">
                  NEW
                </span>
              )}
              <button
                onClick={() => toggleDetailsModal(not.id)}
                className="hover:underline"
              >
                <p>
                  {not.message.length > 20
                    ? `${not.message.substring(0, 8).trim()}...`
                    : not.message}
                </p>
              </button>
              <Modal
                className="z-50"
                key={not.id}
                open={modalStates[not.id]?.openDetails}
                onClose={() => toggleDetailsModal(not.id)}
              >
                <div className="w-[500px]">
                  <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
                    <p>Detalles de Notificación</p>
                  </div>
                  <div className="my-10">
                    <p className="font-semibold text-lg">
                      <span className="italic font-normal">Mensaje: </span>
                      {not.message}
                    </p>
                    <p className="font-semibold text-lg mt-10">
                      <span className="italic font-normal">
                        Fecha creación:{" "}
                      </span>
                      {formatDate(not.creationDate)}
                    </p>
                    {not.deleteDate ? (
                      <p className="font-semibold text-lg">
                        <span className="italic font-normal">
                          Fecha eliminación:{" "}
                        </span>
                        {formatDate(not.deleteDate)}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  {profileInfo.role === "ADMIN" && (
                    <button
                      onClick={() => removeNotification(not.id)}
                      className="flex justify-center items-center gap-2 py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white"
                    >
                      <img src={IconTrash} alt="papelera" />
                      Eliminar
                    </button>
                  )}
                </div>
              </Modal>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center">
        {profileInfo.role === "ADMIN" && (
          <>
            <button
              onClick={() => setOpenAdd(true)}
              className="hover:bg-gray-300 rounded-full p-2 hover:scale-110"
            >
              <img src={IconCirclePlus} alt="icono añadir" className="w-8" />
            </button>
            <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
              <AddNotification />
            </Modal>
          </>
        )}
      </div>
    </aside>
  );
};
