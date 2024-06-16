import { useState } from "react";
import { SHADOW_BOX } from "../utils/Constants";

export const CompoundInterestCalculator = () => {
  const [initialAmount, setInitialAmount] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [compoundingPeriods, setCompoundingPeriods] = useState(0);
  const [investmentTerm, setInvestmentTerm] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [accumulatedInterest, setAccumulatedInterest] = useState(0);

  const calculateCompoundInterest = () => {
    const principal = parseFloat(initialAmount);
    const annualRate = parseFloat(annualInterestRate) / 100;
    const periodsPerYear = parseInt(compoundingPeriods);
    const totalPeriods = parseFloat(investmentTerm) * periodsPerYear;

    const futureValueCalc = principal * Math.pow(1 + annualRate / periodsPerYear, totalPeriods);
    const interestAccrued = futureValueCalc - principal;

    setFutureValue(futureValueCalc);
    setAccumulatedInterest(interestAccrued);
  };

  return (
    <div className={`bg-gray-50 rounded-xl px-10 py-3 ${SHADOW_BOX}`}>
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Interés Compuesto</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Monto Inicial
          </label>
          <input
            type="number"
            value={initialAmount}
            onChange={(e) => setInitialAmount(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tasa de Interés Anual (%)
          </label>
          <input
            type="number"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Período de Capitalización (por año)
          </label>
          <input
            type="number"
            value={compoundingPeriods}
            onChange={(e) => setCompoundingPeriods(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Plazo de Inversión (años)
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
          onClick={calculateCompoundInterest}
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
            Valor Futuro: <span className="font-bold">{futureValue.toFixed(2)} USD</span>
          </p>
          <p className="text-gray-700">
            Intereses Acumulados: <span className="font-bold">{accumulatedInterest.toFixed(2)} USD</span>
          </p>
        </div>
      </div>
    </div>
  );
};
