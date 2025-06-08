import { useEffect } from "react";
import styles from "./istoric.module.css";
import animations from "./animations.module.css";
import { evenimenteIstorice } from "./istoricData";

export default function AnIstoric() {
  useEffect(() => {
    const observator = new IntersectionObserver(
      (intrari) => {
        intrari.forEach((intrare) => {
          if (intrare.isIntersecting) {
            const animatie = intrare.target.dataset.animation;
            intrare.target.classList.add(animations[animatie]);
            intrare.target.classList.add(styles.animatiePlutire);
            intrare.target.classList.remove(styles.invizibil);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    const elemente = document.querySelectorAll(
      `.${styles.containerMic}, .${styles.containerMare}`
    );
    elemente.forEach((element) => {
      element.classList.add(styles.invizibil);
      observator.observe(element);
    });

    return () => {
      elemente.forEach((el) => observator.unobserve(el));
    };
  }, []);

  return (
    <div className={styles.listaEvenimente}>
      {evenimenteIstorice.map((eveniment, index) => {
        const pozaSrc = `/concurs/${eveniment.ani.replace(/_/g, "-")}.webp`;
        const pozaEsteSusDreapta = index % 2 === 0;

        if (!eveniment.arePoza && !eveniment.titlu && !eveniment.descriere) {
          return null;
        }

        return (
          <div key={index} className={styles.eveniment}>
            <div className={styles.containerMic} data-animation="fadeIn">
              <h2 className={styles.titlu}>{eveniment.titlu}</h2>
              {eveniment.ani && (
                <div className={styles.anContainer}>
                  <span className={styles.an}>{eveniment.ani}</span>
                </div>
              )}
            </div>

            <div className={styles.containerMare} data-animation="fadeIn">
              <p className={styles.descriere}>{eveniment.descriere}</p>
            </div>

            {eveniment.arePoza && (
              <img
                src={pozaSrc}
                alt={`Eveniment din ${eveniment.ani}`}
                loading="lazy"
                className={`${styles.pozaEveniment} ${
                  pozaEsteSusDreapta
                    ? styles.pozaDreaptaSus
                    : styles.pozaStangaJos
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
