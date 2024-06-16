import { useEffect, useState } from "react";
import IconCloudUpload from "../../../../../assets/icons/cloud-upload.svg";
import DocumentsService from "../../../../../services/DocumentService";
import { Modal } from "../../utils/Modal";
import { AddDocumentSection } from "./AddDocumentSection";
import UserService from "../../../../../services/UserService";
import DocumentSectionsService from "../../../../../services/DocumentSectionService";

export const AddDocument = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [invalidFileType, setInvalidFileType] = useState(false);
  const [documentSections, setDocumentSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
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

  const getDocumentSections = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await DocumentSectionsService.listDocumentSections(token);
      setDocumentSections(response);
      if (response.length > 0) {
        setSelectedSectionId(response[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDocumentSections();
  }, []);

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

    setSelectedDocument(file);
    setInvalidFileType(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== "application/pdf") {
      setInvalidFileType(true);
      return;
    }

    setSelectedDocument(file);
    setInvalidFileType(false);
  };

  const handleFileDelete = () => {
    setSelectedDocument(null);
  };

  const handleDocumentUpload = async () => {
    if (!selectedDocument || !selectedSectionId) return;

    try {
      const token = localStorage.getItem("token");
      if (profileInfo.role === "USER") {
        await DocumentsService.uploadDocument(selectedDocument, "user", localStorage.getItem("selectedCompanyId"), selectedSectionId, token);
      } else {
        await DocumentsService.uploadDocument(selectedDocument, "admin", localStorage.getItem("selectedCompanyId"), selectedSectionId, token);
      }

      window.location.reload();
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <div className="p-5 pt-0 flex flex-col justify-center items-center w-full h-full gap-10">
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Añadir Plantilla</p>
      </div>

      <div className="flex justify-center items-center gap-20">
        <div>
          <h3 className="w-full text-lg font-semibold text-dark-blue mb-5 text-center">Seleccionar Sección</h3>

          <select
            value={selectedSectionId}
            onChange={(e) => setSelectedSectionId(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            {documentSections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))}
          </select>
          {profileInfo.role === "ADMIN" && (
            <>
              <button onClick={() => setOpenAdd(true)} className="w-full mt-2 px-4 py-2 rounded-md bg-clear-blue text-white hover:bg-dark-blue/90">
                Añadir sección
              </button>
              <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
                <AddDocumentSection />
              </Modal>
            </>
          )}
        </div>

        <div>
          {invalidFileType && <p className="text-red-600">¡Tipo de archivo no válido! Solo se permiten archivos PDF.</p>}

          {selectedDocument ? (
            <div className="flex items-center justify-between w-[500px] bg-gray-100 rounded-lg border border-gray-300 px-3 py-2">
              <div className="truncate">
                <p className="text-gray-800 truncate" title={selectedDocument.name}>{selectedDocument.name}</p>
              </div>
              <button className="text-red-600 hover:text-red-800" onClick={handleFileDelete}>
                Eliminar
              </button>
            </div>
          ) : (
            <label htmlFor="document" className="cursor-pointer">
              <div
                className={`flex flex-col items-center justify-center rounded-lg size-[500px] border-2 border-dashed border-clear-blue/70 bg-gray-100 p-4 hover:bg-clear-blue/20 transition ${
                  dragging ? "bg-clear-blue/20" : ""
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input type="file" accept=".pdf" id="document" className="hidden" onChange={handleFileChange} />
                <img src={IconCloudUpload} alt="" className="w-[100px] mb-5" />
                <p className="text-clear-blue font-bold mt-2">Click para subir</p>
                <p className="text-clear-blue mt-2">o</p>
                <p className="text-clear-blue font-bold mt-2">Arrastra y suelta el archivo aquí</p>
              </div>
            </label>
          )}
        </div>
      </div>

      {selectedDocument && (
        <button onClick={handleDocumentUpload} className="mt-10 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
          Guardar
        </button>
      )}
    </div>
  );
};
