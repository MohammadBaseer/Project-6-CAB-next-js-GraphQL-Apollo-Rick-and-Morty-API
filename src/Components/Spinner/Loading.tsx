import styles from "./Loading.module.scss";

const Spinner = () => {
  return (
    <div className={styles.Spinner_container}>
      <div className={styles.lds_ripple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
