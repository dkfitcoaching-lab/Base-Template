import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vermillion Axis Technologies | Custom Software for Fitness & Wellness",
  description:
    "We build custom coaching management applications for fitness and wellness businesses. From $2,500. Full code ownership. Delivered in days.",
  openGraph: {
    title: "Vermillion Axis Technologies | Custom Software for Fitness & Wellness",
    description:
      "We build custom coaching management applications for fitness and wellness businesses. From $2,500. Full code ownership. Delivered in days.",
    type: "website",
    url: "https://vermillionaxistech.com",
    siteName: "Vermillion Axis Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vermillion Axis Technologies | Custom Software for Fitness & Wellness",
    description:
      "We build custom coaching management applications for fitness and wellness businesses. From $2,500. Full code ownership. Delivered in days.",
  },
  metadataBase: new URL("https://vermillionaxistech.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-bg antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-btn focus:bg-vermillion focus:text-white focus:font-medium focus:text-sm focus:outline-none focus:ring-2 focus:ring-vermillion/50"
        >
          Skip to content
        </a>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
