import { useEffect, useState } from "react";
import IconDown from "../../../../../assets/icons/arrow-down.svg";
import IconUp from "../../../../../assets/icons/arrow-up.svg";
import IconDetails from "../../../../../assets/icons/clipboard-text.svg";
import IconSearch from "../../../../../assets/icons/search.svg";
import IconTrash from "../../../../../assets/icons/trash-white.svg";
import UserService from "../../../../../services/UserService";
import { Loading } from "../../utils/Loading";
import { Modal } from "../../utils/Modal";
import { AddUser } from "./AddUser";
import { DeleteUserModal } from "./DeleteUserModal";
import { DetailsUserModal } from "./DetailsUserModal";

export const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Controlar modal añadir usuario
  const [openAdd, setOpenAdd] = useState(false);

  // Cuando se carga la lista de usuarios, inicializamos el estado de los modales
  const [modalStates, setModalStates] = useState({});

  useEffect(() => {
    const initialModalStates = users.reduce((acc, user) => {
      acc[user.id] = { openDetails: false, openDelete: false };
      return acc;
    }, {});
    setModalStates(initialModalStates);
  }, [users]);

  // Función para abrir o cerrar el modal de detalles de un usuario
  const toggleDetailsModal = (userId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        openDetails: !prevState[userId]?.openDetails,
      },
    }));
  };

  // Función para abrir o cerrar el modal de eliminación de un usuario
  const toggleDeleteModal = (userId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        openDelete: !prevState[userId]?.openDelete,
      },
    }));
  };

  // Busqueda Usuario
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value) {
      const filtered = users.filter((user) => user.surnames.toLowerCase().includes(value.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleUserClick = (user) => {
    setSearch("");
    setFilteredUsers([]);
    toggleDetailsModal(user.id);
  };

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para almacenar el criterio de ordenación actual
  const [orderBy, setOrderBy] = useState("dni");
  // Estado para almacenar si la ordenación es ascendente o descendente
  const [orderAsc, setOrderAsc] = useState(true);
  // Número de usuarios por página
  const usersPerPage = 5;
  // Índice del primer usuario en la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Función para cambiar el criterio de ordenación
  const handleOrderChange = (event) => {
    setOrderBy(event.target.value);
  };

  // Función para cambiar el orden ascendente/descendente
  const toggleOrder = () => {
    setOrderAsc((prevOrderAsc) => !prevOrderAsc);
  };

  // Función para ordenar los usuarios según el criterio actual y el orden ascendente/descendente
  const sortedUsers = users.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderAsc ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderAsc ? 1 : -1;
    return 0;
  });

  // Usuarios a mostrar en la página actual
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="z-50 h-full w-full grid grid-rows-12">
      <div className="row-span-2 w-full flex flex-col lg:flex-row py-3 lg:py-0 items-center justify-center gap-3">
        <label htmlFor="order" className="flex items-center gap-3 cursor-pointer">
          <span className="">Ordenar por:</span>
          <select
            id="order"
            onChange={handleOrderChange}
            value={orderBy}
            className="cursor-pointer font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            <option value="dni">DNI</option>
            <option value="name">Nombre</option>
            <option value="surnames">Apellidos</option>
            <option value="email">Correo</option>
            <option value="rol">Rol</option>
            <option value="creationDate">Fecha creación</option>
          </select>
        </label>
        <button
          onClick={toggleOrder}
          className="font-bold flex items-center justify-center gap-2 w-1/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        >
          {orderAsc ? "Ascendente" : "Descendente"}
          <img src={orderAsc ? IconUp : IconDown} className="w-1/7" alt={orderAsc ? "icono ascendente" : "icono descendente"} />
        </button>
        <form action="" className="p-1 relative border border-gray-300 rounded-lg">
          <label htmlFor="buscar" className="flex">
            <input
              type="search"
              id="buscar"
              placeholder="Buscar usuario"
              className="ml-2 text-xl bg-gray-50 focus:outline-none focus:ring-0 w-52 xl:w-40"
              value={search}
              onChange={handleSearchChange}
            />
            <img src={IconSearch} alt="icono lupa de buscar" className="hover:cursor-pointer hover:bg-gray-300 rounded-lg p-2" />
          </label>
          {search && (
            <ul className="absolute mt-1 bg-white border border-gray-300 rounded-md w-full z-10">
              {filteredUsers.map((user) => (
                <li key={user.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleUserClick(user)}>
                  {user.surnames + ", " + user.name}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {currentUsers.length === 0 ? (
        <div className="row-span-8 flex items-center justify-center">
          <p className="italic">No hay usuarios</p>
        </div>
      ) : (
        <table className="row-span-8 z-0 rounded-lg w-full">
          <thead>
            <tr>
              <th className="py-4 border-y border-gray-400 text-center">DNI</th>
              <th className="py-4 border-y border-gray-400 text-center">Nombre</th>
              <th className="py-4 border-y border-gray-400 text-center">Apellidos</th>
              <th className="py-4 border-y border-gray-400 text-center">Correo</th>
              <th className="py-4 border-y border-gray-400 text-center">Rol</th>
              <th className="py-4 border-y border-gray-400 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="w-1/6 py-4 border-b border-gray-300 text-center">{user.dni}</td>
                <td className="w-1/6 py-4 border-b border-gray-300 text-center">{user.name}</td>
                <td className="w-1/6 py-4 border-b border-gray-300 text-center">{user.surnames}</td>
                <td className="w-1/6 py-4 border-b border-gray-300 text-center">{user.email}</td>
                <td className="w-1/6 py-4 border-b border-gray-300 text-center">
                  <span className={user.role === "ADMIN" ? "py-2 px-4 border border-sky-400 rounded-md bg-sky-200" : "py-2 px-4 border rounded-md"}>{user.role}</span>
                </td>
                <td className="w-1/6 py-4 border-b border-gray-300 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <button onClick={() => toggleDeleteModal(user.id)}>
                      <img src={IconTrash} alt="icono papelera" title="Eliminar" className="p-2 bg-red-500 rounded-md hover:bg-red-600" />
                    </button>
                    <button onClick={() => toggleDetailsModal(user.id)}>
                      <img src={IconDetails} alt="icono detalles" title="Ver detalles" className="p-2 bg-orange-500 rounded-md hover:bg-orange-600" />
                    </button>
                  </div>
                  <DeleteUserModal user={user} isOpen={modalStates[user.id]?.openDelete} onClose={() => toggleDeleteModal(user.id)} />
                  <DetailsUserModal user={user} isOpen={modalStates[user.id]?.openDetails} onClose={() => toggleDetailsModal(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="row-span-2 w-full flex items-center justify-evenly">
        {currentUsers.length === 0 ? (
          ""
        ) : (
          <div>
            <button
              className={`mr-2 px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-dark-blue text-white"}`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <button
              className={`px-4 py-2 rounded-md ${indexOfLastUser >= users.length ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-dark-blue text-white"}`}
              onClick={nextPage}
              disabled={indexOfLastUser >= users.length}
            >
              Siguiente
            </button>
          </div>
        )}

        <div>
          <button onClick={() => setOpenAdd(true)} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
            Añadir Usuario
          </button>

          <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
            <AddUser />
          </Modal>
        </div>
      </div>
    </div>
  );
};
