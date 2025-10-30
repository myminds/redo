import { useState, useCallback } from 'react';
import { Metadata } from 'next';
import InvoiceGeneratorClient from './InvoiceGeneratorClient';

export const metadata: Metadata = {
  title: "Free Invoice Generator Online | Professional Invoice Maker & Creator",
  description: "Free invoice generator to create professional invoices for your business. Generate detailed invoices with automatic calculations, tax management, and print-ready format.",
  keywords: [
    "invoice generator", "invoice maker", "invoice creator", "free invoice generator",
    "online invoice generator", "invoice template", "invoice builder", "invoice software",
    "business invoice", "professional invoice", "invoice generator India", "invoice tool",
    "invoice generator free", "invoice generator online", "invoice generator app"
  ],
  openGraph: {
    title: "Free Invoice Generator Online | Professional Invoice Maker & Creator",
    description: "Free invoice generator to create professional invoices for your business. Generate detailed invoices with automatic calculations, tax management, and print-ready format.",
    images: [
      {
        url: "/og-invoice-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Free Invoice Generator - Create Professional Invoices Online",
      }
    ],
  },
  twitter: {
    title: "Free Invoice Generator Online | Professional Invoice Maker & Creator",
    description: "Free invoice generator to create professional invoices for your business. Generate detailed invoices with automatic calculations.",
    images: ["/twitter-invoice-generator.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/invoice-generator",
  },
};



export default function InvoiceGenerator() {

  const invoiceGeneratorStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Invoice Generator",
    "description": "Free invoice generator to create professional invoices for your business. Generate detailed invoices with automatic calculations, tax management, and print-ready format.",
    "url": "https://redohelp.com/tools/invoice-generator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Generate professional invoices",
      "Automatic tax calculations",
      "Discount management",
      "Itemized product/service list",
      "Bill from and bill to details",
      "Print-ready invoice format",
      "Multiple invoice templates",
      "Invoice number generation"
    ],
    "screenshot": "https://redohelp.com/invoice-generator-screenshot.jpg",
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(invoiceGeneratorStructuredData)
        }}
      />
      <InvoiceGeneratorClient />
    </>
  );
}
