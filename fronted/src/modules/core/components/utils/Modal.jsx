import { useEffect } from "react";
import PropTypes from "prop-types";
import IconClose from "../../../../assets/icons/x.svg";

export const Modal = ({ closeOut, open, onClose, minSize, children, className }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closeOut && open) {
        const modalElement = document.querySelector(".modal-container");
        if (modalElement && !modalElement.contains(event.target)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOut, open, onClose]);

  if (!open) return null;

  const modalSizeClass = minSize ? "min-h-[50vh] min-w-[50vw]" : "";

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-black/20 transition-colors">
      <div className={`overflow-x-auto modal-container bg-white rounded-lg shadow p-6 scale-100 opacity-100 ${modalSizeClass} ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-10 p-1 rounded-lg text-gray-400 bg-white"
        >
          <img src={IconClose} alt="cerrar" className="hover:scale-125" />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeOut: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  minSize: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};
