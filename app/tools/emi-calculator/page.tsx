
import EMICalculatorClient from './EMICalculatorClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free EMI Calculator Online | Calculate Home Loan, Personal Loan EMI Instantly",
  description: "Free EMI calculator to calculate EMI for home loans, personal loans, car loans, and other financial products. Get detailed amortization schedule, total interest, and loan breakdown instantly.",
  keywords: [
    "EMI calculator", "home loan EMI calculator", "personal loan EMI calculator",
    "car loan EMI calculator", "loan EMI calculator", "EMI calculation",
    "loan calculator", "mortgage calculator", "loan EMI", "EMI formula",
    "amortization schedule", "loan interest calculator", "monthly EMI calculator",
    "free EMI calculator", "online EMI calculator", "EMI calculator India"
  ],
  openGraph: {
    title: "Free EMI Calculator Online | Calculate Home Loan, Personal Loan EMI Instantly",
    description: "Free EMI calculator to calculate EMI for home loans, personal loans, car loans, and other financial products. Get detailed amortization schedule instantly.",
    images: [
      {
        url: "/og-emi-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Free EMI Calculator - Calculate Loan EMI Online",
      }
    ],
  },
  twitter: {
    title: "Free EMI Calculator Online | Calculate Home Loan, Personal Loan EMI Instantly",
    description: "Free EMI calculator to calculate EMI for home loans, personal loans, car loans, and other financial products.",
    images: ["/twitter-emi-calculator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/emi-calculator",
  },
};
const emiCalculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "EMI Calculator",
  "description": "Free EMI calculator to calculate EMI for home loans, personal loans, car loans, and other financial products. Get detailed amortization schedule, total interest, and loan breakdown instantly.",
  "url": "https://redohelp.com/tools/emi-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Calculate EMI for any loan amount",
    "Support for different loan tenures",
    "Detailed amortization schedule",
    "Total interest calculation",
    "Principal and interest breakdown",
    "Support for home loans, personal loans, car loans"
  ],
  "screenshot": "https://redohelp.com/emi-calculator-screenshot.jpg",
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



export default function EMICalculatorPage() {


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(emiCalculatorStructuredData)
        }}
      />

      <EMICalculatorClient />
    </>
  );
}
