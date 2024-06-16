import { useState, useEffect } from 'react';

const CurrentDateTime = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Actualiza cada segundo

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  const formatFirstUppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formattedDateTime = currentDateTime.toLocaleString('es-ES', {
    weekday: 'long', // Nombre del día de la semana
    day: 'numeric', // Día del mes
    month: 'long', // Nombre del mes
    year: 'numeric', // Año
    hour: '2-digit', // Hora en formato 12 horas
    minute: '2-digit', // Minuto
    second: '2-digit', // Segundo
  }).replace(/^(.{1})/, formatFirstUppercase);

  return (
    formattedDateTime
  );
};

export default CurrentDateTime;
