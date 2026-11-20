export const en = {
  lang: "en",
  locale: "en-US",

  meta: {
    siteName: "SliceBill",
    homeTitle: "SliceBill - Expense Splitting",
    homeDescription:
      "SliceBill is a free, ad-free app for splitting group expenses. AI receipt scanner, full offline mode, multi-currency support, and privacy without sign-up.",
    privacyTitle: "SliceBill - Privacy Policy",
    termsTitle: "SliceBill - Terms of Service",
    cookiesTitle: "SliceBill - Cookie Policy",
    ogImage: "/og-image-en.png",
  },

  nav: {
    switchLang: "PL",
    switchLangLabel: "Switch to Polish",
  },

  hero: {
    heading: "Split expenses without an account.",
    subheading: "No complications.",
    description:
      "SliceBill is a free, ad-free app for splitting group expenses — works offline, scans receipts with AI, protects your privacy, and converts currencies automatically.",
    badgeAvailable: "Now available on App Store & Google Play",
    ctaAppStore: "App Store",
    ctaGooglePlay: "Google Play",
    ctaWeb: "Web App",
    comingSoon: "Coming soon",
    availableNow: "Available now",
    screenshotAlt: "SliceBill app — groups view",
    mockup: {
      url: "web.slicebill.app",
      nav: {
        overview: "Overview",
        groups: "Groups",
        activities: "Activities",
        settings: "Settings",
      },
      groupsTitle: "Groups",
      groups: [
        {
          name: "Weekend Trip",
          members: "4 members",
          mode: "Public",
          highlighted: true,
        },
        {
          name: "Apartment",
          members: "3 members",
          mode: "Private",
          highlighted: false,
        },
        {
          name: "Dinner 🍕",
          members: "2 members",
          mode: "Local",
          highlighted: false,
        },
      ],
    },
  },

  features: {
    heading: "Built for real life",
    subheading:
      "Free and ad-free. No subscriptions, no mandatory sign-up — supported only by optional voluntary tips.",
    items: [
      {
        icon: "lock",
        title: "Privacy first, no sign-up",
        description:
          "Start immediately in local mode — no registration and no ads. Your data stays on your device. Create a free account only when you want cloud backup or shared groups.",
      },
      {
        icon: "scan",
        title: "AI receipt scanner",
        description:
          "Snap a photo of any receipt and let AI extract line items and totals — just assign who had what. Try it without an account on mobile, get 10 free scans with a free account, and optionally top up by buying us a coffee.",
      },
      {
        icon: "wifi-off",
        title: "Full offline mode",
        description:
          "Add and edit expenses without internet — in both local-only and cloud groups. Changes save safely on your device and sync automatically once you're back online.",
      },
      {
        icon: "users",
        title: "Shared groups & permissions",
        description:
          "Invite friends via link, QR code, or email. Stay in control with Limited Trust permissions, admin transfer, read-only member blocking, and group archiving.",
      },
      {
        icon: "currency",
        title: "Multi-currency & live rates",
        description:
          "Live exchange rates from the European Central Bank. Every expense keeps its original currency while SliceBill automatically converts balances to your group's base currency.",
      },
      {
        icon: "activity",
        title: "Activity feed, alerts & export",
        description:
          "Track every update in the Activity feed and enable optional push notifications. Export clean settlement reports to PDF or Excel-ready CSV with one tap.",
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
          "Start locally with no sign-up, or create a free cloud group. Name it, add members, or invite friends via link, QR code, or email.",
      },
      {
        number: "02",
        title: "Add or scan expenses",
        description:
          "Enter expenses manually or scan a receipt with AI. Assign line items to people, or split equally, by percentage, or exact amounts.",
      },
      {
        number: "03",
        title: "See who owes what",
        description:
          "SliceBill converts currencies automatically and calculates the minimum number of transfers needed to settle all debts.",
      },
      {
        number: "04",
        title: "Settle up & export",
        description:
          "Mark payments as done, export a clean PDF or Excel-ready CSV summary, and archive the settled group.",
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
          "Track flights, hotels, meals, and restaurant receipts across multiple currencies — even offline in the mountains or abroad.",
      },
      {
        icon: "home",
        title: "Housemates",
        description:
          "Split rent, utilities, and groceries month after month. Snap a grocery receipt, assign items, and forget about spreadsheets.",
      },
      {
        icon: "heart",
        title: "Couples & partners",
        description:
          "Manage shared everyday spending without messy sheets. Keep it private on your device or sync live with push notifications.",
      },
    ],
  },

  platforms: {
    heading: "Available on all platforms",
    subheading:
      "Download SliceBill on iOS and Android, or open the web app — with seamless sync across all your devices.",
    ios: {
      label: "iOS",
      badge: "Download on the App Store",
      status: "Available now",
      cta: "Download on the App Store",
    },
    android: {
      label: "Android",
      badge: "Get it on Google Play",
      status: "Available now",
      cta: "Get it on Google Play",
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
    language: "Language",
    switchToEn: "EN — English (current)",
    switchToPl: "PL — Switch to Polish",
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

  schema: {
    featureList: [
      "Split group expenses without an account (local mode)",
      "AI receipt scanner with per-item participant assignment",
      "Full offline mode with automatic sync on reconnect",
      "Multi-currency expenses with live ECB exchange rates",
      "Shared groups with QR/link invites and granular permissions",
      "Activity feed, push notifications, and PDF/CSV export",
    ],
  },

  legal: {
    lastUpdated: "Last updated",
    backHome: "Back to home",
  },
  error404: {
    title: "SliceBill - Page Not Found",
    heading: "Page not found",
    description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    backHome: "Go back home",
  },
} as const;

export type TranslationKey = typeof en;
