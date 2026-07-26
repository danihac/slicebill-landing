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

const routeMap: Record<string, Record<Locale, string>> = {
  "polityka-prywatnosci": { pl: "polityka-prywatnosci", en: "privacy-policy" },
  "privacy-policy": { pl: "polityka-prywatnosci", en: "privacy-policy" },
  "regulamin": { pl: "regulamin", en: "terms-of-service" },
  "terms-of-service": { pl: "regulamin", en: "terms-of-service" },
  "polityka-cookies": { pl: "polityka-cookies", en: "cookie-policy" },
  "cookie-policy": { pl: "polityka-cookies", en: "cookie-policy" },
};

export function getAlternateUrl(url: URL, targetLang: Locale): string {
  const segments = url.pathname.split("/");
  if (segments[1] === "pl" || segments[1] === "en") {
    segments[1] = targetLang;
    const slug = segments[2];
    if (slug && routeMap[slug]) {
      segments[2] = routeMap[slug][targetLang];
    }
    return segments.join("/") + url.search + url.hash;
  }

  return `/${targetLang}${url.pathname}` + url.search + url.hash;
}

