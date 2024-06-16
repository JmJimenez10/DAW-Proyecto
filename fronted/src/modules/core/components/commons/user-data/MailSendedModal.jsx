import PropTypes from "prop-types";
import { Modal } from "../../utils/Modal";

export const MailSendedModal = ({ isOpen, onClose, isLoading, error }) => {
  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="m-10">
        {isLoading ? (
          <>
            <div className="h-full w-full flex items-center justify-center">
              <div className="loader"></div>
            </div>
            <p className="text-lg mt-7 text-dark-blue">Enviando email...</p>
          </>
        ) : error ? (
          <p className="text-lg font-semibold text-red-700">{error}</p>
        ) : (
          <p className="text-lg font-semibold">Revise su correo electrónico</p>
        )}
      </div>
    </Modal>
  );
};

MailSendedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
