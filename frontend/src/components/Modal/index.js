import { closeModal } from "../../store/modal";
import LoginForm from "../SessionForms/LoginForm/LoginForm";
import SignupForm from "../SessionForms/SignupForm/SignupForm";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal?.modal);

  if (!modal) {
    return null;
  }

  let component;

  switch (modal) {
    case "login":
      component = <LoginForm />;
      break;
    case "signup":
      component = <SignupForm />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={() => dispatch(closeModal())}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

export default Modal;
