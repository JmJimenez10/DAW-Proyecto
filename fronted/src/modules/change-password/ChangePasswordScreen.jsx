import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

export const ChangePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await UserService.changePasswordUser(profileInfo.email, password, token);
      navigate("/app/dashboard");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setError("Error al cambiar la contraseña");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br p-3 lg:p-0 from-dark-blue to-clear-blue flex items-center justify-center">
      <article className="w-full lg:w-3/5 h-[70vh] bg-white rounded-3xl flex flex-col justify-center items-center">
        <section>
          <h3 className="text-2xl font-semibold italic text-center">Bienvenid@ a la web de</h3>
          <h1 className="text-4xl font-bold text-clear-blue text-center">Jiménez y Hormigo Asesores</h1>
        </section>

        <section className="mt-10">
          <p className="text-lg font-semibold text-center">Para acceder establezca su contraseña</p>
          <p className="text-gray-600 text-center italic">Podrá cambiarla en cualquier momento</p>
        </section>

        <section className="flex justify-center items-center flex-col">
          <form onSubmit={handleSubmit}>
            <div className="w-72 my-7  mx-auto">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue"
                >
                  Nueva Contraseña
                </label>
              </div>
            </div>

            <div className="w-72 my-7 mx-auto">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label
                  htmlFor="repeatPassword"
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue"
                >
                  Repetir Contraseña
                </label>
              </div>
            </div>

            {error && <p className="text-red-700 mb-5 text-center">{error}</p>}

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
      </article>
    </main>
  );
};
