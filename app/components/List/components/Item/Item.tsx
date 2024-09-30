import styles from "./Item.module.scss";

type Props = {
  serialNumber: number;
  content: string | React.ReactNode;
};

export const Item = ({ content, serialNumber }: Props) => {
  return (
    <li className={styles.item}>
      <span className={styles.item__number}>{`${serialNumber}.`}</span>
      <span className={styles.item__content}>{content}</span>
    </li>
  );
};
