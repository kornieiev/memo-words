import css from "./Header.module.css";
import logo from "../../assets/logo-mini-optim.jpg";
import sprite from "../../assets/sprite.svg";

export default function Header() {
  return (
    <div className={`container ${css.headerWrapper}`}>
      <a href='/' className={css.logoText}>
        <span>Memo</span>
        <span>Words</span>
      </a>
      <a href='/'>
        <img src={logo} alt='memo words logo' className={css.logo} />
      </a>
      <div className={css.btnWrapper}>
        <button className={css.burgerBtn}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-user`}></use>
          </svg>
        </button>
        <button className={css.burgerBtn}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-burgerOpen`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
