import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import UserService from "../../../../../services/UserService";
import { Modal } from "../../utils/Modal";

export const DeleteUserModal = ({ user, isOpen, onClose }) => {
  const navigate = useNavigate();

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      await UserService.deleteUser(userId, token);
      navigate("/app/management");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeOut>
      <div className="py-10 px-14 flex flex-col justify-center items-center gap-5">
        <p className="text-2xl text-red-600 font-bold">Eliminar usuario</p>
        <p className="text-lg font-semibold">{user.name + " " + user.surnames}</p>
        <p className="text-lg font-semibold">
          <span className="italic font-normal">DNI: </span>
          {user.dni}
        </p>

        <button onClick={() => deleteUser(user.id)} className="py-2 px-3 bg-red-500 rounded-md hover:bg-red-600 text-white">
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

DeleteUserModal.propTypes = {
  user: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
