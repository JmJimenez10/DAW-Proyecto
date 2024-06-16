import PropTypes from 'prop-types';
import { Modal } from "../../utils/Modal";

export const RemoveFromCompanyModal = ({ isOpen, onClose, onConfirm = false, userName, companyName }) => {
    if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
        <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar usuario de empresa</p>
        <p className="text-lg">
          Eliminar <span className="font-bold">{userName}</span> de <span className="font-bold">{companyName}</span>
        </p>

        <button
           onClick={onConfirm}
          className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white"
        >
          Confirmar
        </button>
      </div>
    </Modal>
  )
}


RemoveFromCompanyModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    userName: PropTypes.string,
    companyName: PropTypes.string,
  };
