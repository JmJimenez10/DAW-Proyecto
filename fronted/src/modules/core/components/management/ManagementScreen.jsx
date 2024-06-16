import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SHADOW_BOX } from "../utils/Constants";
import { CompaniesComponent } from "./companies/CompaniesComponent";
import { UsersComponent } from "./users/UsersComponent";

export const ManagementScreen = () => {
  const location = useLocation();

  const classInactive = "rounded-xl bg-gray-50 font-semibold text-lg";
  const classActive = "rounded-xl bg-blue-50 border border-clear-blue font-bold text-xl";

  // Función para determinar la clase activa o inactiva basada en la ruta
  const getLinkClassName = (path) => {
    return location.pathname.includes(path) ? classActive : classInactive;
  };

  return (
    <div className="grid grid-cols-8 grid-rows-8 gap-6 h-full">
      <Link
        to="users"
        className={`col-start-1 col-end-5 flex items-center justify-center ${getLinkClassName("/users")} ${SHADOW_BOX}`}
      >
        Usuarios
      </Link>
      <Link
        to="companies"
        className={`col-start-5 col-end-9 flex items-center justify-center ${getLinkClassName("/companies")} ${SHADOW_BOX}`}
      >
        Empresas
      </Link>

      <section className={`col-span-8 row-span-12 bg-gray-50 rounded-xl ${SHADOW_BOX}`}>
        <Routes>
          <Route path="users" element={<UsersComponent />} />
          <Route path="companies" element={<CompaniesComponent />} />
          <Route path="*" element={<Navigate to="users" />} />
        </Routes>
      </section>
    </div>
  );
};
