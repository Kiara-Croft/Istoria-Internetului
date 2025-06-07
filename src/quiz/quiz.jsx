import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import styles from "./quiz.module.css";

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

const questions = [
  {
    question: "Cine este considerat „părintele internetului”?",
    answers: [
      { text: "Tim Berners-Lee", correct: false },
      { text: "Vinton Cerf", correct: true },
      { text: "Steve Jobs", correct: false },
      { text: "Bill Gates", correct: false },
    ],
  },
  {
    question: "În ce an a fost trimis primul mesaj prin ARPANET?",
    answers: [
      { text: "1965", correct: false },
      { text: "1979", correct: false },
      { text: "1969", correct: true },
      { text: "1983", correct: false },
    ],
  },
  {
    question: "Ce înseamnă abrevierea „WWW”?",
    answers: [
      { text: "World Wired Web", correct: false },
      { text: "World Wide Web", correct: true },
      { text: "Wide Web Window", correct: false },
      { text: "Web World Wide", correct: false },
    ],
  },
  {
    question: "Cine a inventat WWW?",
    answers: [
      { text: "Larry Page", correct: false },
      { text: "Steve Wozniak", correct: false },
      { text: "Tim Berners-Lee", correct: true },
      { text: "Jeff Bezos", correct: false },
    ],
  },
  {
    question: "În ce an a devenit public WWW-ul?",
    answers: [
      { text: "1985", correct: false },
      { text: "1991", correct: true },
      { text: "2000", correct: false },
      { text: "1970", correct: false },
    ],
  },
  {
    question: "Care este primul browser web creat?",
    answers: [
      { text: "Chrome", correct: false },
      { text: "Firefox", correct: false },
      { text: "Internet Explorer", correct: false },
      { text: "WorldWideWeb", correct: true },
    ],
  },
  {
    question: "Cine a lansat „Yahoo!”?",
    answers: [
      { text: "Google", correct: false },
      { text: "Microsoft", correct: false },
      { text: "Apple", correct: false },
      { text: "Yahoo Inc.", correct: true },
    ],
  },
  {
    question: "În ce an a fost lansat Google?",
    answers: [
      { text: "1998", correct: true },
      { text: "1995", correct: false },
      { text: "2002", correct: false },
      { text: "2000", correct: false },
    ],
  },
  {
    question: "Ce înseamnă „IP”?",
    answers: [
      { text: "Internet Provider", correct: false },
      { text: "Internal Process", correct: false },
      { text: "Internet Protocol", correct: true },
      { text: "International Program", correct: false },
    ],
  },
  {
    question: "Ce limbaj este folosit pentru pagini web?",
    answers: [
      { text: "HTML", correct: true },
      { text: "CSS", correct: false },
      { text: "PHP", correct: false },
      { text: "Python", correct: false },
    ],
  },
];

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [width, height] = useWindowSize();

  const handleAnswer = (isCorrect) => {
    if (isAnswered) return;
    setIsAnswered(true);
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setShowScore(true);
      }
      setIsAnswered(false);
    }, 800);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className={styles.quizWrapper}>
      <div className={styles.quizBadge}>Quiz</div>

      {showScore ? (
        <div className={styles.scoreContainer}>
          <div className={styles.scoreCard}>
            <h2>
              Scorul tău:{" "}
              <span>
                {score} / {questions.length}
              </span>
            </h2>
            <button onClick={handleRestart}>Joacă din nou</button>
            {score === questions.length && (
              <Confetti
                width={300}
                height={200}
                numberOfPieces={300}
                gravity={0.3}
                recycle={false}
                tweenDuration={5000}
                initialVelocityY={10}
              />
            )}
          </div>
        </div>
      ) : (
        questions.map((q, i) => {
          let className = styles.card;
          if (i === currentIndex) className += ` ${styles.active}`;
          else if (i === currentIndex + 1) className += ` ${styles.next}`;
          else if (i > currentIndex + 1) className += ` ${styles.behind}`;
          else className += ` ${styles.inactive}`;

          return (
            <div key={i} className={className}>
              <h2>{q.question}</h2>
              <div className={styles.answers}>
                {q.answers.map((a, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(a.correct)}
                    className={
                      isAnswered
                        ? a.correct
                          ? styles.correct
                          : styles.incorrect
                        : ""
                    }
                    disabled={isAnswered || i !== currentIndex}
                  >
                    {a.text}
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
