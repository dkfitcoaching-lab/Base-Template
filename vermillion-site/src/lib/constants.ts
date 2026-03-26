export const SITE = {
  name: "Vermillion Axis Technologies",
  tagline: "Software That Runs Your Coaching Business",
  description:
    "We design and build custom coaching platforms for fitness and wellness businesses. Full-stack. Full ownership. Delivered in days, not months.",
  location: "Las Vegas, NV",
  domain: "vermillionaxistech.com",
};

export const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

export const SERVICE_OPTIONS = [
  "Foundation ($2,500 – $5,000)",
  "Professional ($7,500 – $15,000)",
  "Enterprise ($20,000+)",
  "Not sure yet — help me decide",
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3–21", label: "Day Delivery" },
  { value: "100%", label: "Code Ownership" },
];

export const SHOWCASE_ITEMS = [
  {
    label: "Coach Dashboard",
    image: "/screenshots/dashboard.png",
    description: "Real-time client metrics, revenue tracking, and session scheduling in one view.",
  },
  {
    label: "Branded PDF Output",
    image: "/screenshots/pdf.png",
    description: "Auto-generated workout and meal plans with your logo, colors, and formatting.",
  },
  {
    label: "Client Management",
    image: "/screenshots/clients.png",
    description: "Full client profiles with medical history, goals, measurements, and progress photos.",
  },
  {
    label: "Weekly Schedule",
    image: "/screenshots/schedule.png",
    description: "Drag-and-drop session planning with automated SMS reminders via Twilio.",
  },
  {
    label: "Program Builder",
    image: "/screenshots/program.png",
    description: "150+ exercises across 9 muscle groups. Build, save, and reuse training templates.",
  },
  {
    label: "Settings & Themes",
    image: "/screenshots/settings.png",
    description: "White-label everything. Your brand, your colors, your domain.",
  },
];

export const TIERS = [
  {
    name: "Foundation",
    price: "$2,500 – $5,000",
    audience: "Solo trainers and independent coaches building their digital presence.",
    delivery: "3–7 days",
    features: [
      "Custom branded website or lite coaching app",
      "Progressive Web App — installs on any device",
      "Booking, scheduling, and contact forms",
      "Stripe payment processing",
      "SEO and Google Business optimization",
      "Cloud hosting and database included",
      "Two rounds of revisions",
    ],
  },
  {
    name: "Professional",
    price: "$7,500 – $15,000",
    audience: "Established coaches and gym owners managing 25+ active clients.",
    delivery: "5–10 days",
    features: [
      "Everything in Foundation, plus:",
      "Full coaching management platform",
      "Client profiles with medical history and progress tracking",
      "Session logging with 150+ exercises across 9 muscle groups",
      "Meal plan builder with macro calculator",
      "Workout programming with branded PDF export",
      "Financial tracking with revenue-split logic",
      "SMS automation via Twilio",
      "Offline-first architecture with cloud sync",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$20,000+",
    audience: "Multi-location gyms, franchises, and wellness brands ready to scale.",
    delivery: "10–21 days",
    features: [
      "Everything in Professional, plus:",
      "Multi-trainer dashboards and admin panel",
      "Client portal with authentication",
      "AI-powered workout generation and scheduling",
      "E-commerce and video hosting",
      "Analytics dashboards and CRM integrations",
      "Wearable device integration",
      "White-label capability",
      "Dedicated security audit",
    ],
  },
];

export const FEATURES = [
  {
    icon: "Users",
    title: "Client Management",
    description:
      "Track profiles, medical history, goals, and measurements. See every client's journey at a glance.",
  },
  {
    icon: "Dumbbell",
    title: "Workout Programming",
    description:
      "Build programs from 150+ exercises across 9 muscle groups. Save templates and assign in seconds.",
  },
  {
    icon: "UtensilsCrossed",
    title: "Nutrition Planning",
    description:
      "Create meal plans with auto-calculated macros. Export branded PDFs your clients actually use.",
  },
  {
    icon: "DollarSign",
    title: "Revenue Tracking",
    description:
      "Monitor earnings, calculate gym splits, and track session rates. Know exactly where your money goes.",
  },
  {
    icon: "MessageSquare",
    title: "Automated Messaging",
    description:
      "Send session reminders, booking confirmations, and follow-ups via SMS. No manual work.",
  },
  {
    icon: "Shield",
    title: "Secure and Offline-Ready",
    description:
      "PIN-protected access, cloud backup, and offline-first architecture. Your data is always safe.",
  },
  {
    icon: "Brain",
    title: "AI-Powered Tools",
    description:
      "Generate workouts, optimize schedules, and deploy a trained chatbot for your clients.",
  },
  {
    icon: "FileText",
    title: "Professional Output",
    description:
      "Every document carries your brand. Custom design system, dual themes, and print-ready PDFs.",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "A 15-minute conversation. We learn how your business works, what your clients need, and where software can make the biggest difference.",
  },
  {
    step: "02",
    title: "Proposal",
    description:
      "Within 24 hours you receive a detailed scope document: features, timeline, and a transparent fixed price. No surprises.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We start with a 50% deposit. You see progress at every milestone. Two revision rounds are built into the timeline.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "You receive the complete codebase, deployment credentials, and documentation. You own everything. We transfer, you verify, done.",
  },
  {
    step: "05",
    title: "Support",
    description:
      "After launch, we are available for ongoing maintenance, feature additions, and performance monitoring. Month-to-month, cancel anytime.",
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
    feature: "Fitness-specific features",
    others: "Generic or plugin-based",
    ours: "Built from scratch for coaches",
  },
  {
    feature: "Post-launch support",
    others: "Retainer required",
    ours: "Flexible monthly plans",
  },
];

export const TESTIMONIALS = [
  {
    quote: "They built our entire coaching platform in eleven days. Our previous agency quoted four months and triple the cost. The app handles scheduling, payments, and branded PDF programs — our coaches use it every single morning.",
    name: "Michael K.",
    title: "IFBB Pro, Coaching Lab",
    location: "Las Vegas, NV",
  },
  {
    quote: "I needed more than a website. I needed a system that understood how coaching actually works — intake forms, progress tracking, automated programming. Vermillion got it immediately. No back-and-forth, no explaining the basics.",
    name: "Rachel Chen",
    title: "Founder, Elevate Wellness",
    location: "Scottsdale, AZ",
  },
  {
    quote: "The branded exports alone changed my business. My clients receive professionally designed workout and nutrition plans with my logo and colors. They think I have a full design team. I just have Vermillion.",
    name: "David Okafor",
    title: "Online Performance Coach",
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
      "We specialize in one vertical: fitness and wellness. We have built dozens of coaching platforms and have battle-tested component libraries, design systems, and architecture patterns ready to customize. We are not starting from zero.",
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
      "Yes. We have built integrations with Stripe, Twilio, Google Calendar, Trainerize, MyFitnessPal, and various CRM systems. If it has an API, we can connect it.",
  },
  {
    question: "What happens if I am not satisfied?",
    answer:
      "We work transparently — you see progress at every milestone and have two full revision rounds. In the unlikely event we cannot reach alignment, we will refund the balance on any undelivered work. We have never had to.",
  },
];
