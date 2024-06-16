import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import IconDetails from "../../../../../assets/icons/clipboard-text.svg";
import IconAdd from "../../../../../assets/icons/plus.svg";
import CompanyService from "../../../../../services/CompanyService";
import UserService from "../../../../../services/UserService";
import { Modal } from "../../utils/Modal";
import { AddToCompanyModal } from "../users/AddToCompanyModal";
import { DetailsUserModal } from "../users/DetailsUserModal";
import { RemoveFromCompanyModal } from "../users/RemoveFromCompanyModal";
import CompanyUserService from "../../../../../services/CompanyUserService";

export const DetailsCompanyModal = ({ company, isOpen, onClose }) => {
  const [modalStates, setModalStates] = useState({});
  const [usersByCompany, setUsersByCompany] = useState([]);
  const [selectedAddUser, setSelectedAddUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [selectedUserToRemove, setSelectedUserToRemove] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);

  // const toggleEditModal = (companyId) => {
  //   setModalStates((prevState) => ({
  //     ...prevState,
  //     [companyId]: {
  //       ...prevState[companyId],
  //       openEdit: !prevState[companyId]?.openEdit,
  //     },
  //   }));
  // };

  // Función para abrir o cerrar el modal de detalles de un usuario
  const toggleDetailsUserModal = (userId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        openDetails: !prevState[userId]?.openDetails,
      },
    }));
  };

  const getUsersByCompanyId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyUserService.usersByCompanyId(company.id, token);
      setUsersByCompany(response);
    } catch (error) {
      console.error("Error fetching users by company:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsersByCompanyId();
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filtrar usuarios disponibles (no añadidos a la empresa)
    const filteredUsers = users.filter((user) => {
      return !usersByCompany.some((userCompany) => userCompany.id === user.id);
    });

    setAvailableUsers(filteredUsers);

    // Establecer el primer usuario como selectedAddUser si hay usuarios disponibles
    if (filteredUsers.length > 0) {
      setSelectedAddUser(filteredUsers[0]);
    }
  }, [users, usersByCompany]);

  const handleAddUserToCompany = async () => {
    if (selectedAddUser) {
      try {
        const token = localStorage.getItem("token");
        await CompanyService.addUserToCompany(company.id, selectedAddUser.id, token);
        window.location.reload();
      } catch (error) {
        console.error("Error al añadir usuario a la empresa:", error);
      }
    }
  };

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => setConfirmModalOpen(false);

  const handleRemoveUserFromCompany = (user) => {
    setSelectedUserToRemove(user);
    openRemoveModal();
  };

  const handleRemoveUserConfirmation = async (user) => {
    if (user) {
      try {
        const token = localStorage.getItem("token");
        await CompanyUserService.deleteUserFromCompany(company.id, user.id, token);
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar usuario de la empresa:", error);
      }
    }
  };

  const openRemoveModal = () => setRemoveModalOpen(true);
  const closeRemoveModal = () => setRemoveModalOpen(false);

  return (
    <Modal open={isOpen} onClose={onClose} closeOut minSize>
      <div className="gap-10 flex justify-center items-center flex-col w-full h-full">
        <h3 className="pt-5 font-bold text-2xl">{company.name}</h3>

        <div className="p-5 pt-0 flex justify-center items-center flex-col lg:flex-row w-full h-full gap-10">
          <div className="bg-gray-50 h-full rounded-lg border-2 border-dark-blue p-5">
            <div className="min-w-[500px] text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
              <p>Usuarios</p>
            </div>
            {users.length > 0 ? (
              <>
                {availableUsers.length > 0 && (
                  <div className="mt-3">
                    Añadir a empresa:
                    <div className="flex items-center">
                      <select
                        className="w-full cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        value={selectedAddUser?.id}
                        onChange={(e) => {
                          const userId = e.target.value;
                          setSelectedAddUser(userId ? availableUsers.find((user) => user.id === parseInt(userId)) : null);
                        }}
                      >
                        {availableUsers.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} {user.surnames}
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
                        userName={selectedAddUser.name + " " + selectedAddUser.surnames}
                        companyName={company.name}
                      />
                    </div>
                  </div>
                )}
                <div className="mt-2">
                  {usersByCompany.map((user) => (
                    <div key={user.id} className="flex justify-between items-center mt-3 pb-4 border-b">
                      <p key={user.id} className=" font-semibold">
                        {user.name + " " + user.surnames}
                      </p>
                      <div className="flex justify-center items-center gap-1">
                        <button className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white" onClick={() => handleRemoveUserFromCompany(user)}>
                          Eliminar de empresa
                        </button>

                        <RemoveFromCompanyModal
                          isOpen={removeModalOpen}
                          onClose={closeRemoveModal}
                          onConfirm={() => handleRemoveUserConfirmation(selectedUserToRemove)}
                          userName={selectedUserToRemove ? selectedUserToRemove.name + " " + selectedUserToRemove.surnames : ""}
                          companyName={company.name}
                        />

                        <button onClick={() => toggleDetailsUserModal(user.id)}>
                          <img src={IconDetails} alt="icono detalles" title="Ver detalles" className="p-2 bg-orange-500 rounded-md hover:bg-orange-600" />
                        </button>
                        <DetailsUserModal user={user} isOpen={modalStates[user.id]?.openDetails} onClose={() => toggleDetailsUserModal(user.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="italic my-5">No hay usuarios creados</p>
            )}
          </div>

          <div className="w-2/3 bg-gray-50 h-full rounded-lg border-2 border-dark-blue p-5">
            <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
              <p>Empresa</p>
            </div>
            <div className="flex flex-col items-start gap-5 py-10">
              <div className="italic flex items-center justify-center">
                <p className="w-[70px] text-end">CIF: </p>
                <p className="ml-5 font-semibold not-italic text-lg">{company.cif}</p>
              </div>
              <div className="italic flex items-center justify-center">
                <p className="w-[70px] text-end">Nombre: </p>
                <p className="ml-5 font-semibold not-italic text-lg">{company.name}</p>
              </div>

              {company.imageUrl ? (
                <div className="italic flex items-center justify-center">
                  <p className="w-[70px] text-end">Logo: </p>
                  <img src={company.imageUrl} alt={"logo de " + company.name} className="ml-5 mx-auto max-w-[50px]" />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {/* <div>
          <button onClick={() => toggleEditModal(company.id)} className="px-4 py-2 rounded-md bg-clear-blue text-white hover:bg-dark-blue/90">
            Editar Empresa
          </button>

          <Modal open={modalStates[company.id]?.openEdit} onClose={() => toggleEditModal(company.id)}>
            <EditUser user={user} />
          </Modal>
        </div> */}
      </div>
    </Modal>
  );
};

DetailsCompanyModal.propTypes = {
  company: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
