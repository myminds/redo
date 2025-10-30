// SEO Utility Functions for RedoHelp
export const seoConfig = {
  siteName: 'RedoHelp',
  siteUrl: 'https://redohelp.com',
  defaultTitle: 'RedoHelp - Free Online Tools & Expert Blog',
  defaultDescription: 'Free online tools including EMI calculator, investment calculator, salary calculator, and expert content on technology, finance, business, career, and automobile.',
  defaultKeywords: [
    'free online tools', 'EMI calculator', 'investment calculator', 'salary calculator',
    'home loan calculator', 'SIP calculator', 'technology blog', 'finance blog',
    'business blog', 'career blog', 'automobile blog', 'online calculator',
    'financial tools', 'tech stack builder', 'invoice generator', 'rent slip generator',
    'JSON formatter', 'compound interest calculator', 'loan calculator', 'investment planning'
  ],
  social: {
    twitter: '@redohelp',
    facebook: 'redohelp',
    linkedin: 'company/redohelp'
  },
  author: {
    name: 'RedoHelp Team',
    url: 'https://redohelp.com'
  }
};

// Generate structured data for tools
export function generateToolStructuredData(tool: {
  name: string;
  description: string;
  url: string;
  features: string[];
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": tool.url,
    "applicationCategory": tool.category,
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "featureList": tool.features,
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": seoConfig.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.siteName,
      "url": seoConfig.siteUrl
    }
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Generate article structured data
export function generateArticleStructuredData(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: string;
  category: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.siteName,
      "url": seoConfig.siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoConfig.siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "articleSection": article.category,
    "image": article.image ? {
      "@type": "ImageObject",
      "url": article.image
    } : undefined
  };
}

// Generate organization structured data
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "logo": `${seoConfig.siteUrl}/logo.png`,
    "description": seoConfig.defaultDescription,
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${seoConfig.siteUrl}/contact`
    },
    "sameAs": [
      `https://twitter.com/${seoConfig.social.twitter}`,
      `https://facebook.com/${seoConfig.social.facebook}`,
      `https://linkedin.com/${seoConfig.social.linkedin}`
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };
}

// Generate website structured data
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": seoConfig.siteName,
    "url": seoConfig.siteUrl,
    "description": seoConfig.defaultDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${seoConfig.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": seoConfig.siteName
    }
  };
}

// Generate item list structured data for tools
export function generateToolsListStructuredData(tools: Array<{
  name: string;
  description: string;
  url: string;
  category: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Online Tools",
    "description": "Collection of free online tools for financial calculations, business utilities, and development tools",
    "numberOfItems": tools.length,
    "itemListElement": tools.map(tool => ({
      "@type": "SoftwareApplication",
      "name": tool.name,
      "url": tool.url,
      "description": tool.description,
      "applicationCategory": tool.category,
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    }))
  };
}








