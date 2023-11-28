import React, { useState, useEffect } from "react";
import "./index.css";
import NavBar from "../NavBar/index.js";
import Globe from "../Globe/Globe.js";

const SplashPage = () => {
  const changingLanguages = ["en", "ch", "sp", "fr", "ar"];
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex(
        (prevIndex) => (prevIndex + 1) % changingLanguages.length
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  function displayCurrentLanguage() {
    const currentLanguage = changingLanguages[currentLanguageIndex];
    switch (currentLanguage) {
      case "en":
        return "Hello World";
      case "ch":
        return "你好";
      case "sp":
        return "Hola Mundo";
      case "fr":
        return "Bonjour le monde";
      case "ar":
        return "مرحباً بالعالم";
      default:
        return "Hello World";
    }
  }

  return (
    <div className="splash-page">
      <NavBar />
      <div className="currentlanguage">{displayCurrentLanguage()}</div>
      <div className="content-container">
        <div className="globe-container">
          <Globe />
        </div>
        <div className="slogan">
          Connect through Conversation, Learn through Language.
        </div>
      </div>
      <footer className="footer">Copyright &copy; 2023 Bonjour World</footer>
    </div>
  );
};

export default SplashPage;
