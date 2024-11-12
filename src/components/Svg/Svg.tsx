import sprite from "../../assets/sprite.svg";
import css from "./Svg.module.css";

interface SvgProps {
  children: string;
  size: "small" | "medium";
  status?: boolean;
  color?: string;
  onClick?: () => void;
}

export default function Svg({ children, size, status, color }: SvgProps) {
  function selectedStatus(status) {}
  return (
    <>
      {status ? (
        <svg
          className={size === "small" ? css.iconSmall : css.iconMedium}
          style={{
            fill: `${color}`,
          }}
        >
          <use href={`${sprite}#icon-${children}`}></use>
        </svg>
      ) : (
        <svg className={size === "small" ? css.iconSmall : css.iconMedium}>
          <use href={`${sprite}#icon-${children}`}></use>
        </svg>
      )}
    </>
  );
}
