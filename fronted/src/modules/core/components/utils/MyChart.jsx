import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import FinancialDataService from "../../../../services/FinancialDataService";

export const MyChart = () => {
  const [financialData, setFinancialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const companyId = localStorage.getItem("selectedCompanyId");
        const response = await FinancialDataService.getFinancialDataByCompanyId(companyId, token);
        
        // Ordenar los datos por trimestre de forma ascendente
        response.sort((a, b) => {
          // Comparar los trimestres de a y b
          if (a.quarter < b.quarter) return -1;
          if (a.quarter > b.quarter) return 1;
          return 0;
        });
        
        setFinancialData(response);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatQuarter = (date) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const quarterDate = new Date(date);
    return `${months[quarterDate.getMonth()]} ${quarterDate.getFullYear()}`;
  };

  // Construir los datos del gráfico
  const chartData = financialData.length > 0 ? financialData.slice(-6).map((data) => [
    formatQuarter(data.quarter),
    data.sales
  ]) : null;

  return (
      isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : financialData.length > 0 ? (
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="LineChart"
          data={[["Trimestre", "Ventas"], ...chartData]}
          options={{
            title: "Datos Financieros Trimestrales",
            curveType: "straight",
            legend: { position: "bottom" },
            backgroundColor: "",
          }}
          rootProps={{ "data-testid": "1" }}
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="italic text-gray-400">Aún no hay datos para la gráfica</p>
        </div>
      )
  );
};
