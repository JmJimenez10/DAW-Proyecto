import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import FinancialDataService from "../../../../../services/FinancialDataService";
import { Modal } from "../../utils/Modal";

export const ChartDataDeleteModal = ({ data, isOpen, onClose }) => {
  const navigate = useNavigate();

  const deleteData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await FinancialDataService.deleteFinancialData(id, token);
      navigate("/app");
    } catch (error) {
      console.error("Error deleting financial data:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar dato</p>

        <button onClick={() => deleteData(data.id)} className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white">
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

ChartDataDeleteModal.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
