"use client";

import { Button } from "../Button/Button";
import { Item } from "./components/Item/Item";
import styles from "./List.module.scss";

export const List = ({ handle }: { handle: () => void }) => {
  const items = [
    "Subscribe to our News",
    <Button key="button" onClick={handle}>SIGN UP</Button>,
    "Check your email inbox ",
    "Wait till September 22",
  ];

  return (
    <div className={styles.list}>
      <h1 className={styles.list__title}>How to Participate</h1>
      <ul className={styles.list__content}>
        {items.map((item, index) => (
          <Item key={index} serialNumber={index + 1} content={item} />
        ))}
      </ul>
    </div>
  );
};
