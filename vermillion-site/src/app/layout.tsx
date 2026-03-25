import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vermillion Axis Technologies | Custom Software for Fitness & Wellness",
  description:
    "We build custom coaching management applications for fitness and wellness businesses. From $2,500. Full code ownership. Delivered in days.",
  keywords: [
    "custom software development",
    "fitness app development",
    "coaching management software",
    "wellness technology",
    "PWA development",
    "Las Vegas software development",
    "white-label coaching app",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Vermillion Axis Technologies | Custom Software for Fitness & Wellness",
    description:
      "We build custom coaching management applications for fitness and wellness businesses. From $2,500. Full code ownership. Delivered in days.",
    type: "website",
    url: "https://vermillionaxistech.com",
    siteName: "Vermillion Axis Technologies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vermillion Axis Technologies — Custom Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vermillion Axis Technologies | Custom Software for Fitness & Wellness",
    description:
      "We build custom coaching management applications for fitness and wellness businesses. From $2,500. Full code ownership. Delivered in days.",
    images: ["/og-image.png"],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-bg antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vermillion Axis Technologies",
              url: "https://vermillionaxistech.com",
              description:
                "Custom software development for fitness, wellness, and coaching businesses",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Las Vegas",
                addressRegion: "NV",
                addressCountry: "US",
              },
              foundingDate: "2025",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              provider: {
                "@type": "Organization",
                name: "Vermillion Axis Technologies",
              },
              serviceType: "Custom Software Development",
              areaServed: "US",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "2500",
                highPrice: "20000",
                priceCurrency: "USD",
              },
            }),
          }}
        />
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
