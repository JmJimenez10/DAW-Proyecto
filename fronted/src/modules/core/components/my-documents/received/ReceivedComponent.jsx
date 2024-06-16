import { useEffect, useState } from "react";
import IconDownload from "../../../../../assets/icons/download.svg";
import IconEye from "../../../../../assets/icons/eye.svg";
import IconDown from "../../../../../assets/icons/chevron-down.svg";
import IconUp from "../../../../../assets/icons/chevron-up.svg";
import IconTrash from "../../../../../assets/icons/trash.svg";
import { PDFViewer } from "../../../utils/PDFViewer";
import UserService from "../../../../../services/UserService";
import { Loading } from "../../utils/Loading";
import DocumentSectionsService from "../../../../../services/DocumentSectionService";
import DocumentsService from "../../../../../services/DocumentService";
import { DeleteDocumentSectionModal } from "../sent/DeleteDocumentSectionModal";
import { DeleteDocumentModal } from "../sent/DeleteDocumentModal";

export const ReceivedComponent = () => {
  const [sentDocuments, setSentDocuments] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [modalStates, setModalStates] = useState({});
  const [sentSections, setSentSections] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionShow, setSectionShow] = useState("");

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
      const response = await DocumentSectionsService.listDocumentSections(token)
      setSentSections(response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDocuments = async (companyId, createdBy) => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem("token");
        const response = await DocumentsService.listDocumentsByCompanyIdCreatedBy(companyId, createdBy, token);
        const documentsWithUrls = await Promise.all(
          response.map(async (document) => {
            let fileUrl = null;
            try {
              const urlResponse = await DocumentsService.getDocument(document.id, token);
              if (urlResponse) {
                fileUrl = URL.createObjectURL(urlResponse);
              } else {
                console.error("Error fetching URL for document", document.id, urlResponse.status);
              }
            } catch (error) {
              console.error("Error fetching URL for document", document.id, error);
            }
            return {
              ...document,
              fileUrl: fileUrl,
            };
          })
        );
        setSentDocuments(documentsWithUrls);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setIsLoading(false)
      }
    };

    if (profileInfo.role === "ADMIN") {
      fetchDocuments(localStorage.getItem("selectedCompanyId"), "user");
    } else if (profileInfo.role === "USER") {
      fetchDocuments(localStorage.getItem("selectedCompanyId"), "admin");
    }
    getDocumentSections();
  }, [profileInfo]);

  const getFileNameWithoutExtension = (fileName) => {
    // Buscar la última aparición del punto (.) en el nombre del archivo
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      // Si se encuentra un punto, devolver la parte del nombre antes del punto
      return fileName.substring(0, lastDotIndex);
    }
    // Si no se encuentra un punto, devolver el nombre completo sin cambios
    return fileName;
  };

  const handleViewDocument = (url) => {
    setSelectedUrl(url);
    setIsPreviewOpen(true);
  };

  const toggleDeleteModal = (documentId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [documentId]: {
        ...prevState[documentId],
        openDelete: !prevState[documentId]?.openDelete,
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

  const handleDownload = (documentUrl, documentName) => {
    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = documentUrl; // Ruta de descarga del archivo
    link.download = documentName; // Nombre del archivo al descargar
    link.click(); // Simular un clic en el enlace para iniciar la descarga
  };

  const handleShowSection = (event) => {
    setSectionShow(event.target.value);
  };

  const filteredDocuments = sentDocuments.filter((document) => {
    const searchTermMatch = document.name.toLowerCase().includes(searchTerm.toLowerCase());
    const sectionMatch = sectionShow ? document.sectionId == sectionShow : true;
    return searchTermMatch && sectionMatch;
  });

  return isLoading ? (
    <Loading />
  ) : (
    <div className="grid grid-rows-12 h-full relative">
      <div className="row-span-2 w-full pt-10 lg:pt-0 flex flex-col lg:flex-row items-center justify-center gap-3">
        <input
          type="text"
          placeholder="Buscar documento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-gray-50 border-gray-300 focus:outline-none focus:border-blue-500"
        />

        <select
          id="order"
          value={sectionShow}
          onChange={handleShowSection}
          className="cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        >
          <option value="">Todas las secciones</option>
          {sentSections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row-span-9 lg:grid grid-cols-3 gap-10 px-10 max-h-[500px] overflow-y-auto">
        {sentSections.map((section) => (
          <div key={section.id} className="mt-4">
            <div className="text-blue-800 border-b font-semibold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
              <p>{section.name}</p>
              {profileInfo.role === "ADMIN" && (
                <>
                  <button className="rounded-full p-2 hover:scale-110" onClick={() => toggleDeleteSectionModal(section.id)}>
                    <img src={IconTrash} alt="icono eliminar" className="" />
                  </button>
                  <DeleteDocumentSectionModal documentSection={section} isOpen={modalStates[section.id]?.openDeleteSection} onClose={() => toggleDeleteSectionModal(section.id)} />
                </>
              )}
            </div>
            {filteredDocuments
              .filter((document) => document.sectionId === section.id)
              .map((document, idx) => (
                <div key={idx} className="py-2 px-5 border-b flex flex-col justify-between items-center">
                  <div className="ml-2 w-full overflow-hidden">
                    {searchTerm ? (
                      <div className="truncate">
                        {getFileNameWithoutExtension(document.name)
                          .split(new RegExp(`(${searchTerm})`, "gi"))
                          .map((part, index) =>
                            part.toLowerCase() === searchTerm.toLowerCase() ? (
                              <span key={index} className="bg-yellow-200">
                                {part}
                              </span>
                            ) : (
                              <span key={index} className="truncate">
                                {part}
                              </span>
                            )
                          )}
                      </div>
                    ) : (
                      <div className="truncate">
                        <span title={document.name} className="truncate">
                        {getFileNameWithoutExtension(document.name)}
                      </span>
                      </div>
                      
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleDownload(document.fileUrl, document.name)} className="rounded-full p-2 hover:scale-110">
                      <img src={IconDownload} alt="icono descargar" className="" />
                    </button>
                    <button className="hover:scale-110" onClick={() => handleViewDocument(document.fileUrl)}>
                      <img src={IconEye} alt="ver documento" />
                    </button>
                    {profileInfo.role === "ADMIN" && (
                      <>
                        <button className="rounded-full p-2 hover:scale-110" onClick={() => toggleDeleteModal(document.id)}>
                          <img src={IconTrash} alt="icono eliminar" className="" />
                        </button>
                        <DeleteDocumentModal document={document} isOpen={modalStates[document.id]?.openDelete} onClose={() => toggleDeleteModal(document.id)} />
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="row-span-1 flex justify-center items-center border-t">
        <button className="p-3 hover:scale-110" onClick={() => setIsPreviewOpen(true)}>
          <img src={IconUp} alt="icono minimizar" title="Abrir" />
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gray-50 rounded-xl transition-transform duration-300 transform ${
          isPreviewOpen ? "translate-y-0 block" : "translate-y-full hidden"
        } z-50 h-full`}
      >
        <div className="flex justify-center items-center h-[10%]">
          <button className="p-3 hover:scale-110" onClick={() => setIsPreviewOpen(false)}>
            <img src={IconDown} alt="icono minimizar" title="Cerrar" />
          </button>
        </div>
        {selectedUrl ? (
          <div className="w-full h-[calc(100%-10%)] overflow-y-auto p-4 pt-0">
            <PDFViewer pageFit fileUrl={selectedUrl} className="w-full h-full" />
          </div>
        ) : (
          <div className="text-gray-400 flex items-center justify-center h-[calc(100%-10%)] p-4">Selecciona un documento para verlo aquí</div>
        )}
      </div>
    </div>
  );
};
