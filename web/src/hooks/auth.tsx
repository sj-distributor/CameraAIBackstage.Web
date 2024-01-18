import type { Locale } from "antd/es/locale";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { TFunction } from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface IAuthContextType {
  language: string;
  t: TFunction<"translation", undefined>;
  changeLanguage: (language: string) => void;
  locale: Locale;
}

export const AuthContext = React.createContext<IAuthContextType>(null!);

export default function AuthProvider(props: { children: React.ReactNode }) {
  const { i18n, t } = useTranslation();

  const [locale, setLocal] = React.useState<Locale>(enUS);

  const localStorageLanguage = localStorage.getItem("language") ?? "";

  const [language, setLanguage] = React.useState<string>(localStorageLanguage);

  const changeLanguage = (language: string) => {
    setLanguage(language);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    setLocal(language === "en" ? enUS : zhCN);
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.getItem("language")
      ? setLanguage(localStorage.getItem("language") as string)
      : setLanguage("en");
  }, []);

  const value = { language, t, locale, changeLanguage };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
