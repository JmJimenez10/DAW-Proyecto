import CurrentDateTime from "../utils/CurrentDateTime";

export const DateTimeSection = () => {
  return (
    <section className="h-full col-span-full lg:col-start-4 lg:col-end-9 lg:row-start-1 lg:row-end-2 bg-gray-50 rounded-xl py-4 px-8 flex items-center justify-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <p className="text-xl text-gray-500 font-semibold">
        <CurrentDateTime />
      </p>
    </section>
  );
};
