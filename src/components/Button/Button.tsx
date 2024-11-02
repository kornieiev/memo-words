import { ReactNode } from "react";
import css from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  action: "confirm" | "decline";
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  action,
  type,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type === "button" ? "button" : "submit"}
      className={
        action === "confirm" ? `${css.btn}` : `${css.btn} ${css.btnDecline}`
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
