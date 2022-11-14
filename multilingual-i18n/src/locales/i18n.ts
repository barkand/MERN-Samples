import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import publicFa from "./fa/public.json";
import publicEn from "./en/public.json";

const resources = {
  fa: {
    public: publicFa,
  },
  en: {
    public: publicEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
