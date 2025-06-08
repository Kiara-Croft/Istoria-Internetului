import AnIstoric from "./AnIstoric";
import styles from "./istoric.module.css";

export default function Istoric() {
  return (
    <div className={styles.container}>
      <section className={styles.istoric} id="istoric" />
      <AnIstoric />
    </div>
  );
}
