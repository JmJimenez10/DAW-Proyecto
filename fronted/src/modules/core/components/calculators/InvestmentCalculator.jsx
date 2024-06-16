import { useState } from "react";
import { SHADOW_BOX } from "../utils/Constants";

export const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [annualReturnRate, setAnnualReturnRate] = useState(0);
  const [investmentTerm, setInvestmentTerm] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [generatedBenefits, setGeneratedBenefits] = useState(0);

  const calculateInvestment = () => {
    const principal = parseFloat(initialInvestment);
    const annualRate = parseFloat(annualReturnRate) / 100;
    const years = parseFloat(investmentTerm);

    const futureValueCalc = principal * Math.pow(1 + annualRate, years);
    const benefits = futureValueCalc - principal;

    setFutureValue(futureValueCalc);
    setGeneratedBenefits(benefits);
  };

  return (
    <div className={`bg-gray-50 rounded-xl px-10 py-3 ${SHADOW_BOX}`}>
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Inversión</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Monto de Inversión Inicial
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tasa de Retorno Anual (%)
          </label>
          <input
            type="number"
            value={annualReturnRate}
            onChange={(e) => setAnnualReturnRate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Plazo (años)
          </label>
          <input
            type="number"
            value={investmentTerm}
            onChange={(e) => setInvestmentTerm(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={calculateInvestment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calcular
        </button>
      </div>
      <div className="">
        <div>
          <p className="text-gray-700 text-lg font-bold">Resultados</p>
        </div>
        <div className="flex gap-4">
          <p className="text-gray-700">
            Valor Futuro de la Inversión: <span className="font-bold">{futureValue.toFixed(2)} USD</span>
          </p>
          <p className="text-gray-700">
            Beneficios Generados: <span className="font-bold">{generatedBenefits.toFixed(2)} USD</span>
          </p>
        </div>
      </div>
    </div>
  );
};
