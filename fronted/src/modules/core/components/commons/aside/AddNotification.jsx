import { useState } from "react";
import MailService from "../../../../../services/MailService";
import NotificationService from "../../../../../services/NotificationService";
import { MailNotificationModal } from "./MailNotificationModal";

export const AddNotification = () => {
  const [message, setMessage] = useState("");
  const [deleteDate, setDeleteDate] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sendMail, setSendMail] = useState(false);

  const [errors, setErrors] = useState({
    message: "",
  });

  const token = localStorage.getItem("token");

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (message.trim()) {
      errorsCopy.message = "";
    } else {
      errorsCopy.message = "Mensaje es obligatorio";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const fetchSendMail = async (message) => {
    setIsLoading(true);
    openConfirmModal();
    try {
      await MailService.sendMailNotification("", "[Jiménez y Hormigo Asesores] Nueva Notificación", message, token);
      setError(null);
    } catch (error) {
      console.error("Error sending mail:", error);
      setError(error.message || "Error al enviar el correo");
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    window.location.reload();
  };

  const saveNotification = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const notification = { message, deleteDate };

      try {
        await NotificationService.createNotification(notification, token);
        if (sendMail) {
          fetchSendMail(message);
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-5 pt-0 flex flex-col justify-center items-center w-full h-full gap-10">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Añadir Notificación</p>
      </div>

      <form action="" className="flex flex-col items-end">
        <div className="mb-2">
          <label htmlFor="message" className="text-lg italic font-semibold">
            * Mensaje:
          </label>
          <input
            type="text"
            id="message"
            name="message"
            value={message}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.message ? "outline-red-700" : ""}`}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
          {errors.message && <div className="text-center text-red-700">{errors.message}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor="message" className="text-lg italic font-semibold">
            Fecha de eliminación:
          </label>
          <input
            type="datetime-local"
            name="deleteDate"
            id="deleteDate"
            value={deleteDate}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.deleteDate ? "outline-red-700" : ""}`}
            onChange={(e) => setDeleteDate(e.target.value)}
            autoComplete="off"
          />
          {errors.deleteDate && <div className="text-center text-red-700">{errors.deleteDate}</div>}
        </div>
        <div className="mb-2 flex items-end w-full">
          <label htmlFor="sendMail" className="text-lg italic font-semibold">
            Enviar correo general:
          </label>
          <div className="w-[300px]">
            <input type="checkbox" name="sendMail" id="sendMail" className="p-1 border rounded-sm ml-2 w-4 h-4" checked={sendMail} onChange={() => setSendMail(!sendMail)} />
          </div>
        </div>
        <MailNotificationModal isOpen={confirmModalOpen} onClose={closeConfirmModal} isLoading={isLoading} error={error} />

        <button onClick={saveNotification} className="mt-10 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
          Guardar
        </button>
      </form>
    </div>
  );
};
