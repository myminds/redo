import { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/post'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://redohelp.com'
  
  // Define all tools with their priorities and change frequencies
  const tools = [
    { name: 'emi-calculator', priority: 0.9, changeFreq: 'weekly' },
    { name: 'investment-calculator', priority: 0.9, changeFreq: 'weekly' },
    { name: 'salary-calculator', priority: 0.8, changeFreq: 'weekly' },
    { name: 'home-loan-calculator', priority: 0.8, changeFreq: 'weekly' },
    { name: 'sip-calculator', priority: 0.8, changeFreq: 'weekly' },
    { name: 'tech-stack-builder', priority: 0.7, changeFreq: 'monthly' },
    { name: 'invoice-generator', priority: 0.7, changeFreq: 'monthly' },
    { name: 'rent-slip-generator', priority: 0.7, changeFreq: 'monthly' },
    { name: 'json-formatter', priority: 0.6, changeFreq: 'monthly' },
    { name: 'calculator', priority: 0.6, changeFreq: 'monthly' }
  ]

  // Define all categories
  const categories = [
    { name: 'technology', priority: 0.8, changeFreq: 'daily' },
    { name: 'finance', priority: 0.8, changeFreq: 'daily' },
    { name: 'business', priority: 0.8, changeFreq: 'daily' },
    { name: 'job', priority: 0.8, changeFreq: 'daily' },
    { name: 'automobile', priority: 0.7, changeFreq: 'weekly' }
  ]

  // Get all posts
  const allPosts = getAllPosts()

  // Generate sitemap entries for tools
  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.name}`,
    lastModified: new Date(),
    changeFrequency: tool.changeFreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: tool.priority,
  }))

  // Generate sitemap entries for categories
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/${category.name}`,
    lastModified: new Date(),
    changeFrequency: category.changeFreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: category.priority,
  }))

  // Generate sitemap entries for individual posts
  const postUrls: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sitemap-page`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    }
  ]

  // Combine all URLs
  return [
    ...staticPages,
    ...toolUrls,
    ...categoryUrls,
    ...postUrls
  ]
}
