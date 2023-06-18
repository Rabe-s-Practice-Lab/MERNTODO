import React from "react";
import "./nav.css";
import { useModal } from "../../hooks/useModal";

const Nav = () => {
  const { modalOpen, setModalOpen, setModalType } = useModal();
  console.log(modalOpen);

  return (
    <nav className="nav_wrapper">
      <header className="nav__header">
        <h3 className="header__title">
          MERN<span className="header__span">Todo</span>
        </h3>
      </header>
      <div className="nav__btn--group">
        <a
          href="#"
          className="btn--login"
          role="button"
          onClick={() => {
            setModalType("login");
            setModalOpen(true);
          }}
        >
          Log In
        </a>
        <a
          href="#"
          className="btn btn--signup"
          role="button"
          onClick={() => {
            setModalType("signup");
            setModalOpen(true);
          }}
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default Nav;
