import { useState } from "react";
import DocumentSectionsService from "../../../../../services/DocumentSectionService";

export const AddDocumentSection = () => {
  const [name, setName] = useState("");

  const [errors, setErrors] = useState({
    name: "",
  });

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Nombre es obligatorio";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const saveSection = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const documentSection = { name };

      try {
        const token = localStorage.getItem("token");
        await DocumentSectionsService.createDocumentSection(documentSection, token);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-5 pt-0 flex flex-col justify-center items-center w-full h-full gap-10">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Añadir Sección</p>
      </div>

      <form action="" className="flex flex-col items-end">
        <div className="mb-2">
          <label htmlFor="name" className="text-lg italic font-semibold">
            * Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.name ? "outline-red-700" : ""}`}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
          {errors.name && <div className="text-center text-red-700">{errors.name}</div>}
        </div>

        <button onClick={saveSection} className="mt-10 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
          Guardar
        </button>
      </form>
    </div>
  );
};
