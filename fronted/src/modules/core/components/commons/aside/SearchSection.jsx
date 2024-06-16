import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";
import IconSearch from "../../../../../assets/icons/search.svg";
import CompanyService from "../../../../../services/CompanyService";
import CompanyUserService from "../../../../../services/CompanyUserService";

export const SearchSection = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const getListCompanies = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyService.listCompanies(token);
      setCompanies(response);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const getCompaniesByUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyUserService.companiesByUserId(userId, token);
      setCompanies(response);
    } catch (error) {
      console.error("Error fetching companies by user:", error);
    }
  };

  useEffect(() => {
    if (!profileInfo.id) return;
    if (profileInfo.role === "USER") {
      // Si el usuario tiene el rol "USER" y tenemos su ID, obtener las empresas asociadas
      try {
        getCompaniesByUser(profileInfo.id);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    } else {
      // Cargar todas las empresas si el rol no es "USER" o falta el ID de usuario
      getListCompanies();
    }
  }, [profileInfo]);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

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

  const handleCompanyClick = (id) => {
    localStorage.setItem("selectedCompanyId", id);
    setSearch("");
    setFilteredCompanies([]);
    window.location.reload();
  };

  return (
    <section className="bg-gray-50 rounded-xl flex items-center justify-center">
      <form action="" className="py-4 relative">
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
              <li key={company.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCompanyClick(company.id)}>
                {company.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    </section>
  );
};
