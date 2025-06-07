import styles from "./contact-me.module.css";

export default function ContactMe() {
  return (
    <div className={styles.contactSection}>
      <section className={styles.contact} id="contact"></section>
      <p className={styles.text}>Pentru și mai multe proiecte super</p>
      <a
        className={styles.link}
        href="https://github.com/Kiara-Croft"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub: Kiara-Croft
      </a>
    </div>
  );
}
