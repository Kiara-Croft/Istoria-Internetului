import { useEffect } from "react";
import styles from "./istoric.module.css";
import animations from "./animations.module.css";

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
      {Array.from({ length: 68 }).map((_, index) => (
        <div key={index} className={styles.eveniment}>
          <div
            className={`${styles.containerMic}`}
            data-animation={`animation-${index % 4}`}
          >
            {index}
          </div>
          <div
            className={`${styles.containerMare}`}
            data-animation={`animation-${(index + 1) % 4}`}
          >
            {index}
          </div>
        </div>
      ))}
    </div>
  );
}
