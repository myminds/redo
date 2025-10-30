
import { useState, useEffect, useCallback } from 'react';
import InvestmentCalculatorClient from './InvestmentCalculatorClient';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Free Investment Calculator Online | SIP Calculator, Compound Interest Calculator",
  description: "Free investment calculator to calculate compound interest, SIP returns, and investment growth. Plan your financial future with systematic investments.",
  keywords: [
    "investment calculator", "SIP calculator", "compound interest calculator", 
    "mutual fund calculator", "investment returns calculator", "SIP returns",
    "compound interest", "systematic investment plan", "investment planning",
    "financial planning calculator", "wealth calculator", "retirement planning",
    "free investment calculator", "online investment calculator", "SIP calculator India"
  ],
  openGraph: {
    title: "Free Investment Calculator Online | SIP Calculator, Compound Interest Calculator",
    description: "Free investment calculator to calculate compound interest, SIP returns, and investment growth. Plan your financial future with systematic investments.",
    images: [
      {
        url: "/og-investment-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Free Investment Calculator - SIP Calculator Online",
      }
    ],
  },
  twitter: {
    title: "Free Investment Calculator Online | SIP Calculator, Compound Interest Calculator",
    description: "Free investment calculator to calculate compound interest, SIP returns, and investment growth.",
    images: ["/twitter-investment-calculator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/investment-calculator",
  },
};

const investmentCalculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Investment Calculator",
  "description": "Free investment calculator to calculate compound interest, SIP returns, and investment growth. Plan your financial future with systematic investments.",
  "url": "https://redohelp.com/tools/investment-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Calculate compound interest",
    "SIP returns calculation",
    "Investment growth projection",
    "Yearly breakdown analysis",
    "Lump sum + SIP combination",
    "ROI percentage calculation"
  ],
  "screenshot": "https://redohelp.com/investment-calculator-screenshot.jpg",
  "softwareVersion": "1.0",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "author": {
    "@type": "Organization",
    "name": "RedoHelp"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RedoHelp",
    "url": "https://redohelp.com"
  }
};

export default function InvestmentCalculator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(investmentCalculatorStructuredData)
        }}
      />
      <InvestmentCalculatorClient />  
    </>
  );
}
