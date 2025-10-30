import { Metadata } from 'next';
import SalaryCalculatorClient from './SalaryCalculatorClient';

export const metadata: Metadata = {
  title: "Free Salary Calculator Online | Calculate Take Home Salary, CTC Breakdown",
  description: "Free salary calculator to calculate take-home salary, CTC breakdown, deductions, and tax implications as per Indian tax laws.",
  keywords: [
    "salary calculator", "take home salary calculator", "CTC calculator",
    "salary breakdown calculator", "income tax calculator", "salary structure",
    "gross salary calculator", "net salary calculator", "salary deductions",
    "PF calculator", "ESI calculator", "professional tax calculator",
    "free salary calculator", "online salary calculator", "salary calculator India"
  ],
  openGraph: {
    title: "Free Salary Calculator Online | Calculate Take Home Salary, CTC Breakdown",
    description: "Free salary calculator to calculate take-home salary, CTC breakdown, deductions, and tax implications as per Indian tax laws.",
    images: [
      {
        url: "/og-salary-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Free Salary Calculator - Calculate Take Home Salary Online",
      }
    ],
  },
  twitter: {
    title: "Free Salary Calculator Online | Calculate Take Home Salary, CTC Breakdown",
    description: "Free salary calculator to calculate take-home salary, CTC breakdown, deductions, and tax implications.",
    images: ["/twitter-salary-calculator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/salary-calculator",
  },
};


const salaryCalculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Salary Calculator",
  "description": "Free salary calculator to calculate take-home salary, CTC breakdown, deductions, and tax implications as per Indian tax laws.",
  "url": "https://redohelp.com/tools/salary-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Calculate take-home salary",
    "CTC breakdown analysis",
    "Income tax calculation",
    "PF and ESI deductions",
    "Professional tax calculation",
    "Salary structure optimization"
  ],
  "screenshot": "https://redohelp.com/salary-calculator-screenshot.jpg",
  "softwareVersion": "1.0",
  "datePublished": "2024-01-01",
  "dateModified": "2024-01-01",
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

export default function SalaryCalculator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(salaryCalculatorStructuredData)
        }}
      />

      <SalaryCalculatorClient />
    </>
  );
}
