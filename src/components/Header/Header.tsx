import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo-mini-optim.jpg";
import sprite from "../../assets/sprite.svg";

import css from "./Header.module.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";

export default function Header() {
  const modalRef = useRef(null); // ref to burger modal
  const modalBtnCloseRef = useRef(null); // ref to button open burger

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    // checking if a click occurred outside the modal and the close menu button
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      modalBtnCloseRef.current &&
      !modalBtnCloseRef.current.contains(e.target)
    ) {
      setIsBurgerOpen(false);
    }
  };

  useEffect(() => {
    if (isBurgerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBurgerOpen]);

  return (
    <div className={`container ${css.headerWrapper} ${css.menuContainer}`}>
      <a href='/' className={css.logoText}>
        <span>Memo</span>
        <span>Words</span>
      </a>
      <a href='/'>
        <img src={logo} alt='memo words logo' className={css.logo} />
      </a>
      {isAuthenticated && (
        <>
          <div className={css.btnWrapper}>
            <button className={css.burgerBtn}>
              <svg className={css.icon}>
                <use href={`${sprite}#icon-user`}></use>
              </svg>
            </button>
            <button
              className={`${css.burgerBtn}`}
              onClick={toggleBurgerMenu}
              ref={modalBtnCloseRef}
            >
              <svg className={css.icon}>
                <use href={`${sprite}#icon-burgerOpen`}></use>
              </svg>
            </button>
          </div>
          <div
            className={`${css.dropdownMenu} ${isBurgerOpen ? css.show : ""}`}
            ref={modalRef}
          >
            <BurgerMenu toggle={toggleBurgerMenu} />
          </div>
        </>
      )}
    </div>
  );
}
