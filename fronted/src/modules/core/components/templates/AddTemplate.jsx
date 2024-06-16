import { useEffect, useState } from "react";
import IconCloudUpload from "../../../../assets/icons/cloud-upload.svg";
import TemplateSectionService from "../../../../services/TemplateSectionService";
import TemplateService from "../../../../services/TemplateService";
import { Modal } from "../utils/Modal";
import { AddTemplateSection } from "./AddTemplateSection";

export const AddTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [invalidFileType, setInvalidFileType] = useState(false);
  const [templateSections, setTemplateSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);

  const getTemplateSections = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await TemplateSectionService.listTemplateSections(token)
      setTemplateSections(response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTemplateSections();
  }, []);
  
  useEffect(() => {
    if (templateSections.length > 0) {
      setSelectedSectionId(templateSections[0].id);
    }
  }, [templateSections]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];

    if (file && file.type !== "application/pdf") {
      setInvalidFileType(true);
      return;
    }

    setSelectedTemplate(file);
    setInvalidFileType(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {
      setInvalidFileType(true);
      return;
    }

    setSelectedTemplate(file);
    setInvalidFileType(false);
  };

  const handleFileDelete = () => {
    setSelectedTemplate(null);
  };

  const handleTemplateUpload = async () => {
    if (!selectedTemplate || !selectedSectionId) return;

    try {
      const token = localStorage.getItem("token");
      await TemplateService.uploadTemplate(selectedTemplate, selectedSectionId, token);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 pt-0 flex flex-col justify-center items-center w-full h-full gap-10">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Añadir Plantilla</p>
      </div>

      <div className="flex justify-center items-center gap-20">
        <div>
          <h3 className="w-full text-lg font-semibold text-dark-blue mb-5 text-center">
            Seleccionar Sección
          </h3>

          <select
            value={selectedSectionId}
            onChange={(e) => setSelectedSectionId(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            {templateSections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setOpenAdd(true)}
            className="w-full mt-2 px-4 py-2 rounded-md bg-clear-blue text-white hover:bg-dark-blue/90"
          >
            Añadir sección
          </button>
          <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
            <AddTemplateSection />
          </Modal>
        </div>

        <div>
          {invalidFileType && (
            <p className="text-red-600">
              ¡Tipo de archivo no válido! Solo se permiten archivos PDF.
            </p>
          )}

          {selectedTemplate ? (
            <div className="flex items-center justify-between w-[500px] bg-gray-100 rounded-lg border border-gray-300 px-3 py-2">
              <p className="text-gray-800">{selectedTemplate.name}</p>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={handleFileDelete}
              >
                Eliminar
              </button>
            </div>
          ) : (
            <label htmlFor="template" className="cursor-pointer">
              <div
                className={`flex flex-col items-center justify-center rounded-lg size-[500px] border-2 border-dashed border-clear-blue/70 bg-gray-100 p-4 hover:bg-clear-blue/20 transition ${
                  dragging ? "bg-clear-blue/20" : ""
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  id="template"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <img src={IconCloudUpload} alt="" className="w-[100px] mb-5" />
                <p className="text-clear-blue font-bold mt-2">
                  Click para subir
                </p>
                <p className="text-clear-blue mt-2">o</p>
                <p className="text-clear-blue font-bold mt-2">
                  Arrastra y suelta el archivo aquí
                </p>
              </div>
            </label>
          )}
        </div>
      </div>

      {selectedTemplate && (
        <button
          onClick={handleTemplateUpload}
          className="mt-10 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
        >
          Guardar
        </button>
      )}
    </div>
  );
};
