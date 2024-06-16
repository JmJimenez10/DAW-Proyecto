import PropTypes from "prop-types";
import DocumentSectionsService from "../../../../../services/DocumentSectionService";
import { Modal } from "../../utils/Modal";

export const DeleteDocumentSectionModal = ({ documentSection, isOpen, onClose }) => {
  const removeDocumentSection = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await DocumentSectionsService.deleteDocumentSection(id, token);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar sección</p>
        <p className="italic text-red-600 font-normal">¡Se eliminarán los documentos!</p>
        <p className="text-lg font-semibold text-black">{documentSection.name}</p>

        <button onClick={() => removeDocumentSection(documentSection.id)} className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white">
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

DeleteDocumentSectionModal.propTypes = {
  documentSection: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
