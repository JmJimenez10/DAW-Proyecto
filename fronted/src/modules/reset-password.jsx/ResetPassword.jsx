import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";

export const ResetPassword = () => {
  const [message, setMessage] = useState("Procesando el cambio de contraseña...");
  const email = localStorage.getItem("emailUser");
  const dni = localStorage.getItem("dniUser");
  const password = localStorage.getItem("passwordUser");

  const resetPassword = async () => {
    try {
      if (email && dni && password) {
        await UserService.forgotPassword(email, dni, password);
        setMessage("Contraseña cambiada con éxito");
      } else {
        setMessage("Información insuficiente para cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setMessage("Lo sentimos, hubo un error al cambiar la contraseña");
    } finally {
      localStorage.removeItem("uuid");
      localStorage.removeItem("emailUser");
      localStorage.removeItem("dniUser");
      localStorage.removeItem("passwordUser");
      localStorage.removeItem("timestamp");
    }
  };

  useEffect(() => {
    resetPassword();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-blue to-clear-blue p-3 xl:px-0 flex items-center justify-center">
      <article className="w-full xl:w-1/4 lg:h-[70vh] bg-white rounded-3xl flex flex-col relative justify-center items-center">
        <h2 className="px-10 text-2xl md:text-3xl lg:text-4xl text-center mb-5 font-semibold ">{message}</h2>
        <Link to={"/app"} className="primary-button mt-5">
          Iniciar sesión
        </Link>
      </article>
    </main>
  );
};
