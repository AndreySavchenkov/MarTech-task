import Image from "next/image";
import closeIcon from "../../../public/icons/close.svg";
import styles from "./Modal.module.scss";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.modal__closeButton} onClick={onClose}>
          <Image src={closeIcon} width={30} height={30} alt="close icon" />
        </button>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
