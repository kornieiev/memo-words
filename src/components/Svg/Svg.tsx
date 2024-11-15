import sprite from "../../assets/sprite.svg";
import css from "./Svg.module.css";

interface SvgProps {
  children: string;
  size?: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export default function Svg({
  children,
  size = "1rem",
  color = "#fce2be",
}: SvgProps) {
  return (
    <>
      <svg
        className={css.icon}
        style={{
          fill: `${color}`,
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      >
        <use href={`${sprite}#icon-${children}`}></use>
      </svg>
    </>
  );
}
