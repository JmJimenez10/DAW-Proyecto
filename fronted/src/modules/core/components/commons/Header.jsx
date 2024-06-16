import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import soloLetrasLogo from "../../../../assets/LetrasLogoJyH_NoFondo.png";
import soloLogo from "../../../../assets/SoloLogoJyH_NoFondo.png";
import IconExclamation from "../../../../assets/icons/exclamation-circle.svg";
import IconMaximize from "../../../../assets/icons/maximize.svg";
import IconMinimize from "../../../../assets/icons/minimize.svg";
import IconUserCircle from "../../../../assets/icons/user-circle.svg";
import UserService from "../../../../services/UserService";
import { Modal } from "../utils/Modal";
import { ProfilePage } from "./user-data/ProfilePage";

export const Header = (props) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [hasAlert, setHasAlert] = useState(true);
  const [icon, setIcon] = useState(IconMaximize);

  useEffect(() => {
    fetchProfileInfo();
    // Cargar el estado del ícono desde localStorage
    const storedSize = sessionStorage.getItem("selectedSize");
    if (storedSize === "sizeMinimize") {
      setIcon(IconMinimize);
    } else {
      setIcon(IconMaximize);
    }
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

  const [openProfile, setOpenProfile] = useState(false);

  const toggleIcon = () => {
    const newIcon = icon === IconMaximize ? IconMinimize : IconMaximize;
    setIcon(newIcon);
    sessionStorage.setItem("selectedSize", newIcon === IconMaximize ? "sizeMaximize" : "sizeMinimize");
    window.location.reload();
  };

  return (
    <header className={`flex lg:grid grid-cols-12 lg:gap-12 ${props.className}`}>
      <section className="flex items-end lg:col-span-2 justify-center">
        <img src={soloLogo} alt="logo jimenez y hormigo asesores" className="w-16" />
        <img src={soloLetrasLogo} alt="letras logo jimenez y hormigo asesores" className="w-2/3 hidden lg:block" />
      </section>

      <section className="lg:col-span-6 font-semibold flex items-end">
        <h1 className="ml-3 lg:ml-0 text-2xl md:text-3xl lg:text-5xl xl:mr-5">{props.sectionName}</h1>
        <button onClick={toggleIcon} className="hidden xl:block">
          <img src={icon} alt="" className="size-10 hover:scale-110" />
        </button>
      </section>

      <section className="hidden lg:col-span-4 gap-5 lg:flex justify-end items-end">
        <button onClick={() => setOpenProfile(true)} className="lg:flex justify-end items-end hover:bg-clear-gray rounded-lg px-5">
          <div className="text-end">
            <p className="text-lg font-semibold">
              {profileInfo.name} {profileInfo.surnames}
            </p>
            <p>{profileInfo.role}</p>
          </div>
          <div className="relative">
            <img src={IconUserCircle} alt="" className="w-16" />
            {hasAlert && (
              <div className="absolute top-0 right-0 bg-orange-100 rounded-full">
                <img src={IconExclamation} alt="" className="shake-animation" />
              </div>
            )}
          </div>
        </button>
        <Modal minSize closeOut open={openProfile} onClose={() => setOpenProfile(false)}>
          <ProfilePage />
        </Modal>
      </section>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  sectionName: PropTypes.string,
};
