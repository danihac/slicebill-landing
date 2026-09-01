export const pl = {
  lang: "pl",
  locale: "pl-PL",

  meta: {
    siteName: "SliceBill",
    homeTitle: "SliceBill — Podziel wydatki bez konta",
    homeDescription:
      "SliceBill to darmowa aplikacja do podziału wydatków grupowych. Działa offline, chroni prywatność, obsługuje wiele walut. Bez rejestracji.",
    privacyTitle: "Polityka prywatności — SliceBill",
    termsTitle: "Regulamin — SliceBill",
    cookiesTitle: "Polityka cookies — SliceBill",
    ogImage: "/og-image.png",
  },

  nav: {
    switchLang: "EN",
    switchLangLabel: "Przełącz na angielski",
  },

  hero: {
    heading: "Podziel wydatki bez konta.",
    subheading: "Bez komplikacji.",
    description:
      "SliceBill to najprostszy sposób na rozliczanie wydatków grupowych — działa offline, chroni Twoją prywatność i automatycznie przelicza waluty.",
    ctaAppStore: "App Store",
    ctaGooglePlay: "Google Play",
    ctaWeb: "Wersja Web",
    comingSoon: "Wkrótce",
    availableNow: "Dostępne teraz",
    screenshotAlt: "SliceBill — widok grup",
  },

  features: {
    heading: "Zaprojektowany na codzienne życie",
    subheading:
      "Bez subskrypcji. Bez obowiązkowej rejestracji. Bez danych wysyłanych do zewnętrznych serwisów bez Twojej zgody.",
    items: [
      {
        icon: "lock",
        title: "Prywatność przede wszystkim",
        description:
          "Zacznij od razu bez zakładania konta. Twoje dane zostają na Twoim urządzeniu. Konto tworzysz tylko gdy chcesz udostępnić grupę.",
      },
      {
        icon: "wifi-off",
        title: "Działa offline",
        description:
          "Utwórz grupę i dodaj wydatki bez dostępu do internetu. Synchronizuj z chmurą kiedy chcesz — albo wcale.",
      },
      {
        icon: "currency",
        title: "Wiele walut",
        description:
          "Kursy wymiany na żywo z Europejskiego Banku Centralnego. Każdy wydatek zachowuje oryginalną walutę; SliceBill przelicza automatycznie.",
      },
    ],
  },

  howItWorks: {
    heading: "Jak to działa",
    subheading: "Od zera do rozliczenia w czterech krokach.",
    steps: [
      {
        number: "01",
        title: "Utwórz grupę",
        description:
          "Bez rejestracji. Nazwij grupę i dodaj uczestników — to wszystko.",
      },
      {
        number: "02",
        title: "Dodaj wydatki",
        description:
          "Wybierz kto zapłacił i podziel koszt po równo, procentowo lub podaj dokładne kwoty.",
      },
      {
        number: "03",
        title: "Sprawdź kto komu ile jest winien",
        description:
          "SliceBill automatycznie wylicza minimalną liczbę przelewów potrzebnych do rozliczenia.",
      },
      {
        number: "04",
        title: "Rozlicz się",
        description:
          "Oznacz płatności jako zrealizowane. Wyeksportuj podsumowanie do PDF lub CSV.",
      },
    ],
  },

  useCases: {
    heading: "Dla każdej grupy",
    items: [
      {
        icon: "plane",
        title: "Wyprawa ze znajomymi",
        description:
          "Śledź loty, hotele, posiłki i atrakcje w różnych walutach — bez konieczności rejestracji przez kogokolwiek.",
      },
      {
        icon: "home",
        title: "Współlokatorzy",
        description:
          "Dzielcie czynsz, rachunki i zakupy miesiąc po miesiącu. Ustaw domyślną walutę i zapomnij o obliczeniach.",
      },
      {
        icon: "heart",
        title: "Para i wspólny budżet",
        description:
          "Zarządzajcie wspólnymi wydatkami bez arkuszy kalkulacyjnych. Prywatne z założenia — udostępniasz kiedy chcesz.",
      },
    ],
  },

  platforms: {
    heading: "Wkrótce na wszystkich platformach",
    subheading: "SliceBill jest w aktywnym rozwoju.",
    ios: {
      label: "iOS",
      badge: "Pobierz w App Store",
      status: "Wkrótce",
    },
    android: {
      label: "Android",
      badge: "Pobierz w Google Play",
      status: "Wkrótce",
    },
    web: {
      label: "Web",
      badge: "Otwórz w przeglądarce",
      cta: "Przejdź do aplikacji",
      url: "web.slicebill.app",
    },
  },

  footer: {
    tagline: "Najprostszy sposób na podział wydatków grupowych.",
    legal: "Prawne",
    contact: "Kontakt",
    privacyPolicy: "Polityka prywatności",
    termsOfService: "Regulamin",
    cookiePolicy: "Polityka cookies",
    contactEmail: "support@slicebill.app",
    company: "DARDAN SP. Z O.O.",
    address: "ul. Lewandowskiej 68, 43-143 Lędziny, Polska",
    nip: "NIP: 6462933321",
    krs: "KRS: 0000497120",
    copyright: (year: number) => `© ${year} DARDAN SP. Z O.O. Wszelkie prawa zastrzeżone.`,
  },

  legal: {
    lastUpdated: "Ostatnia aktualizacja",
    backHome: "Wróć na stronę główną",
  },
  error404: {
    title: "Nie znaleziono strony — SliceBill",
    heading: "Strony nie znaleziono",
    description: "Strona, której szukasz, mogła zostać usunięta, jej nazwa uległa zmianie lub jest tymczasowo niedostępna.",
    backHome: "Wróć na stronę główną",
  },
} as const;
