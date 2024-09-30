import styles from "./Success.module.scss";

export const Success = () => {
  return (
    <div className={styles.success}>
      <h3 className={styles.success__title}>Thank You</h3>
      <span className={styles.success__text}>
        To complete registration, please check your e-mail
      </span>
    </div>
  );
};
