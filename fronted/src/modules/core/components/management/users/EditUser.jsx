import { useState } from "react";
import UserService from "../../../../../services/UserService";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const EditUser = ({ user }) => {
  const [dni, setDni] = useState(user.dni);
  const [name, setName] = useState(user.name);
  const [surnames, setSurnames] = useState(user.surnames);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const creationDate = user.creationDate;
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const saveUserChanges = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedUser = {
        dni,
        name,
        surnames,
        email,
        role,
        creationDate,
      };

      const token = localStorage.getItem("token");
      UserService.updateUser(user.id, updatedUser, token)
        .then(() => {
          navigate("/app/management");
        })
        .catch((error) => {
          console.error("Error al actualizar usuario:", error);
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

    setErrors(errorsCopy);

    return valid;
  };

  return (
    <div className="p-5 pt-0 flex flex-col justify-center items-center min-w-[500px] gap-10">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">Editar Usuario</div>

      <form action="" className="flex flex-col items-end">
        <div className="form-group mb-2">
          <label htmlFor={`dniUpdate${user.id}`} className="text-lg italic font-semibold">
            DNI:
          </label>
          <input
            type="text"
            id={`dniUpdate${user.id}`}
            name="dni"
            value={dni}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.dni ? "outline-red-700" : ""}`}
            onChange={(e) => setDni(e.target.value.toUpperCase())}
            maxLength={9}
            autoComplete="off"
          />
          {errors.dni && <div className="text-center text-red-700">{errors.dni}</div>}
        </div>

        <div className="form-group mb-2">
          <label htmlFor={`nameUpdate${user.id}`} className="text-lg italic font-semibold">
            * Nombre:
          </label>
          <input
            type="text"
            id={`nameUpdate${user.id}`}
            name="name"
            value={name}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.name ? "outline-red-700" : ""}`}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          {errors.name && <div className="text-center text-red-700">{errors.name}</div>}
        </div>

        <div className="form-group mb-2">
          <label htmlFor={`surnamesUpdate${user.id}`} className="text-lg italic font-semibold">
            Apellidos:
          </label>
          <input
            type="text"
            id={`surnamesUpdate${user.id}`}
            name="surnames"
            value={surnames}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.surnames ? "outline-red-700" : ""}`}
            onChange={(e) => setSurnames(e.target.value)}
            autoComplete="off"
          />
          {errors.surnames && <div className="text-center text-red-700">{errors.surnames}</div>}
        </div>

        <div className="form-group mb-2">
          <label htmlFor={`emailUpdate${user.id}`} className="text-lg italic font-semibold">
            * Email:
          </label>
          <input
            type="email"
            id={`emailUpdate${user.id}`}
            name="email"
            value={email}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.email ? "outline-red-700" : ""}`}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          {errors.email && <div className="text-center text-red-700">{errors.email}</div>}
        </div>

        <div className="form-group mb-2">
          <label htmlFor={`rolUpdate${user.id}`} className="text-lg italic font-semibold">
            Rol:
          </label>
          <select
            name="rol"
            id={`rolUpdate${user.id}`}
            className="w-[300px] font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 ml-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">Usuario</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button onClick={saveUserChanges} className="mt-10 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
          Guardar
        </button>
      </form>
    </div>
  );
};

EditUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    dni: PropTypes.string,
    name: PropTypes.string,
    surnames: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
    creationDate: PropTypes.string,
  }),
};
