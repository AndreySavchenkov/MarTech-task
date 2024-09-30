"use client";

import styles from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" ;
};

export const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  ...rest
}: Props) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
