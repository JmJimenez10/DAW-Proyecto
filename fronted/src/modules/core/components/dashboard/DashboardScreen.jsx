import { ChartSection } from "./ChartSection";
import { DateTimeSection } from "./DateTimeSection";
import { ReceivedDash } from "./ReceivedDash";
import { SentDash } from "./SentDash";

export const DashboardScreen = () => {
  return (
    <main className="flex flex-col lg:grid grid-cols-8 grid-rows-8 gap-6 lg:h-full">
      <SentDash />

      <DateTimeSection />

      <ReceivedDash />

      <ChartSection />
    </main>
  );
};
