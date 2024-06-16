import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/SoloLogoJyH_NoFondo.png";
import IconEyeOff from "../../assets/icons/eye-off.svg";
import IconEye from "../../assets/icons/eye.svg";
import UserService from "../../services/UserService";
import MailService from "../../services/MailService";
import { MailSendedModal } from "../core/components/commons/user-data/MailSendedModal";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberEmail, setRememberEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => setConfirmModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        if (rememberEmail) {
          localStorage.setItem("savedEmail", email); // Guardar el correo si se seleccionó recordarlo
        } else {
          localStorage.removeItem("savedEmail"); // Limpiar el correo almacenado si no se seleccionó recordarlo
        }

        if (userData.firstLogin) {
          navigate("/change"); // Redireccionar a la página de cambio de contraseña si es la primera vez que entra
        } else {
          navigate("/app/dashboard"); // Redireccionar al dashboard
        }
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    localStorage.setItem("emailUser", email);
    localStorage.setItem("dniUser", dni);
    localStorage.setItem("passwordUser", newPassword);
    localStorage.setItem("timestamp", new Date().getTime());

    try {
      setIsLoading(true);
      openConfirmModal();
      const newUuid = uuid();
      localStorage.setItem("uuid", newUuid);
      await MailService.sendMailResetPassword(email, dni, "[Jiménez y Hormigo Asesores] Resetear contraseña", newUuid);
      setError(null); // Limpiar cualquier error previo si el envío es exitoso
    } catch (error) {
      console.error("Error sending mail:", error);
      setError(error.message || "Error al enviar el correo"); // Actualizar el estado de error
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar el correo guardado al montar el componente
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-blue to-clear-blue p-3 xl:px-0 flex items-center justify-center">
      <article className="w-full xl:w-3/5 lg:h-[70vh] bg-white rounded-3xl flex flex-col lg:flex-row relative">
        <section className="lg:flex-1 flex justify-center items-center flex-col border-8 py-10 xl:py-0 border-dark-blue rounded-t-2xl lg:rounded-l-3xl lg:rounded-tr-none h-[40rem] lg:h-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-5 font-semibold ">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="w-72 my-7">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                  Email
                </label>
              </div>
            </div>

            <div className="w-72 my-7">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                  Contraseña
                </label>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-2 right-1 bg-white p-2">
                  {showPassword ? <img src={IconEyeOff} alt="Ocultar contraseña" /> : <img src={IconEye} alt="Ver contraseña" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-700 mb-5 text-center">{error}</p>}

            <div className="flex flex-col gap-2">
              <label className="text-sm">
                <input type="checkbox" checked={rememberEmail} onChange={(e) => setRememberEmail(e.target.checked)} className="mr-2" />
                Recordar Email
              </label>
              <button
                className="text-dark-blue underline"
                onClick={(e) => {
                  e.preventDefault();
                  setForgotPassword(!forgotPassword);
                }}
              >
                He olvidado la contraseña
              </button>
              <p className="text-clear-gray font-semibold">Si no tiene acceso contacta con nosotros</p>
            </div>

            <div className="flex justify-center mt-9">
              <button type="submit" className="mt-5 mb-3 primary-button">
                Entrar
              </button>
            </div>
          </form>
          <Link to="/" className="secondary-button">
            Volver
          </Link>
        </section>

        <section className="lg:flex-1 flex justify-center items-center flex-col py-10 xl:py-0 border-8 border-dark-blue rounded-b-2xl lg:rounded-r-3xl lg:rounded-bl-none h-[40rem] lg:h-full">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center mb-5 font-semibold">Recuperar Contraseña</h2>
          <form onSubmit={handleNewPassword}>
            <div className="w-72 my-7">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                  Email
                </label>
              </div>
            </div>

            <div className="w-72 my-7">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.toUpperCase())}
                  maxLength={9}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                  DNI
                </label>
              </div>
            </div>

            <div className="w-72 my-7">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                  Nueva Contraseña
                </label>
              </div>
            </div>

            <div className="w-72 my-7">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  type={showPassword ? "text" : "password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue">
                  Repetir Contraseña
                </label>
              </div>
            </div>

            {error && <p className="text-red-700 mb-5 text-center">{error}</p>}

            <div className="flex flex-col gap-2">
              <button
                className="text-dark-blue underline"
                onClick={(e) => {
                  e.preventDefault();
                  setForgotPassword(!forgotPassword);
                }}
              >
                Iniciar sesión
              </button>
            </div>

            <div className="flex gap-10 justify-center items-center mt-9">
              <button type="submit" className="mt-5 mb-3 primary-button">
                Entrar
              </button>
              <MailSendedModal isOpen={confirmModalOpen} onClose={closeConfirmModal} isLoading={isLoading} error={error} />
              <Link to="/" className="secondary-button">
                Volver
              </Link>
            </div>
          </form>
        </section>

        <section
          className={`absolute w-full h-[40rem] lg:h-[70vh] lg:w-1/2 ${
            forgotPassword ? "translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-x-full lg:translate-y-0"
          } flex-1 bg-gradient-to-t from-dark-blue to-clear-blue flex justify-center items-center ${
            forgotPassword ? "rounded-t-2xl lg:rounded-l-3xl lg:rounded-tr-none" : "rounded-b-2xl lg:rounded-r-3xl lg:rounded-bl-none"
          }  transition-all duration-500`}
        >
          <div className="size-3/5 rounded-3xl bg-gradient-to-b from-white/40 to-white/10 border border-white flex items-center justify-center">
            <img src={Logo} alt="Logo Jiménez y Hormigo Asesores" className="w-2/4 drop-shadow-[5px_9px_4px_rgba(0,0,0,0.3)]" />
          </div>
        </section>
      </article>
    </main>
  );
};
