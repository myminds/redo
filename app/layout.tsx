import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "RedoHelp - Free Online Tools & Expert Blog | Technology, Finance, Business, Career",
    template: "%s | RedoHelp - Free Online Tools & Expert Blog"
  },
  description: "RedoHelp offers free online tools including EMI calculator, investment calculator, salary calculator, and expert content on technology, finance, business, career, and automobile. Get instant calculations and professional insights.",
  keywords: [
    "free online tools", "EMI calculator", "investment calculator", "salary calculator", 
    "home loan calculator", "SIP calculator", "technology blog", "finance blog", 
    "business blog", "career blog", "automobile blog", "online calculator", 
    "financial tools", "tech stack builder", "invoice generator", "rent slip generator",
    "JSON formatter", "compound interest calculator", "loan calculator", "investment planning",
    "financial planning", "tech news", "business tips", "career advice", "car reviews"
  ],
  authors: [{ name: "RedoHelp Team", url: "https://redohelp.com" }],
  creator: "RedoHelp",
  publisher: "RedoHelp",
  applicationName: "RedoHelp",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }
    ]
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://redohelp.com"),
  alternates: {
    canonical: "https://redohelp.com",
    languages: {
      "en-US": "https://redohelp.com",
      "hi-IN": "https://redohelp.com/hi",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://redohelp.com",
    siteName: "RedoHelp",
    title: "RedoHelp - Free Online Tools & Expert Blog | Technology, Finance, Business, Career",
    description: "RedoHelp offers free online tools including EMI calculator, investment calculator, salary calculator, and expert content on technology, finance, business, career, and automobile. Get instant calculations and professional insights.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RedoHelp - Free Online Tools & Expert Blog",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "RedoHelp Logo",
        type: "image/jpeg",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@redohelp",
    creator: "@redohelp",
    title: "RedoHelp - Free Online Tools & Expert Blog | Technology, Finance, Business, Career",
    description: "RedoHelp offers free online tools including EMI calculator, investment calculator, salary calculator, and expert content on technology, finance, business, career, and automobile.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "W_mC3vHYTBckULfbbW8Bvrb-KffGGxbaOsoSfvQmIPA",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="slurp" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
        
        {/* Language and Region */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="geo.placename" content="India" />
        
        {/* Mobile Optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RedoHelp" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance Hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
        
        {/* Additional SEO */}
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="expires" content="never" />
        <meta name="cache-control" content="public, max-age=31536000" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RedoHelp",
              "url": "https://redohelp.com",
              "logo": "https://redohelp.com/logo.png",
              "description": "RedoHelp offers free online tools including EMI calculator, investment calculator, salary calculator, and expert content on technology, finance, business, career, and automobile.",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://redohelp.com/contact"
              },
              "sameAs": [
                "https://twitter.com/redohelp",
                "https://facebook.com/redohelp",
                "https://linkedin.com/company/redohelp"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            })
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "RedoHelp",
              "url": "https://redohelp.com",
              "description": "Free online tools and expert blog for technology, finance, business, career, and automobile",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://redohelp.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "RedoHelp"
              }
            })
          }}
        />
      </head>
      <body className="antialiased pt-16 sm:pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
