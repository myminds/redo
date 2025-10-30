import { Metadata } from 'next';
import SIPCalculatorClient from './SIPCalculatorClient';

export const metadata: Metadata = {
  title: "Free SIP Calculator Online | Calculate SIP Returns & Investment Growth",
  description: "Free SIP calculator to calculate Systematic Investment Plan returns, total investment, and wealth growth. Plan your mutual fund investments with compound interest.",
  keywords: [
    "SIP calculator", "SIP returns calculator", "SIP investment calculator",
    "mutual fund SIP calculator", "SIP calculator India", "SIP calculator online",
    "SIP calculator free", "SIP calculator tool", "SIP calculator app",
    "systematic investment plan calculator", "SIP calculator with returns",
    "SIP calculator compound interest", "SIP calculator mutual fund"
  ],
  openGraph: {
    title: "Free SIP Calculator Online | Calculate SIP Returns & Investment Growth",
    description: "Free SIP calculator to calculate Systematic Investment Plan returns, total investment, and wealth growth. Plan your mutual fund investments with compound interest.",
    images: [
      {
        url: "/og-sip-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Free SIP Calculator - Calculate SIP Returns Online",
      }
    ],
  },
  twitter: {
    title: "Free SIP Calculator Online | Calculate SIP Returns & Investment Growth",
    description: "Free SIP calculator to calculate Systematic Investment Plan returns, total investment, and wealth growth.",
    images: ["/twitter-sip-calculator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/sip-calculator",
  },
};



const sipCalculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SIP Calculator",
  "description": "Free SIP calculator to calculate Systematic Investment Plan returns, total investment, and wealth growth. Plan your mutual fund investments with compound interest.",
  "url": "https://redohelp.com/tools/sip-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Calculate SIP returns",
    "Total investment tracking",
    "Compound interest calculation",
    "Yearly breakdown analysis",
    "Return on investment percentage",
    "Wealth growth projection",
    "Mutual fund SIP planning",
    "Long-term investment planning"
  ],
  "screenshot": "https://redohelp.com/sip-calculator-screenshot.jpg",
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

export default function SIPCalculator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sipCalculatorStructuredData)
        }}
      />
      <SIPCalculatorClient />
    </>
  );
}
