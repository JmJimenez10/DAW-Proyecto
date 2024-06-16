import PropTypes from "prop-types";
import { Modal } from "../../utils/Modal";
import Image1 from "../../../../../assets/Imagen1.png";
import Image2 from "../../../../../assets/Imagen2.png";
import Image3 from "../../../../../assets/Imagen3.png";
import Image4 from "../../../../../assets/Imagen4.png";
import Image5 from "../../../../../assets/Imagen5.png";
import Image6 from "../../../../../assets/Imagen6.png";
import Image7 from "../../../../../assets/Imagen7.png";

import { useState } from "react";

export const UserHelpModal = ({ open, onClose }) => {
  const help = [
    {
      title: "Cabecera",
      text: "En la cabecera dispondrá de la sección actual en la que se encuentre, un botón para agrandar o minimizar el tamaño del contenido principal, reduciendo los menús laterales, y los datos de su perfil el cual es un botón para acceder a sus datos de forma detallada.",
      image: Image1,
    },
    {
      title: "Menú lateral izquierdo",
      text: "Son las distintas secciones que tiene la página, por las cuales podrá navegar, así como el botón para salir y con ello cerrar sesión.",
      image: Image2,
    },
    {
      title: "Información lateral derecho",
      text: "Esta parte está dividida en tres bloques: Buscador donde podrá cambiar entre las empresas a las que pertenezca; Datos de la empresa seleccionada (nombre y logo); Notificaciones recibidas",
      image: Image3,
    },
    {
      title: "Contenido principal panel de control",
      text: "Divido en tres bloques principales, aparecen los últimos documentos recibidos y enviados y una gráfica con datos financieros trimestrales.",
      image: Image4,
    },
    {
      title: "Tabla de datos de la gráfica",
      text: "En la parte de la gráfica podrá pulsar el icono que aparece en la parte superior para ver información en forma de tabla.",
      image: Image5,
    },
    {
      title: "Contenido principal mis documentos",
      text: "Podrá elegir si ver los enviados o recibidos seleccionándolos en la parte superior. Dentro de cada apartado dispone de filtro por secciones o búsqueda de término que coincida con el nombre de los documentos. Además, en la parte de enviados aparece un botón en verde para añadir nuevo documento y compartir con la gestoría.",
      image: Image6,
    },
    {
      title: "Visualizar documento",
      text: "También en esta sección, clicando en el icono de ver de cualquier documento, visualizará dicho documento en la misma pantalla.",
      image: Image7,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % help.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + help.length) % help.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Modal open={open} onClose={onClose} closeOut>
      <h2 className="pt-2 pb-2 font-bold text-2xl text-dark-blue">Ayuda de Usuario</h2>
      <div className="relative w-[500px]">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {help.map((item, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
              <img src={item.image} className="block w-full h-full object-contain" alt={`Slide ${index + 1}`} />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute z-30 flex justify-center space-x-3 -bottom-4 left-1/2 transform -translate-x-1/2">
          {help.map((_, index) => (
            <button
              key={index}
              type="button"
              className={` w-3 h-3 rounded-full ${index === currentIndex ? "bg-dark-blue" : "bg-gray-500"}`}
              aria-current={index === currentIndex}
              aria-label={`Slide ${index + 1}`}
              onClick={() => goToImage(index)}
            ></button>
          ))}
        </div>
        <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prevImage}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-clear-blue/30 group-hover:bg-clear-blue/50 group-focus:ring-4 group-focus:ring-clear-blue group-focus:outline-none">
            <svg className="w-4 h-4 text-dark-blue rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextImage}>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-clear-blue/30 group-hover:bg-clear-blue/50 group-focus:ring-4 group-focus:ring-clear-blue group-focus:outline-none">
            <svg className="w-4 h-4 text-dark-blue rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </Modal>
  );
};

UserHelpModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
