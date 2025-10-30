import type { Metadata } from 'next';
import JsonFormatterClient from './JsonFormatterClient';

export const metadata: Metadata = {
  title: "Free JSON Formatter Online | JSON Validator, Beautifier & Converter",
  description: "Free JSON formatter to format, validate, and convert JSON data. Beautify JSON, minify JSON, convert to XML/CSV, and validate JSON syntax with detailed error reporting.",
  keywords: [
    "JSON formatter", "JSON validator", "JSON beautifier", "JSON minifier",
    "JSON converter", "JSON to XML", "JSON to CSV", "JSON parser",
    "JSON validator online", "JSON formatter online", "JSON tool",
    "JSON formatter free", "JSON validator free", "JSON beautifier online",
    "JSON minifier online", "JSON converter tool", "JSON formatter India"
  ],
  openGraph: {
    title: "Free JSON Formatter Online | JSON Validator, Beautifier & Converter",
    description: "Free JSON formatter to format, validate, and convert JSON data. Beautify JSON, minify JSON, convert to XML/CSV, and validate JSON syntax with detailed error reporting.",
    images: [
      {
        url: "/og-json-formatter.jpg",
        width: 1200,
        height: 630,
        alt: "Free JSON Formatter - Format and Validate JSON Online",
      }
    ],
  },
  twitter: {
    title: "Free JSON Formatter Online | JSON Validator, Beautifier & Converter",
    description: "Free JSON formatter to format, validate, and convert JSON data. Beautify JSON, minify JSON, and validate JSON syntax.",
    images: ["/twitter-json-formatter.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/json-formatter",
  },
};

// Structured data for JSON Formatter
const jsonFormatterStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JSON Formatter",
  "description": "Free JSON formatter to format, validate, and convert JSON data. Beautify JSON, minify JSON, convert to XML/CSV, and validate JSON syntax with detailed error reporting.",
  "url": "https://redohelp.com/tools/json-formatter",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Format and beautify JSON",
    "Minify JSON for production",
    "Validate JSON syntax",
    "Convert JSON to XML",
    "Convert JSON to CSV",
    "Syntax highlighting",
    "Error detection and reporting",
    "File upload and download",
    "URL fetching with cURL"
  ],
  "screenshot": "https://redohelp.com/json-formatter-screenshot.jpg",
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

export default function JsonFormatterPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonFormatterStructuredData)
        }}
      />

      <JsonFormatterClient />
    </>
  );
}