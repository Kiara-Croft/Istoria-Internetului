import { useEffect, useState } from "react";
import logo from "/src/assets/concurs/logo.png";

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const thumb = document.createElement("div");
    thumb.id = "custom-scroll-thumb";
    document.body.appendChild(thumb);

    // Logo
    const img = document.createElement("img");
    img.src = logo;
    img.alt = "Scroll logo";
    img.className = "scroll-logo";
    thumb.appendChild(img);

    // Procentaj
    const percentText = document.createElement("span");
    percentText.className = "scroll-percent";
    percentText.textContent = "0%";
    thumb.appendChild(percentText);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      const roundedPercent = Math.round(scrollPercent);

      setScrollPercentage(roundedPercent);

      const thumbHeight = 100 * (windowHeight / documentHeight);
      const thumbPosition =
        (scrollTop / (documentHeight - windowHeight)) * (100 - thumbHeight);

      // margine minimă și maximă exprimată în procente (ca să nu iasă din ecran)
      const minTop = 2; // nu începe chiar din colțul de sus
      const maxTop = 98 - thumbHeight; // evită ieșirea în jos

      const boundedTop = Math.min(Math.max(thumbPosition, minTop), maxTop);
      thumb.style.top = `${boundedTop}%`;

      thumb.style.height = `${thumbHeight}%`;

      percentText.textContent = `${roundedPercent}%`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.removeChild(thumb);
    };
  }, []);

  return null;
}
