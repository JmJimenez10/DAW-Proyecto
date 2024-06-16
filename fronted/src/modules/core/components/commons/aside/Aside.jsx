import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { InfoCompany } from "./InfoCompany";
import { Notifications } from "./Notifications";
import { SearchSection } from "./SearchSection";
import IconOpen from "../../../../../assets/icons/chevron-left.svg";
import IconClose from "../../../../../assets/icons/chevron-right.svg";

export const Aside = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("sizeMaximize");

  useEffect(() => {
    const storedSize = sessionStorage.getItem("selectedSize") || "sizeMaximize";
    setSelectedSize(storedSize);
  }, []);

  return (
    <>
      <div
        className={`${props.className} flex flex-col gap-6 lg:hidden ${selectedSize === "sizeMaximize" ? "xl:flex" : "xl:hidden"}`}
      >
        <SearchSection />
        <InfoCompany />
        <Notifications />
      </div>

      <div className={`relative bg-gray-50 rounded-xl lg:flex items-center justify-center hidden ${selectedSize === "sizeMaximize" ? "xl:hidden" : "xl:flex"}`}>
        <img
          src={IconOpen}
          alt="Open"
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        />

        <div
          className={`rounded-xl absolute right-0 top-0 bottom-0  w-[350px] bg-white shadow-lg p-3 transform transition-transform duration-700 ease-in-out ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0 hidden"
          }`}
        >
          <div className="flex h-full">
            <div className="flex flex-col gap-6">
              <SearchSection />
              <InfoCompany />
              <Notifications />
            </div>
            <div className="flex items-center justify-center border-l ml-5">
              <img
                src={IconClose}
                alt="Close"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer mx-5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Aside.propTypes = {
  className: PropTypes.string,
};
