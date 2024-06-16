import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";
import { MailSendedModal } from "./MailSendedModal";
import MailService from "../../../../../services/MailService";
import { ProfileInfo } from "./ProfileInfo";
import { CompanyInfo } from "./CompanyInfo";
import IconInfoCircle from "../../../../../assets/icons/info-circle.svg";
import { UserHelpModal } from "./UserHelpModal";

export const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState({});
  const [hasAlert, setHasAlert] = useState(true);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("Mis datos");
  const [error, setError] = useState(null);
  const [openHelpModal, setOpenHelpModal] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    if (profileInfo.emailVerified) setHasAlert(false);
  }, [profileInfo]);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const fetchSendMail = async () => {
    setIsLoading(true);
    openConfirmModal();
    try {
      const token = localStorage.getItem("token");
      await MailService.sendMailVerifyMail(profileInfo.email, profileInfo.name, "[Jiménez y Hormigo Asesores] Verificar Email", "", token);
      setError(null);
    } catch (error) {
      console.error("Error sending mail:", error);
      setError(error.message || "Error al enviar el correo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    fetchSendMail();
  };

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => setConfirmModalOpen(false);

  const renderContent = () => {
    switch (activeButton) {
      case "Mis datos":
        return <ProfileInfo />;
      case "Mis empresas":
        return <CompanyInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="text-white bg-dark-blue p-5 py-10 flex flex-col justify-center items-center w-full h-full gap-3">
        <h2 className="text-4xl font-semibold">
          {profileInfo.name} {profileInfo.surnames}
        </h2>
        <p className="text-xl">{profileInfo.email}</p>
      </div>
      <div className="my-5 px-10 w-full bg-white text-white flex gap-3 flex-col justify-center items-center">
        {hasAlert ? (
          <div className="bg-orange-100 w-full border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">Verificar correo</p>
            <p>
              Para estar al día{" "}
              <button onClick={handleOpenModal} className="underline text-purple-800">
                verifique su email
              </button>{" "}
              (NO recibirá spam)
            </p>
            <MailSendedModal isOpen={confirmModalOpen} onClose={closeConfirmModal} isLoading={isLoading} error={error} />
          </div>
        ) : (
          <div className="bg-green-100 w-full border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p className="font-bold">Correo verificado</p>
          </div>
        )}
      </div>
      <div className="mx-auto">
        <button onClick={() => setOpenHelpModal(true)} className="flex justify-center items-center py-3 gap-1">
          <img src={IconInfoCircle} alt="icono información" />
          <span className="text-dark-blue font-semibold underline">Ver ayuda de usuario</span>
        </button>
      </div>
      <UserHelpModal open={openHelpModal} onClose={() => setOpenHelpModal(false)} />
      <nav className="relative mx-auto w-2/3 grid grid-cols-2 text-dark-blue font-bold text-lg">
        <div className="py-2 px-4">
          <button className="w-full text-center" onClick={() => handleButtonClick("Mis datos")}>
            Mis datos
          </button>
        </div>
        <div className="py-2 px-4">
          <button className="w-full text-center" onClick={() => handleButtonClick("Mis empresas")}>
            Mis empresas
          </button>
        </div>
        <div
          className={`absolute bottom-0 w-1/2 h-0.5 bg-dark-blue transition-all duration-300 ${
            activeButton === "Mis datos" ? "left-0" : activeButton === "Mis empresas" ? "left-1/2" : "left-2/2"
          }`}
        ></div>
      </nav>
      <div className="h-[250px]">{renderContent()}</div>
    </div>
  );
};
