import { NavLink } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import { logoutUser } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

import css from "./BurgerMenu.module.css";

interface BurgerMenuProps {
  toggle: () => void;
}

export default function BurgerMenu({ toggle }: BurgerMenuProps) {
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    console.log("click Logout");
    try {
      dispatch(logoutUser());
      console.debug("Logout successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  };
  return (
    <div className={css.burgerMenuContentWrapper}>
      <div className={css.btnWrapper}>
        <button className={`${css.burgerBtn}`} onClick={toggle}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-burgerClose`}></use>
          </svg>
        </button>
      </div>

      <nav>
        <ul className={css.burgerNav}>
          <li>
            <NavLink to='/folders' onClick={toggle}>
              ➤ To Folders
            </NavLink>
          </li>
          <li>
            <NavLink to='/memorize' onClick={toggle}>
              ➤ To Memorize
            </NavLink>
          </li>
          <li>
            <NavLink to='/settings' onClick={toggle}>
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' onClick={toggle}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to='/help-us' onClick={toggle}>
              Help this project
            </NavLink>
          </li>

          <button onClick={onLogout} type='button' className={css.logoutBtn}>
            Log out
          </button>
        </ul>
      </nav>
    </div>
  );
}
