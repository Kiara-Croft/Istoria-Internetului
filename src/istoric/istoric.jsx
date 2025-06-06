import styles from "./istoric.module.css";
import AnIstoric from "./AnIstoric";

export default function Istoric() {
  return (
    <section className={styles.istoric} id="istoric">
      {/* Fundal decorativ
       <div className={styles.containerMic}></div>
      <div className={styles.containerMare}></div>
 */}

      {/* Lista cu cele 68 de evenimente animate */}
      <AnIstoric />
    </section>
  );
}
