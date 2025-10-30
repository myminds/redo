import { Metadata } from 'next';
import HomeLoanCalculatorClient from './HomeLoanCalculatorClient';

export const metadata: Metadata = {
  title: "Free Home Loan Calculator Online | Calculate EMI, Interest & Eligibility",
  description: "Free home loan calculator to calculate EMI, total interest, loan eligibility, and amortization schedule. Plan your home purchase with detailed loan analysis.",
  keywords: [
    "home loan calculator", "home loan EMI calculator", "home loan eligibility calculator",
    "home loan interest calculator", "home loan EMI", "home loan calculator India",
    "mortgage calculator", "home loan planning", "home loan EMI calculation",
    "home loan tenure calculator", "home loan down payment calculator",
    "free home loan calculator", "online home loan calculator", "home loan calculator tool"
  ],
  openGraph: {
    title: "Free Home Loan Calculator Online | Calculate EMI, Interest & Eligibility",
    description: "Free home loan calculator to calculate EMI, total interest, loan eligibility, and amortization schedule. Plan your home purchase with detailed loan analysis.",
    images: [
      {
        url: "/og-home-loan-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Free Home Loan Calculator - Calculate EMI and Eligibility Online",
      }
    ],
  },
  twitter: {
    title: "Free Home Loan Calculator Online | Calculate EMI, Interest & Eligibility",
    description: "Free home loan calculator to calculate EMI, total interest, loan eligibility, and amortization schedule.",
    images: ["/twitter-home-loan-calculator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/home-loan-calculator",
  },
};

const homeLoanCalculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Home Loan Calculator",
  "description": "Free home loan calculator to calculate EMI, total interest, loan eligibility, and amortization schedule. Plan your home purchase with detailed loan analysis.",
  "url": "https://redohelp.com/tools/home-loan-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Calculate home loan EMI",
    "Total interest calculation",
    "Loan eligibility assessment",
    "Amortization schedule",
    "EMI to income ratio analysis",
    "Down payment percentage calculation",
    "Property value analysis",
    "Interest rate comparison"
  ],
  "screenshot": "https://redohelp.com/home-loan-calculator-screenshot.jpg",
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


export default function HomeLoanCalculator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeLoanCalculatorStructuredData)
        }}
      />
      <HomeLoanCalculatorClient />
    </>
  );
}
