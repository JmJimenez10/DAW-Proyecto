import PropTypes from "prop-types";
import { Modal } from "../../utils/Modal";
import DocumentsService from "../../../../../services/DocumentService";

export const DeleteDocumentModal = ({ document, isOpen, onClose }) => {
  const removeDocument = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await DocumentsService.deleteDocument(id, token);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar documento</p>
        <p className="text-lg font-semibold">{document.name}</p>

        <button
          onClick={() => removeDocument(document.id)}
          className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

DeleteDocumentModal.propTypes = {
  document: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
