import PropTypes from 'prop-types';
import { Modal } from "../../utils/Modal";

export const AddToCompanyModal = ({ isOpen, onClose, onConfirm, userName, companyName }) => {
    if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
        <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-green-600 font-bold">Añadir usuario a empresa</p>
        <p className="text-lg">
          Añadir <span className="font-bold">{userName}</span> a <span className="font-bold">{companyName}</span>
        </p>

        <button
           onClick={onConfirm}
          className="py-2 px-3 bg-green-500 rounded-md hover:bg-green-600 text-white"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  );
};


AddToCompanyModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  userName: PropTypes.string,
  companyName: PropTypes.string,
};
