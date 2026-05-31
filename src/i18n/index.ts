import { en } from "./en";
import { pl } from "./pl";

export const translations = { en, pl } as const;
export type Locale = keyof typeof translations;

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en;
}

export function getLangFromUrl(url: URL): Locale {
  const locale = url.pathname.split("/")[1];
  if (locale === "pl") return "pl";
  return "en";
}

export function getAlternateUrl(url: URL, targetLang: Locale): string {
  const path = url.pathname.replace(/^\/(en|pl)/, "");
  return `/${targetLang}${path}`;
}
