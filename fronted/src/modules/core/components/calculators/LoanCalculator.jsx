import { useState } from "react";
import { SHADOW_BOX } from "../utils/Constants";

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualInterest = parseFloat(annualInterestRate) / 100;
    const monthlyInterest = annualInterest / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    if (monthlyInterest === 0) {
      const payment = principal / numberOfPayments;
      setMonthlyPayment(payment);
      setTotalInterest(0);
    } else {
      const payment = (principal * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));
      const totalPayment = payment * numberOfPayments;
      setMonthlyPayment(payment);
      setTotalInterest(totalPayment - principal);
    }
  };

  return (
    <div className={`bg-gray-50 rounded-xl px-10 py-3 ${SHADOW_BOX}`}>
      <div className="text-blue-800 border-b-2 font-bold text-lg border-blue-800 p-2 flex items-center justify-center gap-3">
        <p>Préstamo</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">Monto del Préstamo</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tasa de Interés Anual (%)</label>
            <input
              type="number"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">Plazo del Préstamo (años)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-center">
        <button onClick={calculateLoan} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Calcular
        </button>
      </div>
      <div className="">
        <div>
          <p className="text-gray-700 text-lg font-bold">Resultados</p>
        </div>
        <div className="flex gap-4">
          <p className="text-gray-700">
            Pago Mensual: <span className="font-bold">{monthlyPayment.toFixed(2)} USD</span>
          </p>
          <p className="text-gray-700">
            Intereses Totales: <span className="font-bold">{totalInterest.toFixed(2)} USD</span>
          </p>
        </div>
      </div>
    </div>
  );
};
