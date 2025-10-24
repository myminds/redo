import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://redohelp.com' // Replace with your actual domain
  
  // Define all tools
  const tools = [
    'calculator',
    'emi-calculator', 
    'home-loan-calculator',
    'investment-calculator',
    'invoice-generator',
    'json-formatter',
    'rent-slip-generator',
    'salary-calculator',
    'sip-calculator',
    'tech-stack-builder'
  ]

  // Generate sitemap entries for tools
  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return toolUrls
}
