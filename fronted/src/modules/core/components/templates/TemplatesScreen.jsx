import { useEffect, useState } from "react";
import IconDownload from "../../../../assets/icons/download.svg";
import IconEye from "../../../../assets/icons/eye.svg";
import IconMaximize from "../../../../assets/icons/maximize.svg";
import IconMinimize from "../../../../assets/icons/minimize.svg";
import IconTrash from "../../../../assets/icons/trash.svg";
import TemplateSectionService from "../../../../services/TemplateSectionService";
import TemplateService from "../../../../services/TemplateService";
import UserService from "../../../../services/UserService";
import { PDFViewer } from "../../utils/PDFViewer";
import { SHADOW_BOX } from "../utils/Constants";
import { Modal } from "../utils/Modal";
import { AddTemplate } from "./AddTemplate";
import { DeleteTemplateModal } from "./DeleteTemplateModal";
import { DeleteTemplateSectionModal } from "./DeleteTemplateSectionModal";

export const TemplatesScreen = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [sizeView, setSizeView] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [modalStates, setModalStates] = useState({});
  const [templateSections, setTemplateSections] = useState([]);
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
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await TemplateService.listTemplates(token);
        const templatesWithUrls = await Promise.all(
          response.map(async (template) => {
            let fileUrl = null;
            try {
              const urlResponse = await TemplateService.getTemplate(template.id, token);
              if (urlResponse) {
                fileUrl = URL.createObjectURL(urlResponse);
              } else {
                console.error("Error fetching URL for template", template.id);
              }
            } catch (error) {
              console.error("Error fetching URL for template", template.id, error);
            }
            return {
              ...template,
              fileUrl: fileUrl,
            };
          })
        );
        setTemplates(templatesWithUrls);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
    getTemplateSections();
  }, []);

  const handleViewDocument = (url) => {
    setSelectedUrl(url);
  };

  const handleDownload = (documentUrl, documentName) => {
    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = documentUrl; // Ruta de descarga del archivo
    link.download = documentName; // Nombre del archivo al descargar
    link.click(); // Simular un clic en el enlace para iniciar la descarga
  };

  const handleSizeView = () => {
    setSizeView(!sizeView);
  };

  const toggleDeleteModal = (templateId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [templateId]: {
        ...prevState[templateId],
        openDelete: !prevState[templateId]?.openDelete,
      },
    }));
  };

  const toggleDeleteSectionModal = (sectionId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [sectionId]: {
        ...prevState[sectionId],
        openDeleteSection: !prevState[sectionId]?.openDeleteSection,
      },
    }));
  };

  const getFileNameWithoutExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      return fileName.substring(0, lastDotIndex);
    }
    return fileName;
  };

  return (
    <div className={`bg-gray-50 rounded-xl h-full p-10 lg:h-less-menu lg:grid grid-cols-2 gap-3 ${SHADOW_BOX}`}>
      {sizeView && (
        <div className="col-span-1 overflow-y-auto max-h-[700px]">
          {profileInfo.role === "ADMIN" && (
            <div className="flex items-center justify-center">
              <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700" onClick={() => setOpenAdd(true)}>
                Añadir Plantilla
              </button>

              <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
                <AddTemplate />
              </Modal>
            </div>
          )}

          {templateSections.map((section) => (
            <div key={section.id} className="mt-4">
              <div className="text-blue-800 border-b font-semibold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
                <p>{section.name}</p>
                {profileInfo.role === "ADMIN" && (
                  <>
                    <button className="rounded-full p-2 hover:scale-110" onClick={() => toggleDeleteSectionModal(section.id)}>
                      <img src={IconTrash} alt="icono eliminar" className="" />
                    </button>
                    <DeleteTemplateSectionModal
                      templateSection={section}
                      isOpen={modalStates[section.id]?.openDeleteSection}
                      onClose={() => toggleDeleteSectionModal(section.id)}
                    />
                  </>
                )}
              </div>
              {templates
                .filter((template) => template.sectionId === section.id)
                .map((template, idx) => (
                  <div key={idx} className="py-2 px-5 border-b flex flex-col justify-between items-center">
                    <div className="truncate">
                      <p className="ml-2 truncate">{getFileNameWithoutExtension(template.name)}</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <button onClick={() => handleDownload(template.fileUrl, template.name)} className="rounded-full p-2 hover:scale-110">
                        <img src={IconDownload} alt="icono descargar" className="" />
                      </button>
                      <button className="hover:scale-110" onClick={() => handleViewDocument(template.fileUrl)}>
                        <img src={IconEye} alt="ver documento" />
                      </button>
                      {profileInfo.role === "ADMIN" && (
                        <>
                          <button className="rounded-full p-2 hover:scale-110" onClick={() => toggleDeleteModal(template.id)}>
                            <img src={IconTrash} alt="icono eliminar" className="" />
                          </button>
                          <DeleteTemplateModal template={template} isOpen={modalStates[template.id]?.openDelete} onClose={() => toggleDeleteModal(template.id)} />
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      <div className={`max-h-[800px] text-justify lg:h-full mt-5 lg:mt-0 overflow-y-auto ${sizeView ? "col-span-1" : "col-span-2"} border border-gray-400 z-0`}>
        {selectedUrl && (
          <div className="flex justify-center items-center">
            <button className="p-3 hover:scale-110" onClick={handleSizeView}>
              {sizeView ? <img src={IconMaximize} alt="icono maximizar" title="maximizar" /> : <img src={IconMinimize} alt="icono minimizar" title="minimizar" />}
            </button>
          </div>
        )}

        {selectedUrl ? (
          <div className="max-h-[600px]">
            <PDFViewer fileUrl={selectedUrl} />
          </div>
        ) : (
          <div className="text-gray-400 flex items-center justify-center h-full">Selecciona un documento para verlo aquí</div>
        )}
      </div>
    </div>
  );
};
