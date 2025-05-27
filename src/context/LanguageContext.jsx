import React, { createContext, useState } from "react";
import i18n from "../i18n/i18n";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language || "en");

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ru" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
