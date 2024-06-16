import { CompoundInterestCalculator } from "./CompoundInterestCalculator";
import { InvestmentCalculator } from "./InvestmentCalculator";
import { LoanCalculator } from "./LoanCalculator";
import { SavingsCalculator } from "./SavingsCalculator";

export const CalculatorsScreen = () => {
  return (
    <div className="h-full lg:h-less-menu lg:grid grid-cols-2 grid-rows-2 gap-3">
      <LoanCalculator />

      <CompoundInterestCalculator />

      <SavingsCalculator />

      <InvestmentCalculator />
    </div>
  );
};
