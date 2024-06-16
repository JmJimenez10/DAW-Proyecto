import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FinancialDataService from "../../../../../services/FinancialDataService";
import { Modal } from "../../utils/Modal";

export const ChartDataAddModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1, // Sumamos 1 porque los meses en JavaScript empiezan desde 0
    sales: "0",
  });

  // Definir los años y los nombres de los meses
  const years = [2022, 2023, 2024, 2025];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
      const companyId = localStorage.getItem("selectedCompanyId"); // Obtener el ID de la empresa
      const quarter = `${formData.year}-${formData.month < 10 ? "0" : ""}${formData.month}-01`; // Construir el trimestre en el formato
      const data = {
        quarter,
        sales: parseFloat(formData.sales), // Convertir las ventas a tipo numérico
        company: {
          id: parseInt(companyId), // Convertir el ID de la empresa a tipo numérico
        },
      };
      await FinancialDataService.createFinancialData(data, token);
      navigate("/app");
    } catch (error) {
      console.error("Error creating financial data:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="p-4 px-20">
        <h2 className="text-lg font-bold mb-4">Agregar Dato Financiero</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Año
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="month" className="block text-sm font-medium text-gray-700">
              Mes
            </label>
            <select
              id="month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="w-full cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            >
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
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
              Agregar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ChartDataAddModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
