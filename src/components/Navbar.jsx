import { useState } from "react";
import styles from "./Navbar.module.css";
import { evenimenteIstorice } from "../istoric/istoricData";

import { Book, HelpCircle, Search, User, X } from "lucide-react";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const anCautat = searchValue.trim();
      if (anCautat.match(/^\d{4}$/)) {
        const index = evenimenteIstorice.findIndex((ev) => {
          if (!ev.ani) return false;
          const [start, end] = ev.ani.split("-").map(Number);
          const an = Number(anCautat);
          return an >= start && an <= end;
        });

        if (index !== -1) {
          const idAn = `an-${evenimenteIstorice[index].ani}`;
          window.location.hash = idAn;
        } else {
          alert("Anul nu a fost găsit 😢");
        }

        setSearchValue("");
        setShowSearch(false);
      }
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
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

        <li className={styles.searchContainer}>
          {showSearch ? (
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Caută un an..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearch}
                className={styles.searchInput}
                autoFocus
              />
              <X
                size={18}
                className={styles.closeIcon}
                onClick={() => {
                  setShowSearch(false);
                  setSearchValue("");
                }}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className={styles.iconButton}
              aria-label="Deschide căutarea"
            >
              <Search size={22} />
            </button>
          )}
        </li>

        <li>
          <a href="#contact" className={styles.icon}>
            <User size={22} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
