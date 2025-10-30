import React, { useState, useCallback } from 'react';
import { Metadata } from 'next';
import RentSlipGeneratorClient from './RentSlipGeneratorClient';

export const metadata: Metadata = {
  title: "Free Rent Slip Generator Online | Professional Rent Receipt Maker",
  description: "Free rent slip generator to create professional rent receipts for landlords and tenants. Generate detailed rent slips with automatic calculations and print-ready format.",
  keywords: [
    "rent slip generator", "rent receipt generator", "rent receipt maker",
    "rent slip maker", "rent receipt template", "rent slip template",
    "rent receipt form", "rent slip form", "rent receipt creator",
    "rent slip creator", "rent receipt builder", "rent slip builder",
    "free rent receipt", "online rent receipt", "rent receipt India"
  ],
  openGraph: {
    title: "Free Rent Slip Generator Online | Professional Rent Receipt Maker",
    description: "Free rent slip generator to create professional rent receipts for landlords and tenants. Generate detailed rent slips with automatic calculations.",
    images: [
      {
        url: "/og-rent-slip-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Free Rent Slip Generator - Create Professional Rent Receipts Online",
      }
    ],
  },
  twitter: {
    title: "Free Rent Slip Generator Online | Professional Rent Receipt Maker",
    description: "Free rent slip generator to create professional rent receipts for landlords and tenants.",
    images: ["/twitter-rent-slip-generator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/rent-slip-generator",
  },
};

// Structured data for Rent Slip Generator
const rentSlipGeneratorStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Rent Slip Generator",
  "description": "Free rent slip generator to create professional rent receipts for landlords and tenants. Generate detailed rent slips with automatic calculations and print-ready format.",
  "url": "https://redohelp.com/tools/rent-slip-generator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Generate professional rent receipts",
    "Automatic rent calculations",
    "Landlord and tenant details",
    "Property information management",
    "Print-ready receipt format",
    "Support for multiple payment methods",
    "Rent period tracking",
    "Additional charges calculation"
  ],
  "screenshot": "https://redohelp.com/rent-slip-generator-screenshot.jpg",
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


export default function RentSlipGenerator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(rentSlipGeneratorStructuredData)
        }}
      />
      <RentSlipGeneratorClient />
    </>
  );
}
