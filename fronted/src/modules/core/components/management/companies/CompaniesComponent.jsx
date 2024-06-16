import { useEffect, useState } from "react";
import IconDown from "../../../../../assets/icons/arrow-down.svg";
import IconUp from "../../../../../assets/icons/arrow-up.svg";
import IconDetails from "../../../../../assets/icons/clipboard-text.svg";
import IconPhotoOff from "../../../../../assets/icons/photo-off.svg";
import IconSearch from "../../../../../assets/icons/search.svg";
import IconTrash from "../../../../../assets/icons/trash-white.svg";
import CompanyImagesService from "../../../../../services/CompanyImagesService";
import CompanyService from "../../../../../services/CompanyService";
import { Loading } from "../../utils/Loading";
import { Modal } from "../../utils/Modal";
import { AddCompany } from "./AddCompany";
import { DeleteCompanyModal } from "./DeleteCompanyModal";
import { DetailsCompanyModal } from "./DetailsCompanyModal";

export const CompaniesComponent = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListCompanies = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyService.listCompanies(token);
      setCompanies(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCompaniesWithImages = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyService.listCompanies(token);
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
      setCompanies(companiesWithImages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListCompanies();
    getCompaniesWithImages();
  }, []);

  // Controlar modal añadir empresa
  const [openAdd, setOpenAdd] = useState(false);

  // Cuando se carga la lista de empresas, inicializamos el estado de los modales
  const [modalStates, setModalStates] = useState({});

  useEffect(() => {
    const initialModalStates = companies.reduce((acc, company) => {
      acc[company.id] = { openDetails: false, openDelete: false };
      return acc;
    }, {});
    setModalStates(initialModalStates);
  }, [companies]);

  // Función para abrir o cerrar el modal de detalles de una empresa
  const toggleDetailsModal = (companyId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [companyId]: {
        ...prevState[companyId],
        openDetails: !prevState[companyId]?.openDetails,
      },
    }));
  };

  // Función para abrir o cerrar el modal de eliminación de una empresa
  const toggleDeleteModal = (companyId) => {
    setModalStates((prevState) => ({
      ...prevState,
      [companyId]: {
        ...prevState[companyId],
        openDelete: !prevState[companyId]?.openDelete,
      },
    }));
  };

  // Busqueda Empresa
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value) {
      const filtered = companies.filter((company) => company.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies(companies);
    }
  };

  const handleCompanyClick = (company) => {
    setSearch("");
    setFilteredCompanies([]);
    toggleDetailsModal(company.id);
  };

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para almacenar el criterio de ordenación actual
  const [orderBy, setOrderBy] = useState("cif");
  // Estado para almacenar si la ordenación es ascendente o descendente
  const [orderAsc, setOrderAsc] = useState(true);
  // Número de usuarios por página
  const companiesPerPage = 5;
  // Índice del primer usuario en la página actual
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

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

  // Función para ordenar las empresas según el criterio actual y el orden ascendente/descendente
  const sortedCompanies = companies.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return orderAsc ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return orderAsc ? 1 : -1;
    return 0;
  });

  // Usuarios a mostrar en la página actual
  const currentCompanies = sortedCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (companies.length > 0) {
      setLoading(false);
    }
  }, [companies]);

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
            <option value="dni">CIF</option>
            <option value="name">Nombre</option>
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
              placeholder="Buscar empresa"
              className="ml-2 text-xl bg-gray-50 focus:outline-none focus:ring-0 w-52 xl:w-40"
              value={search}
              onChange={handleSearchChange}
            />
            <img src={IconSearch} alt="icono lupa de buscar" className="hover:cursor-pointer hover:bg-gray-300 rounded-lg p-2" />
          </label>
          {search && (
            <ul className="absolute mt-1 bg-white border border-gray-300 rounded-md w-full z-10">
              {filteredCompanies.map((company) => (
                <li key={company.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCompanyClick(company)}>
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {currentCompanies.length === 0 ? (
        <div className="row-span-8 flex items-center justify-center">
          <p className="italic">No hay empresas</p>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <table className="row-span-8 z-0 rounded-lg w-full">
              <thead>
                <tr>
                  <th className="py-4 border-y border-gray-400 text-center">CIF</th>
                  <th className="py-4 border-y border-gray-400 text-center">Nombre</th>
                  <th className="py-4 border-y border-gray-400 text-center">Logo</th>
                  <th className="py-4 border-y border-gray-400 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentCompanies.map((company) => (
                  <tr key={company.id}>
                    <td className="w-1/6 py-4 border-b border-gray-300 text-center">{company.cif}</td>
                    <td className="w-1/6 py-4 border-b border-gray-300 text-center">{company.name}</td>
                    <td className="w-1/6 py-4 border-b border-gray-300 text-center">
                      <img src={company.imageUrl ? company.imageUrl : IconPhotoOff} alt={company.name} className="mx-auto max-w-[50px]" />
                    </td>
                    <td className="w-1/6 py-4 border-b border-gray-300 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <button onClick={() => toggleDeleteModal(company.id)}>
                          <img src={IconTrash} alt="icono papelera" title="Eliminar" className="p-2 bg-red-500 rounded-md hover:bg-red-600" />
                        </button>
                        <button onClick={() => toggleDetailsModal(company.id)}>
                          <img src={IconDetails} alt="icono detalles" title="Ver detalles" className="p-2 bg-orange-500 rounded-md hover:bg-orange-600" />
                        </button>
                      </div>
                      <DeleteCompanyModal company={company} isOpen={modalStates[company.id]?.openDelete} onClose={() => toggleDeleteModal(company.id)} />
                      <DetailsCompanyModal company={company} isOpen={modalStates[company.id]?.openDetails} onClose={() => toggleDetailsModal(company.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      <div className="row-span-2 w-full flex items-center justify-evenly">
        {currentCompanies.length === 0 ? (
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
              className={`px-4 py-2 rounded-md ${indexOfLastCompany >= companies.length ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-dark-blue text-white"}`}
              onClick={nextPage}
              disabled={indexOfLastCompany >= companies.length}
            >
              Siguiente
            </button>
          </div>
        )}

        <div>
          <button onClick={() => setOpenAdd(true)} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
            Añadir Empresa
          </button>

          <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
            <AddCompany />
          </Modal>
        </div>
      </div>
    </div>
  );
};
