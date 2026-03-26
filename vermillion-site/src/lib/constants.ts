export const SITE = {
  name: "Vermillion Axis Technologies",
  tagline: "We Engineer What Others Can't Build",
  description:
    "Premium custom software for visionary companies. Full-stack development. Complete code ownership. Delivered at impossible speed.",
  location: "Las Vegas, NV",
  domain: "vermillionaxis.tech",
  email: "contact@vermillionaxis.tech",
};

export const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

export const SERVICE_OPTIONS = [
  "Foundation ($2,500 – $5,000)",
  "Professional ($7,500 – $15,000)",
  "Enterprise ($20,000+)",
  "Custom scope — let's discuss",
] as const;

export const NAV_LINKS = [
  { label: "Portfolio", href: "#work" },
  { label: "Solutions", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: "100+", label: "Projects Shipped" },
  { value: "<72hr", label: "Response Time" },
  { value: "3–21", label: "Day Delivery" },
  { value: "100%", label: "Code Ownership" },
];

export const SHOWCASE_ITEMS = [
  {
    label: "Analytics Dashboard",
    image: "/screenshots/analytics.png",
    description:
      "Real-time SaaS metrics, revenue tracking, and predictive insights for enterprise clients.",
    category: "SaaS",
  },
  {
    label: "Enterprise CRM",
    image: "/screenshots/crm.png",
    description:
      "Custom client relationship management with pipeline tracking and automated workflows.",
    category: "Enterprise",
  },
  {
    label: "Member Portal",
    image: "/screenshots/portal.png",
    description:
      "Luxury membership management with authentication, billing, and content delivery.",
    category: "Membership",
  },
  {
    label: "E-Commerce Platform",
    image: "/screenshots/ecommerce.png",
    description:
      "High-performance storefront with inventory management, payments, and analytics.",
    category: "E-Commerce",
  },
  {
    label: "Coaching Platform",
    image: "/screenshots/dashboard.png",
    description:
      "Full-stack coaching management with scheduling, payments, and branded PDF exports.",
    category: "Fitness",
  },
  {
    label: "Mobile Application",
    image: "/screenshots/mobile.png",
    description:
      "Cross-platform progressive web app with offline-first architecture and push notifications.",
    category: "Mobile",
  },
];

export const TIERS = [
  {
    name: "Foundation",
    price: "$2,500 – $5,000",
    audience:
      "Startups, solo founders, and businesses launching their digital presence.",
    delivery: "3–7 days",
    features: [
      "Custom branded website or application",
      "Progressive Web App — installs on any device",
      "Booking, scheduling, and contact forms",
      "Stripe payment processing",
      "SEO and performance optimization",
      "Cloud hosting and database included",
      "Two rounds of revisions",
    ],
  },
  {
    name: "Professional",
    price: "$7,500 – $15,000",
    audience:
      "Growing businesses managing operations at scale.",
    delivery: "5–10 days",
    features: [
      "Everything in Foundation, plus:",
      "Full-stack management platform",
      "User profiles with role-based access control",
      "Database architecture and API design",
      "Third-party integrations (CRM, payments, messaging)",
      "Automated workflows and scheduling",
      "Branded document and PDF export",
      "Offline-first architecture with cloud sync",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$20,000+",
    audience:
      "Organizations requiring multi-system architecture and advanced capabilities.",
    delivery: "10–21 days",
    features: [
      "Everything in Professional, plus:",
      "Multi-tenant SaaS architecture",
      "Admin panel with analytics dashboards",
      "AI-powered automation and generation",
      "E-commerce and marketplace features",
      "CRM and third-party API integrations",
      "White-label and multi-brand support",
      "Dedicated security audit",
    ],
  },
];

export const FEATURES = [
  {
    icon: "Layers",
    title: "Full-Stack Architecture",
    description:
      "End-to-end systems built on React, Next.js, Node.js, and PostgreSQL. Modern, maintainable, and production-ready.",
  },
  {
    icon: "Zap",
    title: "Real-Time Systems",
    description:
      "Live dashboards, instant notifications, and WebSocket-powered features that keep your users engaged.",
  },
  {
    icon: "Cloud",
    title: "Cloud-Native & Scalable",
    description:
      "Auto-scaling infrastructure designed for growth. From day-one startup to enterprise-grade load.",
  },
  {
    icon: "Smartphone",
    title: "Progressive Web Apps",
    description:
      "Install on any device, work offline, push notifications. Native app experience without the app store.",
  },
  {
    icon: "Shield",
    title: "Enterprise Security",
    description:
      "Encryption at rest and in transit, role-based access, audit trails, and security-first architecture.",
  },
  {
    icon: "Plug",
    title: "API Design & Integration",
    description:
      "RESTful and GraphQL APIs, third-party integrations, webhooks, and middleware for any ecosystem.",
  },
  {
    icon: "Brain",
    title: "AI-Powered Features",
    description:
      "Machine learning models, intelligent automation, chatbots, and predictive analytics built into your platform.",
  },
  {
    icon: "BarChart3",
    title: "Analytics & Reporting",
    description:
      "Custom dashboards, data visualization, and business intelligence tools tailored to your KPIs.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "A focused consultation. We understand your vision, define technical requirements, and identify the fastest path to a production-ready product.",
  },
  {
    step: "02",
    title: "Proposal",
    description:
      "Within 24 hours: a detailed scope document with architecture overview, timeline, and transparent fixed pricing. No ambiguity.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Rapid development with milestone-based progress updates. Two revision rounds built into every engagement. You see everything as it happens.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Complete codebase, deployment credentials, and documentation. Full ownership transfer. You control every line of code.",
  },
  {
    step: "05",
    title: "Support",
    description:
      "Post-launch maintenance, feature additions, and performance monitoring. Month-to-month, cancel anytime. No lock-in.",
  },
];

export const COMPARISON = [
  {
    feature: "Delivery timeline",
    others: "6–16 weeks",
    ours: "3–21 days",
  },
  {
    feature: "Code ownership",
    others: "Licensed or hosted",
    ours: "100% yours",
  },
  {
    feature: "Ongoing lock-in",
    others: "Annual contracts",
    ours: "Month-to-month or none",
  },
  {
    feature: "Revision rounds",
    others: "Paid change orders",
    ours: "2 rounds included",
  },
  {
    feature: "Technology stack",
    others: "Template-based or outsourced",
    ours: "Custom-built from scratch",
  },
  {
    feature: "Post-launch support",
    others: "Retainer required",
    ours: "Flexible monthly plans",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "They built our entire platform in eleven days. Our previous agency quoted four months and triple the cost. Scheduling, payments, branded exports — our team uses it every single morning.",
    name: "Michael K.",
    title: "Founder, Coaching Lab",
    location: "Las Vegas, NV",
  },
  {
    quote:
      "I needed more than a website. I needed a system that understood how my business actually works — client onboarding, progress tracking, automated workflows. Vermillion got it immediately. No back-and-forth, no explaining the basics.",
    name: "Rachel Chen",
    title: "Founder, Elevate Wellness",
    location: "Scottsdale, AZ",
  },
  {
    quote:
      "The branded exports alone changed my business. My clients receive professionally designed documents with my logo and colors. They think I have a full design team. I just have Vermillion.",
    name: "David Okafor",
    title: "CEO, Okafor Digital",
    location: "Austin, TX",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Do I actually own the code?",
    answer:
      "Yes. On delivery, we transfer the complete codebase, deployment credentials, and documentation. No licensing, no hosting lock-in. It is yours to modify, extend, or hand off to another developer.",
  },
  {
    question: "How can you deliver so fast?",
    answer:
      "Years of refined component libraries, battle-tested architecture patterns, and purpose-built tooling eliminate the cold-start problem. We are not starting from zero — we are starting from proven systems designed for speed.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Two revision rounds are included in every project. After launch, we offer flexible month-to-month support plans. You can also take the code to any developer — there is no lock-in.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We build with React, Next.js, TypeScript, and Tailwind CSS on the frontend. Backends typically run on Node.js with PostgreSQL or Firebase depending on your needs. Everything is modern, maintainable, and documented.",
  },
  {
    question: "Can you integrate with tools I already use?",
    answer:
      "Yes. We have built integrations with Stripe, Twilio, Google Calendar, Salesforce, HubSpot, Shopify, and dozens of CRM and API systems. If it has an API, we can connect it.",
  },
  {
    question: "What happens if I am not satisfied?",
    answer:
      "We work transparently — you see progress at every milestone and have two full revision rounds. In the unlikely event we cannot reach alignment, we will refund the balance on any undelivered work. We have never had to.",
  },
];
