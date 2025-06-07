import styles from "./pagina-principala.module.css";
import fundal from "../assets/concurs/fundal.webp";

export default function PaginaPrincipala() {
  return (
    <section className={styles.hero} id="pagina-principala">
      <img
        src={fundal}
        alt="Ilustrație istoria internetului"
        className={styles.imagine}
      />
      <div className={styles.overlay}>
        <h1 className={styles.titlu}>
          <span>Istoria </span>
          <br />
          <span>Internetului </span>
        </h1>

        <p className={styles.subtitlu}>1957 - 2025</p>
      </div>
    </section>
  );
}
