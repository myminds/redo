import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://redohelp.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/404',
          '/500',
        ],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      // `${siteUrl}/sitemap-index.xml`,
      // `${siteUrl}/sitemap-posts.xml`,
      // `${siteUrl}/sitemap-tools.xml`,
    ],
    host: siteUrl,
  }
}
