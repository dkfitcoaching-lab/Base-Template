export const SITE = {
  name: "Vermillion Axis Technologies",
  tagline: "Custom Software for Fitness & Wellness Businesses",
  description:
    "We build custom coaching management applications for fitness and wellness businesses. From $2,500. Full code ownership. Delivered in days.",
  location: "Las Vegas, NV",
  domain: "vermillionaxistech.com",
};

/**
 * Web3Forms access key — register at https://web3forms.com to get yours.
 * Set the primary recipient to david@vermillionaxistech.com,
 * and add faith@vermillionaxistech.com as CC in the Web3Forms dashboard.
 */
export const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

export const SERVICE_OPTIONS = [
  "Foundation ($2,500 – $5,000)",
  "Professional ($7,500 – $15,000)",
  "Enterprise ($20,000+)",
  "Custom / Not Sure",
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const SHOWCASE_ITEMS = [
  { label: "Coach Dashboard", image: "/screenshots/dashboard.png" },
  { label: "Branded PDF Output", image: "/screenshots/pdf.png" },
  { label: "Client Management", image: "/screenshots/clients.png" },
  { label: "Weekly Schedule", image: "/screenshots/schedule.png" },
  { label: "Program Builder", image: "/screenshots/program.png" },
  { label: "Settings & Themes", image: "/screenshots/settings.png" },
];

export const TIERS = [
  {
    name: "Foundation",
    price: "$2,500 – $5,000",
    audience: "Solo trainers. Independent coaches. New businesses.",
    delivery: "3–7 days",
    support: "$49–$99/mo",
    features: [
      "Custom branded website or lite coaching app",
      "Progressive Web App (installs on any device)",
      "Booking & scheduling",
      "Contact forms + lead capture",
      "Stripe payment processing",
      "SEO + Google Business optimization",
      "Cloud hosting + database",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Professional",
    price: "$7,500 – $15,000",
    audience: "Established coaches. Gym owners. 25+ clients.",
    delivery: "5–10 days",
    support: "$149–$249/mo",
    features: [
      "Everything in Foundation, plus —",
      "Full coaching management application",
      "Client management with medical history",
      "Session logging + exercise tracking (150+ exercises)",
      "Meal plan builder with macro calculator",
      "Workout programming + branded PDF export",
      "Financial tracking + revenue-split logic",
      "SMS automation (Twilio)",
      "Offline-first with cloud sync",
      "Custom branding + design system",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$20,000+",
    audience: "Multi-location gyms. Franchises. Wellness brands.",
    delivery: "10–21 days",
    support: "$299–$499/mo",
    features: [
      "Everything in Professional, plus —",
      "Multi-trainer dashboards + admin panel",
      "Client portal with authentication",
      "AI-powered workout generation",
      "AI scheduling + chatbot",
      "E-commerce",
      "Video hosting + content delivery",
      "Analytics dashboards",
      "Wearable + CRM integrations",
      "White-label capability",
      "Dedicated security audit & hardening",
    ],
  },
];

export const FEATURES = [
  {
    icon: "Users",
    title: "Client Management",
    description:
      "Profiles, medical history, goals, measurements, progress tracking",
  },
  {
    icon: "Dumbbell",
    title: "Workout Programming",
    description:
      "150+ exercises, 9 muscle groups, searchable database, templates",
  },
  {
    icon: "UtensilsCrossed",
    title: "Nutrition & Meal Plans",
    description:
      "100+ foods, macro calculator, oz/gram toggle, branded PDFs",
  },
  {
    icon: "DollarSign",
    title: "Financial Tracking",
    description:
      "Revenue splits, gym cut calculator, session rates, earnings dashboard",
  },
  {
    icon: "MessageSquare",
    title: "SMS & Scheduling",
    description:
      "Twilio automation, session reminders, weekly calendar, booking",
  },
  {
    icon: "Shield",
    title: "Security & Sync",
    description:
      "PIN lock, cloud backup, offline-first, JSON export, factory reset",
  },
  {
    icon: "Brain",
    title: "AI Integration",
    description:
      "AI workout generation, smart scheduling, trained chatbot",
  },
  {
    icon: "FileText",
    title: "Branded Output",
    description:
      "Professional PDFs, custom design system, dual color themes",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "15-minute call. We learn your business, show you a live demo.",
  },
  {
    step: "02",
    title: "Proposal",
    description:
      "Custom scope with features, timeline, transparent pricing.",
  },
  {
    step: "03",
    title: "Deposit",
    description: "50% to begin. Balance on delivery.",
  },
  {
    step: "04",
    title: "Build",
    description:
      "3 to 21 days. You see progress throughout. Two revision rounds included.",
  },
  {
    step: "05",
    title: "Deliver",
    description:
      "Full code ownership transferred. Optional monthly support begins.",
  },
];

export const COMPARISON = [
  {
    competitor: "US freelancer",
    theirPrice: "$5K–$15K",
    ourPrice: "$2,500–$5,000",
  },
  {
    competitor: "Fitness agency",
    theirPrice: "$3K–$10K",
    ourPrice: "$2,500–$5,000",
  },
  {
    competitor: "Small agency (PWA)",
    theirPrice: "$15K–$50K",
    ourPrice: "$7,500–$15,000",
  },
  {
    competitor: "Mid-size agency",
    theirPrice: "$50K–$150K",
    ourPrice: "$15,000–$30,000",
  },
  {
    competitor: "Enterprise agency",
    theirPrice: "$150K–$300K+",
    ourPrice: "$20,000+",
  },
];
