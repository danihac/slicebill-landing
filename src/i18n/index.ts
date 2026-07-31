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
  const segments = url.pathname.split("/");
  if (segments[1] === "pl" || segments[1] === "en") {
    segments[1] = targetLang;
    return segments.join("/") + url.search + url.hash;
  }

  return `/${targetLang}${url.pathname}` + url.search + url.hash;
}

