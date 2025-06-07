import { useEffect, useRef } from "react";
import styles from "./istoric.module.css";
import animations from "./animations.module.css";

export default function AnIstoric({ evenimente }) {
  const observerRef = useRef(null);

  useEffect(() => {
    // Dezactivează temporar animațiile pentru performanță
    document.body.style.scrollBehavior = "auto";

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const element = entry.target;
        const animationClass = animations[element.dataset.animation];

        if (entry.isIntersecting) {
          element.style.willChange = "opacity, transform";
          element.classList.add(animationClass, styles.animatiePlutire);
          element.classList.remove(styles.invizibil);

          // Curăță după ce animația s-a terminat
          setTimeout(() => {
            element.style.willChange = "auto";
          }, 800);
        } else {
          // Doar resetăm dacă elementul este complet în afara viewport-ului
          if (entry.intersectionRatio === 0) {
            element.classList.remove(animationClass, styles.animatiePlutire);
            element.classList.add(styles.invizibil);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.15,
      rootMargin: "50px 0px 50px 0px",
    });

    const animatedElements = document.querySelectorAll(`
      .${styles.containerMic},
      .${styles.containerMare}
    `);

    animatedElements.forEach((el) => {
      el.classList.add(styles.invizibil);
      observerRef.current.observe(el);
    });

    return () => {
      document.body.style.scrollBehavior = "";
      animatedElements.forEach((el) => {
        if (observerRef.current) observerRef.current.unobserve(el);
      });
    };
  }, [evenimente]);

  return (
    <div className={styles.listaEvenimente}>
      {evenimente.map((eveniment, index) => (
        <div key={`${eveniment.titlu}-${index}`} className={styles.eveniment}>
          <div
            className={styles.containerMic}
            data-animation={`animation-${index % 4}`}
          >
            <h2 className={styles.titlu}>{eveniment.titlu}</h2>
            {eveniment.an && (
              <div className={styles.anContainer}>
                <span className={styles.an}>{eveniment.an}</span>
              </div>
            )}
          </div>

          <div
            className={styles.containerMare}
            data-animation={`animation-${(index + 2) % 4}`}
          >
            <p className={styles.descriere}>{eveniment.descriere}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
