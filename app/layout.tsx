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
  title: "RedoHelp - Technology, Finance, Business, Career & Automobile Blog",
  description: "RedoHelp - Your trusted source for technology, finance, business, career, and automobile content. Expert insights and practical advice.",
  keywords: ["technology", "finance", "business", "career", "automobile", "blog", "news", "tips", "guides"],
  authors: [{ name: "Readindo Team" }],
  creator: "RedoHelp",
  publisher: "RedoHelp",
  icons: {
    icon: "/favicon.PNG",
    shortcut: "/favicon.PNG",
    apple: "/favicon.PNG",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://RedoHelp"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://RedoHelp",
    siteName: "RedoHelp",
    title: "RedoHelp - Technology, Finance, Business, Career & Automobile Blog",
    description: "Your trusted source for technology, finance, business, career, and automobile content. Expert insights and practical advice.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RedoHelp - Technology, Finance, Business, Career & Automobile Blog",
    description: "Your trusted source for technology, finance, business, career, and automobile content. Expert insights and practical advice.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <meta name="google-site-verification" content="W_mC3vHYTBckULfbbW8Bvrb-KffGGxbaOsoSfvQmIPA" />
      </head>
      <body className="antialiased pt-16 sm:pt-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
