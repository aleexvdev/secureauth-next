"use client";

import type * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import enTranslations from "@/locales/en.json";
import esTranslations from "@/locales/es.json";

type Language = "en" | "es";
type Translations = typeof enTranslations;

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
}

type LanguageProviderState = {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const initialState: LanguageProviderState = {
  language: "en",
  translations: enTranslations,
  setLanguage: () => null,
  t: () => "",
}

const LanguageContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({ children, defaultLanguage = "en", storageKey = "ui-language", ...props }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<Translations>(enTranslations);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLanguage = localStorage.getItem(storageKey) as Language;
    if (storedLanguage) {
      setLanguageState(storedLanguage);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, language);
    switch (language) {
      case "es":
        setTranslations(esTranslations);
        break;
      default:
        setTranslations(enTranslations);
        break;
    }
  }, [language, storageKey]);

  const setLanguage = (language: Language) => {
    localStorage.setItem(storageKey, language);
    setLanguageState(language);
  }
  
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (!mounted) return "";
    const keys = key.split(".");
    let value: any = translations;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    if (typeof value === "string" && params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue));
      }, value);
    }
    return typeof value === "string" ? value : key;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations,
        setLanguage,
        t,
      }}
      {...props}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}