import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import IconCalculator from "../../../../assets/icons/calculator.svg";
import IconTemplates from "../../../../assets/icons/file-text.svg";
import IconFiles from "../../../../assets/icons/files.svg";
import IconDashboard from "../../../../assets/icons/layout-dashboard.svg";
import IconLogout from "../../../../assets/icons/logout.svg";
import IconUsers from "../../../../assets/icons/users.svg";
import UserService from "../../../../services/UserService";

export const NavMenu = (props) => {
  const [selectedSize, setSelectedSize] = useState("sizeMaximize");

  useEffect(() => {
    const storedSize = sessionStorage.getItem("selectedSize") || "sizeMaximize";
    setSelectedSize(storedSize);
  }, []);

  // Definición de las secciones de navegación disponibles
  const sections = [
    {
      name: "Panel de Control",
      path: "/dashboard",
      icon: IconDashboard,
    },
    {
      name: "Mis Documentos",
      path: "/documents",
      icon: IconFiles,
    },
    {
      name: "Calculadoras",
      path: "/calculators",
      icon: IconCalculator,
    },
    {
      name: "Plantillas",
      path: "/templates",
      icon: IconTemplates,
    },
  ];

  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    localStorage.removeItem("selectedCompanyId");
    UserService.logout();
  };

  return (
    <nav
      className={`py-12 rounded-xl bg-gray-50 flex justify-between flex-col ${props.className}`}
    >
      {/* Sección de navegación principal */}
      <div className="flex flex-col">
        {/* Mapeo de las secciones para mostrar enlaces de navegación */}
        {isAuthenticated &&
          sections.map((section) => (
            <NavLink
              key={section.name}
              to={`/app${section.path}`}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold flex items-center justify-center gap-3 text-lg py-3 hover:font-bold hover:bg-gray-200 hover:text-blue-800 bg-gray-200 text-blue-800 border-y-2 border-blue-800"
                  : "font-semibold flex items-center justify-center gap-3 text-lg py-3 hover:font-bold hover:bg-gray-200 hover:text-blue-800"
              }
            >
              <img src={section.icon} alt={"icono " + section.name} />
              {/* Nombre de la sección (visible en dispositivos móviles) */}
              <span className={`lg:hidden ${selectedSize === "sizeMaximize" ? "xl:block" : "xl:hidden"}`}>{section.name}</span>
            </NavLink>
          ))}
      </div>

      {/* Sección de navegación adicional para usuarios administradores */}
      <div className="hidden md:flex flex-col">
        {isAdmin && (
          <NavLink
            to="/app/management"
            className={({ isActive }) =>
              isActive
                ? "font-semibold flex items-center justify-center gap-3 text-lg py-3 hover:font-bold hover:bg-gray-200 hover:text-blue-800 bg-gray-200 text-blue-800 border-y-2 border-blue-800"
                : "font-semibold flex items-center justify-center gap-3 text-lg py-3 hover:font-bold hover:bg-gray-200 hover:text-blue-800"
            }
          >
            <img src={IconUsers} alt="icono usuarios" />
            {/* Texto de la sección (visible en dispositivos móviles) */}
            <span className={`lg:hidden ${selectedSize === "sizeMaximize" ? "xl:block" : "xl:hidden"}`}>Gestión</span>
          </NavLink>
        )}

        {/* Enlace para salir de la aplicación */}
        <NavLink
          onClick={handleLogout}
          to="/"
          className="font-semibold flex items-center justify-center gap-3 text-lg py-3 hover:font-bold hover:bg-gray-200 hover:text-blue-800"
        >
          <img src={IconLogout} alt="icono salir" />
          {/* Texto para salir (visible en dispositivos móviles) */}
          <span className={`lg:hidden ${selectedSize === "sizeMaximize" ? "xl:block" : "xl:hidden"} hidden lg:flex`}>Salir</span>
        </NavLink>
      </div>
    </nav>
  );
};

NavMenu.propTypes = {
  className: PropTypes.string,
};
