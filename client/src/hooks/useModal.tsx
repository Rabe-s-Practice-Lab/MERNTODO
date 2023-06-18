import React from "react";
import { modal } from "../context/modalContext";

export const useModal = () => {
  return React.useContext(modal);
};
