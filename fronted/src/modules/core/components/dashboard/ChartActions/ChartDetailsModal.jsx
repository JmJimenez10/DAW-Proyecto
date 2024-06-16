import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import IconUpdate from "../../../../../assets/icons/pencil-plus.svg";
import IconTrash from "../../../../../assets/icons/trash-white.svg";
import FinancialDataService from "../../../../../services/FinancialDataService";
import UserService from "../../../../../services/UserService";
import { Modal } from "../../utils/Modal";
import { ChartDataDeleteModal } from "./ChartDataDeleteModal";
import { ChartDataEditModal } from "./ChartDataEditModal";

export const ChartDetailsModal = ({ isOpen, onClose }) => {
  const [financialData, setFinancialData] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [modalStates, setModalStates] = useState({});
  const [percentageChanges, setPercentageChanges] = useState([]);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = localStorage.getItem("selectedCompanyId");
        const token = localStorage.getItem("token");
        const response = await FinancialDataService.getFinancialDataByCompanyId(companyId, token);

        // Ordenar los datos por trimestre de forma descendente
        response.sort((a, b) => {
          if (a.quarter < b.quarter) return 1;
          if (a.quarter > b.quarter) return -1;
          return 0;
        });

        // Calcular los porcentajes de cambio
        const changes = [];
        for (let i = 1; i < response.length; i++) {
          const percentageChange = ((response[i - 1].sales - response[i].sales) / response[i].sales) * 100;
          changes.push(percentageChange);
        }
        setPercentageChanges(changes);

        setFinancialData(response);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const toggleDeleteModal = (dataId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [dataId]: {
        ...prevState[dataId],
        openDelete: !prevState[dataId]?.openDelete,
      },
    }));
  };

  const toggleEditModal = (data) => {
    setModalStates((prevState) => ({
      ...prevState,
      [data.id]: {
        ...prevState[data.id],
        openEdit: !prevState[data.id]?.openEdit,
      },
    }));
  };

  // Función para obtener el año de un trimestre en formato YYYY
  const getYear = (quarter) => {
    const parts = quarter.split("-");
    return parts[0];
  };

  // Función para obtener el mes a partir de un trimestre
  const getMonth = (quarter) => {
    const parts = quarter.split("-");
    const month = parseInt(parts[1], 10);
    return monthNames[month - 1];
  };

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Datos Financieros</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">€ Ventas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Respecto anterior</th>
              {profileInfo.role === "ADMIN" && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {financialData.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{getYear(data.quarter)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getMonth(data.quarter)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap`}>{data.sales}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${percentageChanges[index] >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {percentageChanges[index] ? `${percentageChanges[index].toFixed(2)}%` : "-"}
                  </td>
                  {profileInfo.role === "ADMIN" && (
                    <td>
                      <div className="flex justify-center items-center gap-3">
                        <button onClick={() => toggleDeleteModal(data.id)}>
                          <img src={IconTrash} alt="icono papelera" title="Eliminar" className="p-2 bg-red-500 rounded-md hover:bg-red-600" />
                        </button>
                        <button onClick={() => toggleEditModal(data)}>
                          <img src={IconUpdate} alt="icono papelera" title="Añadir" className="p-2 rounded-md bg-clear-blue hover:bg-dark-blue/90" />
                        </button>
                      </div>
                      <ChartDataDeleteModal data={data} isOpen={modalStates[data.id]?.openDelete} onClose={() => toggleDeleteModal(data.id)} />
                      <ChartDataEditModal data={data} isOpen={modalStates[data.id]?.openEdit} onClose={() => toggleEditModal(data)} />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

ChartDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
