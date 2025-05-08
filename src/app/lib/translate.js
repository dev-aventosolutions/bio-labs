'use client';

import en from '../locals/en.json';
import fr from '../locals/fr.json';
import de from '../locals/de.json';
import es from '../locals/es.json';
import { useLanguage } from './LanguageContext';

const translations = { en, fr, de, es };

export function useTranslation() {
  const { language } = useLanguage(); // Get language from context
  
  const t = (key) => {
    try {
      return key.split('.')
        .reduce((obj, k) => obj?.[k], translations[language]) 
        || key;
    } catch {
      return key;
    }
  };
  
  return { t };
}