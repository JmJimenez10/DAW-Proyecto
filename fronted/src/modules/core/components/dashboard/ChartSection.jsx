import { useEffect, useState } from "react";
import IconDetails from "../../../../assets/icons/clipboard-text.svg";
import IconAdd from "../../../../assets/icons/pencil-plus.svg";
import UserService from "../../../../services/UserService";
import { MyChart } from "../utils/MyChart";
import { ChartDataAddModal } from "./ChartActions/ChartDataAddModal";
import { ChartDetailsModal } from "./ChartActions/ChartDetailsModal";

export const ChartSection = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

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

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const toggleDetailsModal = () => {
    setIsDetailsModalOpen(!isDetailsModalOpen);
  };

  return (
    <section className="col-span-full lg:col-start-4 lg:col-end-9 lg:row-start-2 lg:row-end-9 bg-gray-50 lg:h-full rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="h-[10%] flex gap-5 justify-center pt-5">
        {profileInfo.role === "ADMIN" && (
          <button onClick={toggleAddModal}>
            <img src={IconAdd} alt="icono papelera" title="Añadir" className="p-2 rounded-md bg-clear-blue hover:bg-dark-blue/90" />
          </button>
        )}
        <button onClick={toggleDetailsModal}>
          <img src={IconDetails} alt="icono detalles" title="Ver detalles" className="p-2 bg-orange-500 rounded-md hover:bg-orange-600" />
        </button>
      </div>

      <div className="h-[300px] lg:h-[90%]">
        <MyChart />
      </div>
      <ChartDetailsModal isOpen={isDetailsModalOpen} onClose={toggleDetailsModal} />
      <ChartDataAddModal isOpen={isAddModalOpen} onClose={toggleAddModal} />
    </section>
  );
};
