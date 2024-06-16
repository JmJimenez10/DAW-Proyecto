import PropTypes from "prop-types";
import { Modal } from "../../utils/Modal";
import CompanyService from "../../../../../services/CompanyService";
import CompanyImagesService from "../../../../../services/CompanyImagesService";

export const DeleteCompanyModal = ({ company, isOpen, onClose }) => {
  const removeCompany = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await CompanyImagesService.deleteCompanyImage(id, token);
      await CompanyService.deleteCompany(id, token);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching companies:", error);
    }

    try {
      const token = localStorage.getItem("token");
      await CompanyService.deleteCompany(id, token);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar empresa</p>
        <p className="text-lg font-semibold">{company.name}</p>
        <p className="text-lg font-semibold">
          <span className="italic font-normal">CIF: </span>
          {company.cif}
        </p>

        <button onClick={() => removeCompany(company.id)} className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white">
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

DeleteCompanyModal.propTypes = {
  company: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
