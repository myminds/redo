import type { Metadata } from 'next';
import TechStackBuilderClient from './TechStackBuilderClient';

export const metadata: Metadata = {
  title: "Free Tech Stack Builder Online | Build Your Technology Stack",
  description: "Free tech stack builder to plan your project architecture. Choose from modern technologies, get recommendations, and build the perfect technology stack for any project.",
  keywords: [
    "tech stack builder", "technology stack builder", "tech stack planner",
    "technology stack planner", "tech stack generator", "technology stack generator",
    "tech stack tool", "technology stack tool", "tech stack builder online",
    "tech stack builder free", "tech stack builder app", "tech stack builder tool",
    "project tech stack", "web development tech stack", "mobile app tech stack"
  ],
  openGraph: {
    title: "Free Tech Stack Builder Online | Build Your Technology Stack",
    description: "Free tech stack builder to plan your project architecture. Choose from modern technologies, get recommendations, and build the perfect technology stack for any project.",
    images: [
      {
        url: "/og-tech-stack-builder.jpg",
        width: 1200,
        height: 630,
        alt: "Free Tech Stack Builder - Build Your Technology Stack Online",
      }
    ],
  },
  twitter: {
    title: "Free Tech Stack Builder Online | Build Your Technology Stack",
    description: "Free tech stack builder to plan your project architecture. Choose from modern technologies and get recommendations.",
    images: ["/twitter-tech-stack-builder.jpg"],
  },
  alternates: {
    canonical: "https://redohelp.com/tools/tech-stack-builder",
  },
};

// Structured data for Tech Stack Builder
const techStackBuilderStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tech Stack Builder",
  "description": "Free tech stack builder to plan your project architecture. Choose from modern technologies, get recommendations, and build the perfect technology stack for any project.",
  "url": "https://redohelp.com/tools/tech-stack-builder",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Technology stack planning",
    "Project type recommendations",
    "Frontend technology selection",
    "Backend technology selection",
    "Database technology selection",
    "Cloud platform selection",
    "DevOps tool selection",
    "Mobile development tools"
  ],
  "screenshot": "https://redohelp.com/tech-stack-builder-screenshot.jpg",
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

export default function TechStackBuilderPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(techStackBuilderStructuredData)
        }}
      />

      <TechStackBuilderClient />
    </>
  );
}