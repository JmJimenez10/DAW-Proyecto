import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";
import CompanyImagesService from "../../../../../services/CompanyImagesService";
import CompanyUserService from "../../../../../services/CompanyUserService";

export const CompanyInfo = () => {
  const [companiesByUser, setCompaniesByUser] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getYourProfile(token);
        setProfileInfo(response.ourUsers);
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    };
    
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    const getCompaniesByUserId = async () => {
      if (!profileInfo.id) return;
      try {
        const token = localStorage.getItem("token");
        const response = await CompanyUserService.companiesByUserId(profileInfo.id, token);
        setCompaniesByUser(response);
      } catch (error) {
        console.error("Error fetching companies by user:", error);
      }
    };

    const getCompaniesWithImages = async () => {
      if (!profileInfo.id) return;
      try {
        const token = localStorage.getItem("token");
        const response = await CompanyUserService.companiesByUserId(profileInfo.id, token);
        const companiesWithImages = await Promise.all(
          response.map(async (company) => {
            let imageUrl = null;
            try {
              const imageResponse = await CompanyImagesService.getCompanyImage(company.id, token);
              if (imageResponse) {
                imageUrl = URL.createObjectURL(imageResponse);
              } else {
                console.error("Error fetching image for company", company.id, imageResponse);
              }
            } catch (error) {
              console.error("Error fetching image for company", company.id, error);
            }
            return { ...company, imageUrl };
          })
        );
        setCompaniesByUser(companiesWithImages);
      } catch (error) {
        console.error("Error fetching companies with images:", error);
      }
    };

    getCompaniesByUserId();
    getCompaniesWithImages();
  }, [profileInfo]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-5">
      {companiesByUser.map(comp => (
        <div key={comp.id} className="flex justify-center items-center gap-4">
          <img src={comp.imageUrl} alt={`logo ${comp.name}`} className="h-7" />
          <span className="font-bold text-xl">{comp.name}</span>
        </div>
      ))}
    </div>
  );
};
