import React from "react";
// import "./css/modalContent.css";
// import "./css/authModal.css";
import CloseIcon from "../../assets/icons/closeIcon";
import { useModal } from "../../hooks/useModal";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthModal = () => {
  const { modalOpen, setModalOpen, modalType } = useModal();
  return (
    <>
      {/* OVERLY */}
      <div className={`modal__overly`} />
      {/* MODAL */}
      <div className={`modal ${!modalOpen ? "modal--close" : ""}`}>
        {/* CLOSE BTN */}
        <div
          role="button"
          tabIndex={1}
          className="icon modal__close--btn"
          onClick={() => setModalOpen(false)}
        >
          <CloseIcon />
        </div>

        {/* CONTENT */}
        {modalType === "login" ? (
          <Login />
        ) : modalType === "signup" ? (
          <SignUp />
        ) : null}
      </div>
    </>
  );
};

export default AuthModal;
