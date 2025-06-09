import React, { useState, useEffect, useRef } from "react";
import styles from "./pagina-principala.module.css";

export default function PaginaPrincipala() {
  const [ecranPornit, setEcranPornit] = useState(false);
  const ecranRef = useRef(null);

  // Funcție care generează caractere random Matrix
  const randomChar = () => {
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  };

  useEffect(() => {
    let interval;
    if (ecranPornit) {
      interval = setInterval(() => {
        const coloana = document.createElement("div");
        coloana.className = styles.coloanaMatrix;

        // Generează o coloană verticală de caractere
        for (let i = 0; i < 20; i++) {
          const span = document.createElement("span");
          span.textContent = randomChar();
          coloana.appendChild(span);
        }

        // Random pe axa X
        coloana.style.left = `${Math.random() * 100}%`;

        if (ecranRef.current) {
          ecranRef.current.appendChild(coloana);
          if (ecranRef.current.children.length > 40) {
            ecranRef.current.removeChild(ecranRef.current.firstChild);
          }
        }
      }, 200);
    } else if (ecranRef.current) {
      ecranRef.current.innerHTML = "";
    }

    return () => clearInterval(interval);
  }, [ecranPornit]);

  const togglePower = () => {
    setEcranPornit((prev) => !prev);
  };

  return (
    <div className={styles.containerCalculator}>
      <div className={styles.monitor}>
        <div className={styles.monitorSpate}></div>
        <div className={styles.monitorFata}>
          <div className={styles.rama}>
            <div
              className={`${styles.ecran} ${
                ecranPornit ? styles.ecranPornit : ""
              }`}
            >
              <div className={styles.ramaInterior}>
                {ecranPornit && (
                  <div className={styles.titluMatrix}>
                    Istoria Internetului
                    <br />
                    1957–2025
                  </div>
                )}
                <div className={styles.afisaj} ref={ecranRef}></div>
              </div>
            </div>
          </div>
          <div className={styles.butonPower} onClick={togglePower}>
            <div className={styles.iconPower}></div>
          </div>
          <div
            className={`${styles.ledPower} ${
              ecranPornit ? styles.ledOn : styles.ledOff
            }`}
          ></div>
        </div>
      </div>
      <div className={styles.unitate}></div>
    </div>
  );
}
