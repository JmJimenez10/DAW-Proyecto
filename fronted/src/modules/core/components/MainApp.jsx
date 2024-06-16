import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CompanyUserService from "../../../services/CompanyUserService";
import UserService from "../../../services/UserService";
import { CalculatorsScreen } from "./calculators/CalculatorsScreen";
import { Header } from "./commons/Header";
import { NavMenu } from "./commons/NavMenu";
import { Aside } from "./commons/aside/Aside";
import { DashboardScreen } from "./dashboard/DashboardScreen";
import { ManagementScreen } from "./management/ManagementScreen";
import { MyDocumentsScreen } from "./my-documents/MyDocumentsScreen";
import { TemplatesScreen } from "./templates/TemplatesScreen";
import { Loading } from "./utils/Loading";
import { useMediaQuery } from "react-responsive";

export const MainApp = () => {
  const [profileInfo, setProfileInfo] = useState({}); // Estado para almacenar la información del perfil del usuario
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("sizeMaximize"); // Estado para almacenar la clase de tamaño

  useEffect(() => {
    fetchProfileInfo(); // Cargar la información del perfil al montar el componente
    const storedSize = sessionStorage.getItem("selectedSize") || "sizeMaximize";
    setSelectedSize(storedSize);
  }, []);

  useEffect(() => {
    if (profileInfo?.id && profileInfo.role === "USER") {
      getCompaniesByUser(profileInfo.id);
    }
  }, [profileInfo]);

  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem("selectedCompanyId", companies[0].id);
      window.dispatchEvent(new Event("companyChanged"));
    }
  }, [companies]);

  const isAuthenticated = UserService.isAuthenticated();

  const fetchProfileInfo = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCompaniesByUser = async (userId) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await CompanyUserService.companiesByUserId(userId, token);
      setCompanies(response);
    } catch (error) {
      console.error("Error fetching companies by user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Definición de las secciones disponibles en la aplicación
  const sections = [
    {
      name: "Panel de Control",
      path: "dashboard",
    },
    {
      name: "Mis Documentos",
      path: "documents/sent",
    },
    {
      name: "Mis Documentos",
      path: "documents/received",
    },
    {
      name: "Calculadoras",
      path: "calculators",
    },
    {
      name: "Plantillas",
      path: "templates",
    },
    {
      name: "Gestión",
      path: "management/users",
    },
    {
      name: "Gestión",
      path: "management/companies",
    },
  ];

  const location = useLocation(); // Obtener la ubicación actual de la ruta

  // Función para obtener la sección actual basada en la ruta
  const getCurrentSection = () => {
    const currentPath = location.pathname.replace("/app/", "");
    const currentSection = sections.find((section) => section.path === currentPath);
    return currentSection ? currentSection.name : "";
  };

  const currentSection = getCurrentSection(); // Obtener la sección actual
  const isLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div className="h-screen">
      <Loading />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-200 grid grid-rows-[auto_1fr] gap-6 pb-6 px-10">
      {/* Barra de navegación para dispositivos móviles */}
      <nav className="lg:hidden h-20 flex items-center justify-center col-span-full lg:fy-between absolute w-full right-0 left-0">
        {/* Menú desplegable para dispositivos móviles */}
        <input type="checkbox" id="menu" className="peer/menu hidden" />
        <label
          htmlFor="menu"
          className="top-12 absolute right-7 bg-open-menu w-9 h-7 bg-cover bg-center cursor-pointer peer-checked/menu:bg-close-menu peer-checked/menu:fixed peer-checked/menu:right-7 transition-all z-50 lg:hidden"
        ></label>

        {/* Contenido del menú desplegable */}
        <div className="absolute top-0 w-full translate-x-full hidden peer-checked/menu:block peer-checked/menu:translate-x-0 transition-transform lg:bg-none lg:translate-x-0 z-10">
          {/* Lista de navegación y elementos adicionales en el menú */}
          <ul className="absolute inset-x-0 top-24 p-12 bg-dark-gray w-[90%] mx-auto rounded-md h-max text-center grid gap-6 font-bold text-no-white bg-gradient-to-b from-white/70 to-black/70 lg:w-max lg:bg-transparent lg:p-0 lg:grid-flow-col">
            <NavMenu className="col-span-full lg:col-span-2" />
            <Aside className="col-span-full lg:col-span-2" />
          </ul>
        </div>
      </nav>

      {/* Encabezado de la aplicación */}
      <Header className="row-span-1 col-span-full h-20" sectionName={currentSection} />

      {/* Contenido principal */}
      <div className={`row-span-1 col-span-full gap-6 grid grid-cols-12 ${selectedSize === "sizeMaximize" ? "xl:grid-cols-12" : "xl:grid-cols-14"}`}>
        {/* Menú lateral */}
        <NavMenu className={`lg:col-span-1 ${selectedSize === "sizeMaximize" ? "xl:col-span-2" : "xl:col-span-1"} hidden lg:flex`} />

        {/* Área principal de contenido */}
        <main className={`col-span-full lg:col-span-10 ${selectedSize === "sizeMaximize" ? "xl:col-span-8" : "xl:col-span-12"}`}>
          {/* Configuración de rutas */}
          {isAuthenticated && (
            <Routes>
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/documents/*" element={<MyDocumentsScreen />} />
              <Route path="/calculators" element={<CalculatorsScreen />} />
              <Route path="/templates" element={<TemplatesScreen />} />
              {/* Rutas para la gestión, solo accesibles para usuarios con rol "ADMIN" */}
              {profileInfo.role === "ADMIN" && isLargeScreen && <Route path="/management/*" element={<ManagementScreen />} />}

              {/* Redirección por defecto en caso de ruta no encontrada */}
              {location.pathname.startsWith("/app/management/") ? null : <Route path="*" element={<Navigate to="/app/dashboard" />} />}
            </Routes>
          )}
        </main>

        {/* Panel lateral adicional */}
        {isAuthenticated && <Aside className={`lg:col-span-1 ${selectedSize === "sizeMaximize" ? "xl:col-span-2" : "xl:col-span-1"} hidden lg:flex`} />}
      </div>
    </div>
  );
};
