import { useEffect, useState } from "react";
import IconPhoto from "../../../../../assets/icons/photo.svg";
import CompanyService from "../../../../../services/CompanyService";
import CompanyImagesService from "../../../../../services/CompanyImagesService";

export const InfoCompany = () => {
  const [company, setCompany] = useState(null);
  const [image, setImage] = useState(IconPhoto);

  useEffect(() => {
    const handleStorageChange = () => {
      const companyId = localStorage.getItem("selectedCompanyId");
      if (companyId) {
        try {
          const token = localStorage.getItem("token");
          CompanyService.getCompany(companyId, token)
            .then((response) => {
              setCompany(response);
              return CompanyImagesService.getCompanyImage(companyId, token);
            })
            .then((response) => {
              const url = URL.createObjectURL(response);
              setImage(url);
            })
            .catch((error) =>
              console.error("Error fetching company details or image:", error)
            );
        } catch (error) {
          console.error("Error fetching company:", error);
        }
      }
    };

    window.addEventListener("companyChanged", handleStorageChange);

    handleStorageChange();

    return () => {
      window.removeEventListener("companyChanged", handleStorageChange);
    };
  }, [localStorage.getItem("selectedCompanyId")]);

  return (
    <aside className="bg-gray-50 rounded-xl h-1/2 flex flex-col items-center justify-center gap-10 py-12">
      <div className="flex flex-col items-center justify-center gap-4 hover:cursor-pointer">
        <img src={image} alt="Company Logo" className="w-20 xl:w-32" />
      </div>
      <p className="text-xl font-bold" title={company ? company.name : ""}>
        {company
          ? company.name.length > 20
            ? `${company.name.slice(0, 18).trim()}...`
            : company.name
          : "Nombre de Empresa"}
      </p>
    </aside>
  );
};
