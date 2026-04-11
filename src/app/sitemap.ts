import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://asdev-digital.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'monthly',
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      priority: 0.95,
      changeFrequency: 'monthly',
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'daily',
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.85,
      changeFrequency: 'never',
    },
  ]
}

