import { useState } from "react";
import UserService from "../../../../../services/UserService";
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
  const [dni, setDni] = useState("");
  const [name, setName] = useState("");
  const [surnames, setSurnames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRol] = useState("USER");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    general: "",
  });

  const saveUser = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const user = { dni, name, surnames, email, password, role };

      const token = localStorage.getItem("token");
      UserService.register(user, token)
        .then((response) => {
          const { statusCode, message } = response;

          if (statusCode === 200) {
            navigate("/app/management");
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              general: message,
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "Error al registrar el usuario",
          }));
        });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Nombre es obligatorio";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email es obligatorio";
      valid = false;
    }

    if (password.trim()) {
      errorsCopy.password = "";
    } else {
      errorsCopy.password = "Contraseña es obligatoria";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  return (
    <div className="p-5 pt-0 flex flex-col justify-center items-center w-full h-full gap-10">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Añadir Usuario</p>
      </div>

      <form action="" className="flex flex-col items-end">
        <div className="mb-2">
          <label htmlFor="dni" className="text-lg italic font-semibold">
            * DNI:
          </label>
          <input
            type="text"
            name="dni"
            value={dni}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.dni ? "outline-red-700" : ""}`}
            onChange={(e) => setDni(e.target.value.toUpperCase())}
            maxLength={9}
            autoComplete="off"
          />
          {errors.dni && <div className="text-center text-red-700">{errors.dni}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor="name" className="text-lg italic font-semibold">
            * Nombre:
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.name ? "outline-red-700" : ""}`}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          {errors.name && <div className="text-center text-red-700">{errors.name}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor="surnames" className="text-lg italic font-semibold">
            Apellidos:
          </label>
          <input
            type="text"
            name="surnames"
            value={surnames}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.surnames ? "outline-red-700" : ""}`}
            onChange={(e) => setSurnames(e.target.value)}
            autoComplete="off"
          />
          {errors.surnames && <div className="text-center text-red-700">{errors.surnames}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="text-lg italic font-semibold">
            * Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.email ? "outline-red-700" : ""}`}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          {errors.email && <div className="text-center text-red-700">{errors.email}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="text-lg italic font-semibold">
            * Contraseña:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.password ? "outline-red-700" : ""}`}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          {errors.password && <div className="text-center text-red-700">{errors.password}</div>}
        </div>

        <div className="mb-2">
          <label htmlFor="role" className="text-lg italic font-semibold">
            Rol:
          </label>
          <select
            name="role"
            id="role"
            className="w-[300px] font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 ml-2"
            value={role}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="USER">Usuario</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {errors.general && <div className="text-center w-full mt-3 text-red-700">{errors.general}</div>}

        <button onClick={saveUser} className="mt-10 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
          Guardar
        </button>
      </form>
    </div>
  );
};
