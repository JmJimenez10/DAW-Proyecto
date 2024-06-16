import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import IconAdd from "../../../../../assets/icons/plus.svg";
import CompanyImagesService from "../../../../../services/CompanyImagesService";
import CompanyService from "../../../../../services/CompanyService";
import CompanyUserService from "../../../../../services/CompanyUserService";
import { Modal } from "../../utils/Modal";
import { AddToCompanyModal } from "./AddToCompanyModal";
import { EditUser } from "./EditUser";
import { RemoveFromCompanyModal } from "./RemoveFromCompanyModal";

export const DetailsUserModal = ({ user, isOpen, onClose }) => {
  const [modalStates, setModalStates] = useState({});
  const [companiesByUser, setCompaniesByUser] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedAddCompany, setSelectedAddCompany] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [availableCompanies, setAvailableCompanies] = useState([]);

  const toggleEditModal = (userId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        openEdit: !prevState[userId]?.openEdit,
      },
    }));
  };

  const getCompaniesByUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyUserService.companiesByUserId(user.id, token);
      setCompaniesByUser(response);
      setSelectedCompany(response[0]);
    } catch (error) {
      console.error("Error fetching companies by user:", error);
    }
  };

  const getCompaniesWithImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyUserService.companiesByUserId(user.id, token); // Obtener la lista de empresas
      const companiesWithImages = await Promise.all(
        response.map(async (company) => {
          let imageUrl = null;
          try {
            const imageResponse = await CompanyImagesService.getCompanyImage(company.id, token);
            if (imageResponse) {
              imageUrl = URL.createObjectURL(imageResponse);
            } else {
              console.error("Error fetching image for company", company.id, imageResponse.status);
            }
          } catch (error) {
            console.error("Error: ", error);
          }
          return {
            ...company,
            imageUrl: imageUrl,
          };
        })
      );
      setCompaniesByUser(companiesWithImages);
    } catch (error) {
      console.error(error);
    }
  };

  const getListCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyService.listCompanies(token);
      setCompanies(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    getCompaniesByUserId();
    getListCompanies();
    getCompaniesWithImages();
  }, []);

  useEffect(() => {
    const filteredCompanies = companies.filter((company) => {
      return !companiesByUser.some((userCompany) => userCompany.id === company.id);
    });

    setAvailableCompanies(filteredCompanies);

    if (filteredCompanies.length > 0) {
      setSelectedAddCompany(filteredCompanies[0]);
    }
  }, [companies, companiesByUser]);

  const handleAddUserToCompany = async () => {
    try {
      const token = localStorage.getItem("token");
      await CompanyService.addUserToCompany(selectedAddCompany.id, user.id, token);
      window.location.reload();
    } catch (error) {
      console.error("Error al añadir usuario a la empresa:", error);
    }
  };

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => setConfirmModalOpen(false);

  const handleRemoveUserFromCompany = async () => {
    try {
      const token = localStorage.getItem("token");
      await CompanyUserService.deleteUserFromCompany(selectedCompany.id, user.id, token);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar usuario de la empresa:", error);
    }
  };

  const openRemoveModal = () => setRemoveModalOpen(true);
  const closeRemoveModal = () => setRemoveModalOpen(false);

  const canAddToCompany = companies.some((com) => {
    return !companiesByUser.some((userCompany) => userCompany.id === com.id);
  });

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="gap-10 flex justify-center items-center flex-col w-full h-full">
        <h3 className="pt-5 font-bold text-2xl">{user.name + " " + user.surnames}</h3>

        <div className="p-5 pt-0 flex justify-center items-center flex-col lg:flex-row w-full h-full gap-10">
          <div className="bg-gray-50 h-full rounded-lg border-2 border-dark-blue p-5">
            <div className="min-w-[500px] text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
              <p>Empresa</p>
            </div>
            {companies.length > 0 ? (
              <>
                <div className="flex flex-col">
                  {selectedCompany && (
                    <select
                      className="mt-3 col-span-1 w-full cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                      value={selectedCompany?.id}
                      onChange={(e) => setSelectedCompany(companiesByUser.find((com) => com.id === parseInt(e.target.value)))}
                    >
                      {companiesByUser.map((com) => (
                        <option key={com.id} value={com.id}>
                          {com.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {canAddToCompany && (
                    <>
                      <div className="mt-3">
                        Añadir a empresa:
                        <div className="flex items-center">
                          <select
                            className="w-full cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            value={selectedAddCompany?.id}
                            onChange={(e) => {
                              const userId = e.target.value;
                              setSelectedAddCompany(userId ? availableCompanies.find((user) => user.id === parseInt(userId)) : null);
                            }}
                          >
                            {availableCompanies.map((comp) => (
                              <option key={comp.id} value={comp.id}>
                                {comp.name}
                              </option>
                            ))}
                          </select>
                          <button className="bg-green-600 text-white p-2.5 rounded-r-lg flex items-center justify-center border border-gray-300" onClick={openConfirmModal}>
                            <img src={IconAdd} alt="icono añadir a empresa" />
                          </button>

                          <AddToCompanyModal
                            isOpen={confirmModalOpen}
                            onClose={closeConfirmModal}
                            onConfirm={handleAddUserToCompany}
                            userName={user.name + " " + user.surnames}
                            companyName={selectedAddCompany.name}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {selectedCompany && (
                  <>
                    <div className="mt-5 grid grid-cols-2">
                      <div className="col-span-1 flex flex-col items-start gap-5 py-10 border-r border-dark-blue/60">
                        <p className="w-full italic text-center">
                          CIF: <span className="ml-2 font-semibold not-italic text-lg">{selectedCompany.cif}</span>
                        </p>
                        <img src={selectedCompany.imageUrl} alt="" className="h-14 mx-auto" />
                      </div>
                      <div className="col-span-1">
                        <h3 className="w-full text-lg font-semibold text-dark-blue mb-3 text-center">Usuarios asociados</h3>
                        {selectedCompany.users.map((user) => (
                          <p key={user.id} className="mt-3 pb-4 border-b font-semibold">
                            {user.name + " " + user.surnames}
                          </p>
                        ))}
                      </div>
                    </div>
                    <button className="mt-5 py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white" onClick={openRemoveModal}>
                      Eliminar de empresa
                    </button>
                    <RemoveFromCompanyModal
                      isOpen={removeModalOpen}
                      onClose={closeRemoveModal}
                      onConfirm={handleRemoveUserFromCompany}
                      userName={user.name + " " + user.surnames}
                      companyName={selectedCompany.name}
                    />
                  </>
                )}
              </>
            ) : (
              <p className="italic my-5">No hay empresas creadas</p>
            )}
          </div>

          <div className="w-2/3 bg-gray-50 h-full rounded-lg border-2 border-dark-blue p-5">
            <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
              <p>Usuario</p>
            </div>
            <div className="flex flex-col items-start gap-5 py-10">
              <div className="italic flex items-center justify-center">
                <p className="w-[70px] text-end">DNI: </p>
                <p className="ml-5 font-semibold not-italic text-lg">{user.dni}</p>
              </div>
              <div className="italic flex items-center justify-center">
                <p className="w-[70px] text-end">Nombre: </p>
                <p className="ml-5 font-semibold not-italic text-lg">{user.name}</p>
              </div>
              <div className="italic flex items-center justify-center">
                <p className="w-[70px] text-end">Apellidos: </p>
                <p className="ml-5 font-semibold not-italic text-lg">{user.surnames}</p>
              </div>
              <div className="italic flex items-center justify-center">
                <p className="w-[70px] text-end">Email: </p>
                <p className="ml-5 font-semibold not-italic text-lg">{user.email}</p>
              </div>
              <div className="italic flex items-center justify-center">
                <p className="w-[70px] text-end">Rol: </p>
                <p
                  className={
                    user.role === "ADMIN"
                      ? "py-2 px-4 border border-sky-400 rounded-md bg-sky-200 ml-5 font-semibold not-italic text-lg"
                      : "py-2 px-4 border rounded-md not-italic text-lg ml-5 font-semibold"
                  }
                >
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button onClick={() => toggleEditModal(user.id)} className="px-4 py-2 rounded-md bg-clear-blue text-white hover:bg-dark-blue/90">
            Editar Usuario
          </button>

          <Modal open={modalStates[user.id]?.openEdit} onClose={() => toggleEditModal(user.id)}>
            <EditUser user={user} />
          </Modal>
        </div>
      </div>
    </Modal>
  );
};

DetailsUserModal.propTypes = {
  user: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
