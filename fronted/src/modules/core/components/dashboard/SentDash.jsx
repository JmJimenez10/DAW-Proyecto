import IconDownload from "../../../../assets/icons/download.svg";
import IconPdf from "../../../../assets/pdf.png";
import DocumentsService from "../../../../services/DocumentService";
import { useEffect, useState } from "react";
import UserService from "../../../../services/UserService";

export const SentDash = () => {
  const [sentDocuments, setSentDocuments] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const fetchDocuments = async (companyId, createdBy) => {
      try {
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

        // Ordenar documentos por creationDate de manera descendente
        documentsWithUrls.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

        // Seleccionar solo los 3 últimos documentos
        const lastThreeDocuments = documentsWithUrls.slice(0, 3);

        setSentDocuments(lastThreeDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (profileInfo.role === "USER") {
      fetchDocuments(localStorage.getItem("selectedCompanyId"), "user");
    } else if (profileInfo.role === "ADMIN") {
      fetchDocuments(localStorage.getItem("selectedCompanyId"), "admin");
    }
  }, [profileInfo, token]);

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

  const handleDownload = (documentName) => {
    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = `../../../../${documentName}`; // Ruta de descarga del archivo
    link.download = documentName; // Nombre del archivo al descargar
    link.click(); // Simular un clic en el enlace para iniciar la descarga
  };

  return (
    <section className="min-h-[400px] lg:min-h-0 h-full flex flex-col gap-5 col-span-full lg:col-span-3 lg:row-span-4 bg-gray-50 rounded-xl py-4 px-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="text-blue-800 border-b font-semibold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Últimos documentos enviados</p>
      </div>
  
      {sentDocuments.length === 0 ? (
        <p className="italic text-center text-gray-400 mt-20">No hay documentos</p>
      ) : (
        <div className="flex flex-col gap-2 py-2 px-3 h-[220px] overflow-y-auto">
          {sentDocuments.map((document) => (
            <div key={document.id} className="flex items-center justify-between">
              <div className="flex items-center flex-grow truncate">
                <img src={IconPdf} alt="icono añadir archivo" className="w-8" />
                <div className="ml-2 truncate">
                  <p className="truncate" title={getFileNameWithoutExtension(document.name)}>
                    {getFileNameWithoutExtension(document.name)}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button onClick={() => handleDownload(document.name)} className="rounded-full p-2 hover:scale-110">
                  <img className="min-w-6" src={IconDownload} alt="icono descargar" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );  
};
