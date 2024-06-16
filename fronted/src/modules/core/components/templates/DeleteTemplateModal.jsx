import PropTypes from "prop-types";
import { Modal } from "../utils/Modal";
import TemplateService from "../../../../services/TemplateService";

export const DeleteTemplateModal = ({ template, isOpen, onClose }) => {
  const removeTemplate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await TemplateService.deleteTemplate(id, token);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar plantilla</p>
        <p className="text-lg font-semibold">{template.name}</p>

        <button onClick={() => removeTemplate(template.id)} className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white">
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

DeleteTemplateModal.propTypes = {
  template: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
