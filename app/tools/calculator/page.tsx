import { Metadata } from 'next';
import AdvancedCalculatorClient from './CalculatorClient';

export const metadata: Metadata = {
  title: "Free Advanced Calculator Online | Scientific Calculator with History & Memory",
  description: "Free advanced calculator with scientific functions, history tracking, memory operations, unit converter, and keyboard support. Perfect for students and professionals.",
  keywords: [
    "calculator", "scientific calculator", "advanced calculator", "online calculator",
    "calculator with history", "calculator with memory", "unit converter calculator",
    "math calculator", "free calculator", "calculator online", "calculator app",
    "calculator tool", "calculator software", "calculator program", "calculator India"
  ],
  openGraph: {
    title: "Free Advanced Calculator Online | Scientific Calculator with History & Memory",
    description: "Free advanced calculator with scientific functions, history tracking, memory operations, unit converter, and keyboard support.",
    images: [
      {
        url: "/og-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Free Advanced Calculator - Scientific Calculator Online",
      }
    ],
  },
  twitter: {
    title: "Free Advanced Calculator Online | Scientific Calculator with History & Memory",
    description: "Free advanced calculator with scientific functions, history tracking, memory operations, and keyboard support.",
    images: ["/twitter-calculator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/calculator",
  },
};


const calculatorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Advanced Calculator",
  "description": "Free advanced calculator with scientific functions, history tracking, memory operations, unit converter, and keyboard support. Perfect for students and professionals.",
  "url": "https://redohelp.com/tools/calculator",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Basic arithmetic operations",
    "Scientific functions (sin, cos, tan, log, etc.)",
    "Memory operations (MC, MR, M+, M-)",
    "Calculation history tracking",
    "Unit converter (length, weight, temperature, etc.)",
    "Mathematical constants",
    "Keyboard support",
    "Dark/Light mode toggle",
    "Angle mode (DEG/RAD)",
    "Factorial and advanced functions"
  ],
  "screenshot": "https://redohelp.com/calculator-screenshot.jpg",
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

export default function AdvancedCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorStructuredData)
        }}
      />
      <AdvancedCalculatorClient />
    </>
  );
}
