import { useEffect, useRef, useCallback } from "react";
import { useModal } from "../../hooks/useModal";
import CloseIcon from "../../assets/icons/closeIcon";
import Login from "./Login";
import SignUp from "./SignUp";
import "./css/modalContent.css";
import "./css/AuthDialogModal.css";

const AuthDialogModal = () => {
  const { modalOpen, setModalOpen, modalType } = useModal();

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const { current: el } = modalRef;
    if (modalOpen) {
      el?.showModal();
    }

    if (!modalOpen) {
      el?.close();
    }
  }, [modalOpen]);

  const onClick = useCallback(
    (e: React.SyntheticEvent) => {
      const { target } = e;
      const { current: el } = modalRef;
      if (target === el) {
        setModalOpen(false);
      }
    },
    [setModalOpen]
  );

  return (
    <dialog ref={modalRef} onClick={onClick} className="auth__modal">
      <div className="auth__modal__content">
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
        {modalType === "login" ? <Login /> : <SignUp />}
      </div>
    </dialog>
  );
};

export default AuthDialogModal;
