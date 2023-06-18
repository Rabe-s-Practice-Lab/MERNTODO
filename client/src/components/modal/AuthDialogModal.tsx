import { useEffect, useRef, useCallback } from "react";
import { useModal } from "../../hooks/useModal";
import CloseIcon from "../../assets/icons/closeIcon";
import Login from "./Login";
import SignUp from "./SignUp";
import "./css/modalContent.css";
import "./css/AuthDialogModal.css";

const AuthDialogModal = () => {
  const { modalOpen, setModalOpen, modalType, setModalType } = useModal();

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
        setModalType(null);
      }
    },
    [setModalOpen, setModalType]
  );

  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!modalOpen) el?.close();
  }, [modalOpen]);

  return (
    <dialog
      ref={modalRef}
      // for outside click
      onClick={onClick}
      // for esc key
      onClose={() => {
        setModalOpen(false);
        setModalType(null);
      }}
      onAnimationEnd={onAnimEnd}
      className={`auth__modal ${!modalOpen ? "auth__modal--closing" : null}`}
    >
      <div className="auth__modal__content">
        {/* CLOSE BTN */}
        <div
          role="button"
          tabIndex={1}
          className="icon modal__close--btn"
          onClick={() => {
            setModalOpen(false);
            setModalType(null);
          }}
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
    </dialog>
  );
};

export default AuthDialogModal;
