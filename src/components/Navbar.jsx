import styles from "./Navbar.module.css";
import { Book, HelpCircle, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {/* Aici e logo-ul tău, imaginea simpatică */}
        <li>
          <img
            src="/src/assets/concurs/logo.png"
            alt="logo"
            className={styles.logo}
          />
        </li>

        {/* Iconuri Lucide, exact ca în exemplul tău */}
        <li>
          <a href="#istoric" className={styles.icon}>
            <Book size={22} />
          </a>
        </li>
        <li>
          <a href="#quiz" className={styles.icon}>
            <HelpCircle size={22} />
          </a>
        </li>
        <li>
          <a href="#search" className={styles.icon}>
            <Search size={22} />
          </a>
        </li>
        <li>
          <a href="#contact-me" className={styles.icon}>
            <User size={22} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
