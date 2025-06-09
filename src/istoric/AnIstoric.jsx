import { useEffect, useRef } from "react";
import styles from "./istoric.module.css";
import animations from "./animations.module.css";
import { evenimenteIstorice } from "./istoricData";

export default function AnIstoric() {
  const canvasRef = useRef(null);

  // Codul Matrix
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const characters = "漢字カタカナひらがな0123456789ABCDEF";
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animații la scroll
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
    <>
      {/* Matrix canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
        }}
      />

      {/* Conținutul istoric */}
      <div
        className={styles.listaEvenimente}
        style={{ position: "relative", zIndex: 1 }}
      >
        {evenimenteIstorice.map((eveniment, index) => {
          const pozaSrc = `/concurs/${eveniment.ani.replace(/_/g, "-")}.webp`;
          const pozaEsteSusDreapta = index % 2 === 0;

          if (!eveniment.arePoza && !eveniment.titlu && !eveniment.descriere) {
            return null;
          }

          return (
            <div
              key={index}
              className={styles.eveniment}
              id={`an-${eveniment.ani.replace(/_/g, "-")}`} // ✅ id pentru scroll
            >
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
    </>
  );
}
