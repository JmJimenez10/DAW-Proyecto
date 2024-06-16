import { useState } from "react";
import IconCloudUpload from "../../../../../assets/icons/cloud-upload.svg";
import DefaultLogo from "../../../../../assets/photo.png";
import CompanyImagesService from "../../../../../services/CompanyImagesService";
import CompanyService from "../../../../../services/CompanyService";

export const AddCompany = () => {
  // Estado local para la empresa y los errores de validación
  const [company, setCompany] = useState({
    cif: "",
    name: "",
    image: null,
  });

  // Estado local para el indicador de arrastrar y soltar
  const [dragging, setDragging] = useState(false);

  // Maneja el cambio en los campos de entrada de texto (CIF y nombre)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el estado de la empresa
    setCompany((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Maneja el cambio de la imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Actualiza el estado de la empresa con la imagen seleccionada
    setCompany((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  // Elimina la imagen seleccionada
  const handleDeleteImage = () => {
    // Actualiza el estado de la empresa para eliminar la imagen
    setCompany((prevState) => ({
      ...prevState,
      image: null,
    }));
  };

  // Valida el formulario antes de enviarlo
  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (company.cif.trim()) {
      errorsCopy.cif = "";
    } else {
      errorsCopy.cif = "CIF es obligatorio";
      valid = false;
    }

    if (company.name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Nombre es obligatorio";
      valid = false;
    }

    // Actualiza el estado de los errores
    setErrors(errorsCopy);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviarlo
    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");
        const response = await CompanyService.createCompany(
          {
            cif: company.cif,
            name: company.name,
          },
          token
        );
        const companyId = response.id;

        // Determinar qué imagen usar, la seleccionada por el usuario o la por defecto
        let imageToUpload = null;
        if (company.image) {
          imageToUpload = company.image;
        } else {
          // Si no hay imagen seleccionada, usar la imagen por defecto
          imageToUpload = DefaultLogo;
        }

        // Subir la imagen de la empresa
        try {
          await CompanyImagesService.uploadCompanyImage(companyId, imageToUpload, token);
        } catch (error) {
          console.error(error)
        }

        // Recargar la página para reflejar los cambios
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Maneja el evento de arrastrar el archivo para subir la imagen
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // Maneja el evento de salir del área de arrastre
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  // Maneja el evento de soltar el archivo para subir la imagen
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    // Actualiza el estado de la empresa con la imagen seleccionada
    setCompany((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const [errors, setErrors] = useState({
    cif: "",
    name: "",
  });

  return (
    <div className="p-5 pt-0 flex flex-col justify-center items-center w-full h-full gap-10">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Añadir Empresa</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col justify-center items-end">
            <div className="mb-2">
              <label htmlFor="cif" className="text-lg italic font-semibold">
                * CIF:
              </label>
              <input
                type="text"
                name="cif"
                value={company.cif}
                className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.cif ? "outline-red-700" : ""}`}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.cif && <div className="text-center text-red-700">{errors.cif}</div>}
            </div>

            <div className="mb-2">
              <label htmlFor="name" className="text-lg italic font-semibold">
                * Nombre:
              </label>
              <input
                type="text"
                name="name"
                value={company.name}
                className={`w-[300px] p-1 border rounded-sm ml-2 focus:outline-clear-blue ${errors.name ? "outline-red-700" : ""}`}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.name && <div className="text-center text-red-700">{errors.name}</div>}
            </div>
          </div>

          <div>
            <label htmlFor="logo" className="text-lg flex justify-center w-[300px] mb-2 italic font-semibold">
              Logo:
            </label>
            {company.image && (
              <div className="flex flex-col items-center mt-4">
                <img src={URL.createObjectURL(company.image)} alt="Preview" className="max-w-[150px]" />
                <button type="button" className="mt-2 px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700" onClick={handleDeleteImage}>
                  Eliminar
                </button>
              </div>
            )}
            {!company.image && (
              <label htmlFor="logo" className="cursor-pointer">
                <div
                  className={`flex flex-col items-center justify-center rounded-lg size-[300px] border-2 border-dashed border-clear-blue/70 bg-gray-100 p-4 hover:bg-clear-blue/20 transition ${
                    dragging ? "bg-clear-blue/20" : ""
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={(e) => e.preventDefault()}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input type="file" accept="image/*" id="logo" onChange={handleImageChange} className="hidden" />
                  <img src={IconCloudUpload} alt="" className="w-[100px] mb-5" />
                  <p className="text-clear-blue font-bold mt-2">
                    Click <span className="font-semibold">para subir</span>
                  </p>
                  <p className="text-clear-blue mt-2">o</p>
                  <p className="text-clear-blue font-bold mt-2">
                    Arrastra y suelta <span className="font-semibold">la imagen aquí</span>
                  </p>
                </div>
              </label>
            )}
          </div>
        </div>

        <button type="submit" className="mt-10 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
          Guardar
        </button>
      </form>
    </div>
  );
};
