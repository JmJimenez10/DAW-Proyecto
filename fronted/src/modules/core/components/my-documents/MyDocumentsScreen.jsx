import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SHADOW_BOX } from "../utils/Constants";
import { ReceivedComponent } from "./received/ReceivedComponent";
import { SentComponent } from "./sent/SentComponent";

export const MyDocumentsScreen = () => {
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
        to="sent"
        className={`col-start-1 col-end-5 flex items-center justify-center ${getLinkClassName("/sent")} ${SHADOW_BOX}`}
      >
        Enviados
      </Link>
      <Link
        to="received"
        className={`col-start-5 col-end-9 flex items-center justify-center ${getLinkClassName("/received")} ${SHADOW_BOX}`}
      >
        Recibidos
      </Link>

      <section className={`col-span-8 row-span-12 bg-gray-50 rounded-xl ${SHADOW_BOX}`}>
        <Routes>
          <Route path="sent" element={<SentComponent />} />
          <Route path="received" element={<ReceivedComponent />} />
          <Route path="*" element={<Navigate to="sent" />} />
        </Routes>
      </section>
    </div>
  )
}
