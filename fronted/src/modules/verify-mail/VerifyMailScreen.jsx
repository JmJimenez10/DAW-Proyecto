import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

export const VerifyMailScreen = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.verifyEmailUser(dni, password);
      if (response.statusCode === 200) {
        console.log("Email verificado:", response);

        setVerifying(true); // Establece el estado de verificación a true
        setError(null);
        // Redirige después de 4 segundos
        setTimeout(() => {
          navigate("/app/dashboard");
        }, 4000);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
      setError("Error al verificar");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-blue to-clear-blue flex items-center justify-center">
      <article className="w-full lg:w-3/5 h-[70vh] bg-white rounded-3xl flex flex-col justify-center items-center">
        <section>
          <h3 className="text-2xl font-semibold italic text-center">Verificación de EMAIL</h3>
          <h1 className="text-4xl font-bold text-clear-blue text-center">Jiménez y Hormigo Asesores</h1>
        </section>

        <section className="mt-10">
          <p className="text-lg font-semibold text-center">Por favor, rellene los campos</p>
        </section>

        <section className="flex justify-center items-center flex-col">
          <form onSubmit={handleSubmit}>
            <div className="w-72 my-7">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  id="dni"
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.toUpperCase())}
                  maxLength={9}
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-semibold outline outline-0 focus:outline-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-lg px-3 py-6 rounded-[7px] border-clear-gray focus:border-clear-blue"
                  placeholder=" "
                />
                <label
                  htmlFor="dni"
                  className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-lg text-[11px] text-gray-500 peer-focus:text-clear-blue before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-placeholder-shown:leading-[3.75] before:border-blue-gray-200 peer-focus:before:!border-clear-blue"
                >
                  DNI
                </label>
              </div>
            </div>

            <div className="w-72 my-7">
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
                  Contraseña
                </label>
              </div>
            </div>

            {verifying && (
              <>
                <p className="text-lg font-semibold text-green-700 text-center">Email Verificado</p>
                <p className="text-base font-semibold text-dark-blue text-center">Redirigiendo...</p>
              </>
            )}
            {error && <p className="text-red-700 mb-5 text-center">{error}</p>}
            <div className="flex justify-center mt-9">
              <button type="submit" className="mt-5 mb-3 primary-button">
                Verificar
              </button>
            </div>
          </form>
          <Link to="/" className="secondary-button">
            Salir
          </Link>
        </section>
      </article>
    </main>
  );
};
