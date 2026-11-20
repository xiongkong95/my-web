"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang, type Translation } from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("lo");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState("en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }

  const t = translations[lang];

  return <LanguageContext value={{ lang, setLang, t }}>{children}</LanguageContext>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (value === null) {
    throw new Error("useLanguage ຕ້ອງໃຊ້ພາຍໃນ <LanguageProvider>");
  }
  return value;
}
