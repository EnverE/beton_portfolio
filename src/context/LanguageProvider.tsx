import React, { useState, useEffect } from 'react';
import { brutalistAudio } from '../utils/audio';
import { LanguageContext, type Language } from './LanguageContext';


export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('eet_portfolio_lang');
    if (saved === 'TR' || saved === 'EN') return saved;
    if (typeof navigator !== 'undefined' && navigator.language?.startsWith('tr')) {
      return 'TR';
    }
    return 'EN';
  });

  const setLanguage = (lang: Language) => {
    brutalistAudio.playMechanicalClick();
    setLanguageState(lang);
    localStorage.setItem('eet_portfolio_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'TR' : 'EN');
  };

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
