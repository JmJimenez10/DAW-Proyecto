import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FinancialDataService from "../../../../../services/FinancialDataService";
import { Modal } from "../../utils/Modal";

export const ChartDataEditModal = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedData = { ...formData };
      delete updatedData.id;
      await FinancialDataService.updateFinancialData(data.id, updatedData, token);
      navigate("/app");
    } catch (error) {
      console.error("Error updating financial data:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="p-4 px-20">
        <h2 className="text-lg font-bold mb-4">Editar Dato Financiero</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sales" className="block text-sm font-medium text-gray-700">
              Ventas
            </label>
            <input
              type="number"
              id="sales"
              name="sales"
              value={formData.sales}
              onChange={handleInputChange}
              className="w-full cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="py-2 px-5 rounded-md bg-clear-blue hover:bg-dark-blue/90 text-white">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ChartDataEditModal.propTypes = {
  data: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
