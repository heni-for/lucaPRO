'use client';

import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import { translations } from '@/lib/translations';
import type { Language, TranslationKey } from '@/lib/translations';

type Theme = 'light' | 'dark' | 'system';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
    if (storedLanguage) {
      setLanguageState(storedLanguage);
    }
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (isMounted) {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      let effectiveTheme = theme;
      if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      root.classList.add(effectiveTheme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if(isMounted) {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'derja' ? 'rtl' : 'ltr';
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
       document.documentElement.lang = language;
       document.documentElement.dir = language === 'derja' ? 'rtl' : 'ltr';
    }
  }, [language, isMounted]);


  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  const dir = useMemo(() => (language === 'derja' ? 'rtl' : 'ltr'), [language]);

  const value = useMemo(() => ({
    theme,
    setTheme: setThemeState,
    language,
    setLanguage,
    t,
    dir,
  }), [theme, language, setLanguage, t, dir]);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
