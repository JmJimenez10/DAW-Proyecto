import PropTypes from "prop-types";
import TemplateSectionService from "../../../../services/TemplateSectionService";
import { Modal } from "../utils/Modal";

export const DeleteTemplateSectionModal = ({ templateSection, isOpen, onClose }) => {
  const removeTemplateSection = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await TemplateSectionService.deleteTemplateSection(id, token);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar sección</p>
        <p className="text-lg font-semibold">{templateSection.name}</p>

        <button onClick={() => removeTemplateSection(templateSection.id)} className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white">
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

DeleteTemplateSectionModal.propTypes = {
  templateSection: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
