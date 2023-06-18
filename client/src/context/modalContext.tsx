import { createContext } from "react";
import React from "react";

type ModalType = "login" | "signup" | null;

interface ModalContextType {
  modalOpen: boolean;
  modalType: ModalType;
  setModalOpen: (isOpen: boolean) => void;
  setModalType: (status: ModalType) => void;
}

const modal = createContext<ModalContextType>({
  modalOpen: false,
  modalType: "login",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModalOpen: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModalType: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalType, setModalType] = React.useState<ModalType>(null);

  return (
    <modal.Provider
      value={{ modalOpen, setModalOpen, modalType, setModalType }}
    >
      {children}
    </modal.Provider>
  );
};

export { modal, ModalProvider };
