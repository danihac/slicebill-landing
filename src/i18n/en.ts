export const en = {
  lang: "en",
  locale: "en-US",

  meta: {
    siteName: "SliceBill",
    homeTitle: "SliceBill — Split expenses without an account",
    homeDescription:
      "SliceBill is a free app for splitting group expenses. Works offline, protects your privacy, supports multiple currencies. No sign-up required.",
    privacyTitle: "Privacy Policy — SliceBill",
    termsTitle: "Terms of Service — SliceBill",
    cookiesTitle: "Cookie Policy — SliceBill",
    ogImage: "/og-image.png",
  },

  nav: {
    switchLang: "PL",
    switchLangLabel: "Switch to Polish",
  },

  hero: {
    heading: "Split expenses without an account.",
    subheading: "No complications.",
    description:
      "SliceBill is the simplest way to settle group costs — works offline, protects your privacy, and handles multiple currencies automatically.",
    ctaAppStore: "App Store",
    ctaGooglePlay: "Google Play",
    ctaWeb: "Web App",
    comingSoon: "Coming soon",
    availableNow: "Available now",
    screenshotAlt: "SliceBill app — groups view",
  },

  features: {
    heading: "Built for real life",
    subheading:
      "No subscription. No mandatory sign-up. No data sent to third parties without your consent.",
    items: [
      {
        icon: "lock",
        title: "Privacy first",
        description:
          "Start immediately without an account. Your data stays on your device. Create an account only when you want to share a group.",
      },
      {
        icon: "wifi-off",
        title: "Works offline",
        description:
          "Create a group and add expenses with no internet connection. Sync to the cloud later — or never.",
      },
      {
        icon: "currency",
        title: "Multiple currencies",
        description:
          "Live exchange rates from the European Central Bank. Each expense keeps its original currency; SliceBill converts automatically.",
      },
    ],
  },

  howItWorks: {
    heading: "How it works",
    subheading: "From zero to settled in four steps.",
    steps: [
      {
        number: "01",
        title: "Create a group",
        description:
          "No registration needed. Name your group and add members — as simple as that.",
      },
      {
        number: "02",
        title: "Add expenses",
        description:
          "Choose who paid and split the cost equally, by percentage, or enter exact amounts.",
      },
      {
        number: "03",
        title: "See who owes what",
        description:
          "SliceBill automatically calculates the minimum number of transfers to settle all debts.",
      },
      {
        number: "04",
        title: "Settle up",
        description:
          "Mark payments as done. Export a PDF or CSV summary for your records.",
      },
    ],
  },

  useCases: {
    heading: "Made for every group",
    items: [
      {
        icon: "plane",
        title: "Trips with friends",
        description:
          "Track flights, hotels, meals, and activities across multiple currencies without anyone needing to sign up.",
      },
      {
        icon: "home",
        title: "Housemates",
        description:
          "Split rent, utilities, and groceries month after month. Set a default currency and forget about the math.",
      },
      {
        icon: "heart",
        title: "Couples & partners",
        description:
          "Manage shared spending without spreadsheets. Private by default — share only when you choose to.",
      },
    ],
  },

  platforms: {
    heading: "Available soon on all platforms",
    subheading: "SliceBill is under active development.",
    ios: {
      label: "iOS",
      badge: "Download on the App Store",
      status: "Coming soon",
    },
    android: {
      label: "Android",
      badge: "Get it on Google Play",
      status: "Coming soon",
    },
    web: {
      label: "Web",
      badge: "Open in browser",
      cta: "Open Web App",
      url: "web.slicebill.app",
    },
  },

  footer: {
    tagline: "The simplest way to split group expenses.",
    legal: "Legal",
    contact: "Contact",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    cookiePolicy: "Cookie Policy",
    contactEmail: "support@slicebill.app",
    company: "DARDAN SP. Z O.O.",
    address: "ul. Lewandowskiej 68, 43-143 Lędziny, Poland",
    nip: "NIP: 6462933321",
    krs: "KRS: 0000497120",
    copyright: (year: number) => `© ${year} DARDAN SP. Z O.O. All rights reserved.`,
  },

  legal: {
    lastUpdated: "Last updated",
    backHome: "Back to home",
  },
  error404: {
    title: "Page not found — SliceBill",
    heading: "Page not found",
    description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    backHome: "Go back home",
  },
} as const;

export type TranslationKey = typeof en;
